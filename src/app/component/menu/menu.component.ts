import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  showMenu: boolean = true;
  openMove: string = '';
  openResetMenu: boolean = false;
  @Output() openGame: EventEmitter<any> = new EventEmitter()
  constructor(private router: Router, private subjectService: SubjectService) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('score'))) {
      this.openMove = 'continue';
    }
    this.subjectService.resetMenu.subscribe(res => {
      // if(res) => {
      this.openResetMenu = res ? true : false;
      this.showMenu = res ? true : false;
      // }
    })
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);

  //   if (changes.openResetMenu && changes.openResetMenu.currentValue) {
  //     this.openResetMenu = changes.openResetMenu.currentValue;
  //     this.showMenu = true;
  //     console.log('sadasd');

  //   } else {
  //     this.openResetMenu = false;
  //   }

  // }
  changeMenu() {
    if ((this.router.routerState.snapshot.url.split('/').length > 2 && !this.openResetMenu) || this.openMove == 'controls') {
      this.showMenu = !this.showMenu;
    }
  }
  checkMove(move) {
    if (move == 'new') {
      this.openMove = move;
    } else if (move == 'continue') {
      this.openMove = move;
      this.router.navigateByUrl('home');

    } else if (move == 'score') {
      this.openMove = move;
      this.openGame.emit(false);
    } else if (move == 'controls') {
      this.openMove = move;
      this.showMenu = false;
      this.router.navigateByUrl('controls');
    }
    else {
      this.openMove = '';
    }
  }
  checkGameMode(mode) {
    if (mode == 'menTwo') {
      this.router.navigateByUrl('game/menTwo');
      this.showMenu = false;
      this.openGame.emit(true);
      this.openMove = 'start';
    }
  }
  checkGameReview(review) {
    if (review == "exit") {
      this.router.navigateByUrl('game')
      this.showMenu = true;
      this.openResetMenu = false;
      this.openMove = '';
      this.openGame.emit(false)
    }
    else if (review == "restart") {
      this.router.navigateByUrl('game/menTwo');
      this.showMenu = false;
      this.openGame.emit(false);
      this.openGame.emit(true);
      this.openMove = 'start';
      this.openResetMenu = false;
      this.subjectService.resetGame.next(true)
    }
  }

}
