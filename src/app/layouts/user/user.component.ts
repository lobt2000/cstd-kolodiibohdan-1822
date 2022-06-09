import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  menuWidth: number;
  checkSizeOfEvent: boolean = false;
  windowWidth: number;
  constructor() { }

  ngOnInit(): void {
    this.menuWidth = window.innerWidth < 768 ? 70 : 270;
    this.windowWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.menuWidth = (window.innerWidth < 768 || this.checkSizeOfEvent) ? 70 : 270;
    this.windowWidth = window.innerWidth;
  }

  onResizeValue(event) {
    this.checkSizeOfEvent = event;
    this.menuWidth = event ? 70 : 270;
  }
}
