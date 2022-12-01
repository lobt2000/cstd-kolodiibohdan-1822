import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { contacts } from 'src/app/shared/interfaces/contacts.interface';
import { Users } from 'src/app/shared/interfaces/users.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  userContacts: Array<contacts> = [];
  allUsers: Array<Users> = [];
  windowSize: number = window.innerWidth;
  isOpen: boolean;
  isConversationOpen: boolean = false;
  destroy$ = new Subject<any>();
  isLoading: boolean = false;
  constructor(private kindergartenListService: KindergartenListService, private authService: AuthService) { }

  ngOnInit(): void {
    this.windowSize = window.innerWidth;
    this.kindergartenListService.menuPosition.subscribe(res => {
      this.isOpen = res;
    })
    this.kindergartenListService.isConversationOpen.subscribe(res => {
      this.isConversationOpen = res;
    })
    this.getAllUsers();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }


  getAllUsers(): void {
    this.isLoading = true;
    this.authService.getAllusers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      let user = JSON.parse(localStorage.getItem('mainuser'));
      this.userContacts = res.find(item => item.id == user.id).contacts;
      this.allUsers = res.filter(item => !this.userContacts.some(el => el.id == item.id)).filter(item => item.id != user.id);
      localStorage.setItem('mainuser', JSON.stringify({ ...user, contacts: this.userContacts }));
      this.isLoading = false;
    })
  }

  checkDisplayType() {
    if ((this.windowSize < 1150 && !this.isOpen) || this.windowSize < 945) {
      return (this.isConversationOpen ? 'none' : 'flex')
    }
    else {
      return 'flex';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
