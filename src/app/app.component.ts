import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chrome-dragon-game';
  openGame: boolean = false;
  openResetMenu: boolean = false;
  constructor(public router: Router) { }
  ngOnInit(): void {
    this.router.navigateByUrl('game')
  }
  onOpenGame(event) {
    this.openGame = event;
  }
  onOpenResetMenu(event) {
    console.log(event);
    this.openResetMenu = false;
    this.openResetMenu = event;
  }
}
