import { Component, OnInit } from '@angular/core';
import { contacts } from 'src/app/shared/interfaces/contacts.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  userContacts: Array<contacts> = [];
  constructor() { }

  ngOnInit(): void {
    this.getMesUsers();
  }

  getMesUsers(): void {
    if (localStorage.getItem('mainuser')) {      
      let user = JSON.parse(localStorage.getItem('mainuser'));
      console.log(user);
      this.userContacts = user.contacts;
    }
  }

}
