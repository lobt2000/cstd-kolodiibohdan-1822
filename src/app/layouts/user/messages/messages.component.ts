import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { contacts } from 'src/app/shared/interfaces/contacts.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  userContacts: Array<contacts> = [];
  windowSize: number = window.innerWidth;
  isOpen: boolean;
  isConversationOpen: boolean = false;
  constructor(private kindergartenListService: KindergartenListService) { }

  ngOnInit(): void {
    this.windowSize = window.innerWidth;
    this.kindergartenListService.menuPosition.subscribe(res => {
      this.isOpen = res;
    })
    this.kindergartenListService.isConversationOpen.subscribe(res => {
      this.isConversationOpen = res;
    })
    this.getMesUsers();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }

  getMesUsers(): void {
    if (localStorage.getItem('mainuser')) {
      let user = JSON.parse(localStorage.getItem('mainuser'));
      this.userContacts = user.contacts;
    }
  }

  checkDisplayType() {
    if ((this.windowSize < 1150 && !this.isOpen) || this.windowSize < 945) {
      return (this.isConversationOpen ? 'none' : 'flex')
    }
    else {
      return 'flex';
    }
  }

}
