import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { contacts } from 'src/app/shared/interfaces/contacts.interface';
import { Files } from 'src/app/shared/interfaces/file.interface';
import { Users } from 'src/app/shared/interfaces/users.interface';

@Component({
  selector: 'app-messages-chat',
  templateUrl: './messages-chat.component.html',
  styleUrls: ['./messages-chat.component.scss']
})
export class MessagesChatComponent implements OnInit {
  @ViewChild('scroll') private myScrollContainer: ElementRef;
  mainUser: Users;
  uplFile: Files;
  isDisabled: boolean = false;
  currMesUser: contacts;
  currDate: string = '';
  allUsers: Array<Users>;
  userContacts: Array<contacts> = [];
  checkOption: number = null;
  deleteIndex: number = null;
  textInput: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });
  deleteForm: FormGroup = new FormGroup({
    checkbox: new FormControl(false)
  })
  subject: Subject<string> = new Subject<string>();
  userMessname: string;
  // month: Array<Month> = [];
  editMessage: number = null;
  isEdit: boolean = false;
  isModal: boolean = false;
  searchText: string;
  windowSize: number = window.innerWidth;
  isOpen: boolean;
  destroy$ = new Subject<any>();
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private kindergartenListService: KindergartenListService,
    private storage: AngularFireStorage, private authService: AuthService) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res.hasOwnProperty('routerEvent')) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit(): void {
    this.windowSize = window.innerWidth;
    this.kindergartenListService.menuPosition.subscribe(res => {
      this.isOpen = res;
    })
    this.currDate = moment().format('D MMMM YYYY');
    this.backInLocation(true)
    this.textInput.valueChanges.subscribe(res => {
      if ((res.text && res.text.charCodeAt(0) !== 32) || this.uplFile) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false
      }
    })
    this.getAllUsers();
  }

  backInLocation(bool = false) {
    if (!bool) {
      this.router.navigateByUrl('/user/messages')
    }
    this.kindergartenListService.isConversationOpen.next(bool)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getUser(): void {
    if (localStorage.getItem('mainuser')) {
      this.mainUser = JSON.parse(localStorage.getItem('mainuser'));
      const user = this.allUsers.find(res => res.id == this.activatedRoute.snapshot.params.id);
      this.currMesUser = this.mainUser.contacts.find(res => res.id == this.activatedRoute.snapshot.params.id) || {
        id: user.id,
        icon: user.icon,
        username: user?.username,
        time: '',
        missing: 0,
        text: '',
        url: user.url,
        messages: []
      };

      this.checkDate(0);
    }
  }

  getAllUsers(): void {
    this.authService.getAllusers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      debounceTime(600),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.allUsers = res;
      let user = JSON.parse(localStorage.getItem('mainuser'));
      localStorage.setItem('mainuser', JSON.stringify(this.allUsers.find(item => item.id == user.id)))
      this.getUser();

    })
  }

  sendMessage(): void {
    if (this.isDisabled) {
      if ((this.textInput.get('text').value && this.textInput.get('text').value.charCodeAt(0) !== 32) || this.uplFile) {
        const mess = {
          user: this.mainUser.username,
          userIcon: this.mainUser.icon,
          text: this.textInput.get('text').value ? this.textInput.get('text').value : '',
          date: moment().format('D MMMM YYYY'),
          time: moment().format('LT'),
          file: this.uplFile ? this.uplFile : '',
          dateForCheck: new Date().toLocaleString().split(', ')[0]
        }
        this.currMesUser.messages.push(mess);
        this.submit();
      }
    }
    this.uplFile = null
    this.textInput.reset();
  }

  submit(): void {
    if (!this.mainUser.contacts.some(res => res.username == this.currMesUser.username)) {
      this.mainUser.contacts.push({
        id: this.currMesUser.id,
        icon: this.currMesUser.icon,
        username: this.currMesUser.username,
        time: this.currMesUser.messages[this.currMesUser.messages.length - 1].time,
        missing: 0,
        text: this.currMesUser.messages[this.currMesUser.messages.length - 1].text,
        url: this.currMesUser.url,
        messages: this.currMesUser.messages
      })

    } else {
      this.currMesUser = {
        ...this.currMesUser,
        time: this.currMesUser.messages[this.currMesUser.messages.length - 1].time,
        text: this.currMesUser.messages[this.currMesUser.messages.length - 1].text,
      }
      this.mainUser.contacts = this.mainUser.contacts.map((res, i) => {
        if (res.id == this.currMesUser.id) { res = this.currMesUser }
        return res;
      })

    }
    const user = {
      ...this.mainUser
    }
    localStorage.setItem('mainuser', JSON.stringify(user))
    this.updUser();
    this.authService.update(this.mainUser.id, user)

  }

  @HostListener('window:keydown.enter', ['$event'])
  keyDownSending() {
    this.isEdit ? this.sendEditMessage() : this.sendMessage();
  }

  getFile(event): void {
    const file = event.target ? event.target.files[0] : event;
    const filePath = `message-file/${file.name}`;
    const upload = this.storage.upload(filePath, file);
    this.isDisabled = true;

    upload.then(file => {
      this.storage.ref(`message-file/${file.metadata.name}`).getDownloadURL().subscribe(url => {
        this.uplFile = {
          url: url,
          fileName: file.metadata.name
        }
      });
    });
  }

  downloadFile(file: Files): void {
    var element = document.createElement('a');
    element.setAttribute('href', file.url);
    element.setAttribute('target', '_blank');
    element.setAttribute('download', file.fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  openOption(i: number, e?: Event): void {
    if (this.checkOption == i && this.checkOption !== null) {
      this.onClickedOutsideOption(e, i)
    }
    else {
      this.checkOption = i;
    }
  }

  onClickedOutsideOption(e: Event, i: number) {
    if (this.checkOption == i && this.checkOption !== null) {
      this.checkOption = null;
      e.stopPropagation();
    }
  }

  editCurrMess(currMes, i): void {
    this.textInput.get('text').patchValue(currMes.text);
    this.editMessage = i;
    this.isEdit = true
    if (currMes.file) {
      this.uplFile = currMes.file;
      this.isDisabled = true
    }
  }

  deleteCurrMess(i): void {
    this.isModal = true;
    this.deleteIndex = i;
  }

  delete(): void {
    this.currMesUser.messages.splice(this.deleteIndex, 1);
    const lengthOfMess: number = this.currMesUser.messages.length;
    this.currMesUser = {
      ...this.currMesUser,
      time: this.currMesUser.messages.length ? this.currMesUser.messages[lengthOfMess - 1].time : '',
      text: this.currMesUser.messages.length ? this.currMesUser.messages[lengthOfMess - 1].text : '',
    }
    this.mainUser.contacts = this.mainUser.contacts.map((res, i) => {
      if (res.id == this.currMesUser.id) { res = this.currMesUser }
      return res;
    })
    const user: Users = {
      ...this.mainUser
    }
    localStorage.setItem('mainuser', JSON.stringify(user))
    this.authService.update(this.mainUser.id, user)
    if (this.deleteForm.get('checkbox').value) {
      this.updUser();
    }
    this.closeModal();
  }



  closeModal(): void {
    this.isModal = false;
    this.deleteForm.reset();
  }

  updUser(): void {
    let reciewUser = this.allUsers.find(res => res.username == this.currMesUser.username);
    const lengthOfMess: number = this.currMesUser.messages.length;
    if (!reciewUser.contacts.some(res => res.id == this.mainUser.id)) {
      reciewUser.contacts.push({
        id: this.mainUser.id,
        icon: this.mainUser.icon,
        username: this.mainUser.username,
        time: this.currMesUser.messages[lengthOfMess - 1].time,
        missing: 0,
        text: this.currMesUser.messages[lengthOfMess - 1].text,
        url: this.mainUser.url,
        messages: this.currMesUser.messages
      })
    }
    else {
      let index = reciewUser.contacts.findIndex((res, i) => res.id == this.mainUser.id);
      reciewUser.contacts[index] = {
        ...reciewUser.contacts[index],
        time: this.currMesUser.messages[lengthOfMess - 1] ? this.currMesUser.messages[lengthOfMess - 1].time : '',
        text: this.currMesUser.messages[lengthOfMess - 1] ? this.currMesUser.messages[lengthOfMess - 1].text : '',
        messages: this.currMesUser.messages
      }
    }
    this.authService.update(reciewUser.id, reciewUser)
  }

  sendEditMessage(): void {
    if (this.isDisabled) {
      if ((this.textInput.get('text').value || this.uplFile) && this.textInput.get('text').value.charCodeAt(0) !== 32 && this.deleteIndex !== this.editMessage) {
        this.currMesUser.messages[this.editMessage].text = this.textInput.get('text').value ? this.textInput.get('text').value : '';
        this.currMesUser.messages[this.editMessage].file = this.uplFile ? this.uplFile : '';
        this.submit();
      } else {
        this.textInput.reset();
      }
    }
    this.uplFile = null
    this.textInput.reset();
    this.isEdit = false;
  }

  onClickedOutsideItem(e: Event) {
    e.stopPropagation()
    this.closeModal();
  }

  checkDate(i) {
    return (this.currMesUser?.messages[i - 1]?.dateForCheck) !== this.currMesUser?.messages[i]?.dateForCheck
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
