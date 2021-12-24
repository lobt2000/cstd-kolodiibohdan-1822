import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
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
  windowSize: number;
  isOpen: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private kindergartenListService: KindergartenListService,
    private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.windowSize = window.innerWidth;
    this.kindergartenListService.menuPosition.subscribe(res => {
      this.isOpen = res;
    })
    this.backInLocation(true)
    // console.log(moment().format('Do MMMM YYYY'));
    this.getUser();
    this.kindergartenListService.applyFile.subscribe(res => {
      if (res) {
        setTimeout(() => {
          this.getFile(res)
        }, 1000)
      }
    })
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
      this.currMesUser = this.mainUser.contacts.find(res => res.url == this.activatedRoute.snapshot.params.url);

    }
  }



  getFile(event): void {
    const file = event.target ? event.target.files[0] : event;
    console.log(file);

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

  // delete(): void {
  //   this.currMesUser.messages.splice(this.deleteIndex, 1);
  //   this.messaging[this.messaging.map((res, i) => { if (res.url == this.currMesUser.url) { return i } })[0]] = this.currMesUser
  //   const user: Users = {
  //     ...this.mainUser,
  //     usersMess: this.messaging
  //   }
  //   localStorage.setItem('mainuser', JSON.stringify(user))
  //   this.authService.update(this.mainUser.id, user).finally(() => {
  //     this.ngOnInit();
  //   })
  //   if (this.allUsers.some(res => res.username == this.currMesUser.name) && this.deleteForm.get('checkbox').value) {
  //     this.updUser();
  //   }
  //   this.closeModal();
  // }

  // submit(): void {
  //   this.messaging[this.messaging.map((res, i) => { if (res.url == this.currMesUser.url) { return i } })[0]] = this.currMesUser
  //   const user: Users = {
  //     ...this.mainUser,
  //     usersMess: this.messaging
  //   }
  //   localStorage.setItem('mainuser', JSON.stringify(user))
  //   this.authService.update(this.mainUser.id, user).finally(() => {
  //     this.ngOnInit();
  //   })
  //   if (this.allUsers.some(res => res.username == this.currMesUser.name)) {
  //     this.updUser();
  //   }
  // }

  closeModal(): void {
    this.isModal = false;
    // this.deleteIndex = null;
    this.deleteForm.reset();
  }

  // updUser(): void {
  //   let reciewUser = this.allUsers.find(res => res.username == this.currMesUser.name);
  //   let index = reciewUser.usersMess.map((res, i) => { if (res.name == this.mainUser.username) { return i } }).filter(res => res)[0]
  //   reciewUser.usersMess[index].messages = this.currMesUser.messages;
  //   this.authService.update(reciewUser.id, reciewUser).finally(() => {
  //     this.ngOnInit();
  //   })
  // }

  onClickedOutsideItem(e: Event) {
    e.stopPropagation()
    this.closeModal();
  }

}
