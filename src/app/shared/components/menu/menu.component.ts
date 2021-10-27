import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  checkTurn: boolean;
  resizeButton: boolean;
  width: number;
  isOpenMenu: boolean;
  openMenuwidth: number;
  @Input() resizeWidth;
  @Output() resizeMenu: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.resizeButton = !(window.innerWidth < 768);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth;
    this.resizeButton = !(event.target.innerWidth < 768);
    this.isOpenMenu = !(window.innerWidth < 768) ? true : this.isOpenMenu;
  }

  resizeClick() {
    this.checkTurn = !this.checkTurn;
    this.resizeMenu.emit(this.checkTurn)
  }
  openBurgerMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

}
