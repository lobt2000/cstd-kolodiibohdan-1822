import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subject, timer } from 'rxjs';
import { auditTime, debounce, debounceTime, map, take, takeUntil, takeWhile, throttleTime } from 'rxjs/operators';
import { SubjectService } from 'src/app/services/subject.service';
// import { clearInterval } from 'timers';
enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  SPACE = 32,
  S = 83
}
@Component({
  selector: 'app-chrome-dragon-game',
  templateUrl: './chrome-dragon-game.component.html',
  styleUrls: ['./chrome-dragon-game.component.scss']
})
export class ChromeDragonGameComponent implements OnInit {
  startGame: boolean = false;
  dinoJump: boolean = false;
  dinoDown: boolean = false;
  cactusIndex: number = 0;
  score: number = 0;
  highScore: number = 0;
  timer: any;
  @Output() resetMenu: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subjectService.resetGame.pipe(take(1)).subscribe(res => {
      this.deleteAll();
      clearInterval();
      clearTimeout();
      this.score = 0;
      form.unsubscribe();
      this.ngOnInit();
    })
    let form = fromEvent(document, 'keyup').pipe(debounceTime(400)).subscribe(res => {
      if (res['keyCode'] == KEY_CODE.DOWN_ARROW && this.startGame) {
        this.block()
      } else if (res['keyCode'] == KEY_CODE.RIGHT_ARROW && this.startGame) {
        this.pterodactl()
      } else if (res['keyCode'] == KEY_CODE.UP_ARROW && this.startGame) {
        console.log('sdfsdf');
        this.moreCactus()
      }
    })
    if (this.router.routerState.snapshot.url.split('/')[1].length > 2) {
      this.startGame = true;
    }
    this.timer = setInterval(() => {
      this.score += 1;
    }, 100)
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == KEY_CODE.SPACE && this.startGame) {
      this.jump();
    } else if (event.keyCode == KEY_CODE.S && this.startGame) {
      this.down();
    }
  }

  jump() {
    // if (!this.dinoJump && !this.dinoDown) {
    //   this.dinoJump = true;
    //   setTimeout(() => {
    //     this.dinoJump = false;
    //   }, 400);
    // }
    if (!document.querySelector('.dino').classList.contains('down' && 'jump')) {
      document.querySelector('.dino').classList.remove('down')
      document.querySelector('.dino').classList.add('jump')
      setTimeout(() => {
        document.querySelector('.dino').classList.remove('jump')
      }, 400);
    }
  }

  down() {
    // if (!this.dinoJump && !this.dinoDown) {
    //   this.dinoDown = true;
    //   setTimeout(() => {
    //     this.dinoDown = false;
    //   }, 400);
    // }
    if (!document.querySelector('.dino').classList.contains('down' && 'jump')) {
      document.querySelector('.dino').classList.remove('jump')
      document.querySelector('.dino').classList.add('down')
      setTimeout(() => {
        document.querySelector('.dino').classList.remove('down')
      }, 400);
    }
  }

  block() {
    let div = document.createElement('div') as HTMLElement;
    div.classList.add('cactus');
    div.classList.add('block');
    document.querySelector('.game-block').appendChild(div);
    let alive = this.interva(div);
    setTimeout(() => {
      // for (let i = 0; i < document.querySelector('.game-block').children.length; i++) {
      //   if (document.querySelector('.game-block').children.item(i).classList.contains('cactus')) {
      //     document.querySelector('.game-block').children[i].remove();
      //     clearInterval(alive)
      //     break;
      //   }
      // }
      if (this.startGame) {
        this.deleteElement('cactus', alive)
      }
    }, 2200);
  }

  moreCactus() {
    let div = document.createElement('div') as HTMLElement;
    div.classList.add('moreCactus');
    div.classList.add('block');
    document.querySelector('.game-block').appendChild(div)
    let alive = this.interva(div);
    setTimeout(() => {
      // for (let i = 0; i < document.querySelector('.game-block').children.length; i++) {
      //   if (document.querySelector('.game-block').children.item(i).classList.contains('moreCactus')) {
      //     document.querySelector('.game-block').children[i].remove();
      //     clearInterval(alive)
      //     break;
      //   }
      // }
      if (this.startGame) {
        this.deleteElement('moreCactus', alive)
      }
    }, 2000);
  }

  pterodactl() {
    let div = document.createElement('div') as HTMLElement;
    div.classList.add('pterodact');
    div.classList.add('ptero');
    document.querySelector('.game-block').appendChild(div)
    let alive = this.interva(div);
    setTimeout(() => {
      if (this.startGame) {
        this.deleteElement('pterodact', alive)
      }
    }, 2200);
  }

  interva(cactus): any {
    let timeId = setInterval(() => {
      let work = false;
      for (let i = 0; i < document.querySelector('.game-block').children.length; i++) {
        if (document.querySelector('.game-block').children.item(i) == cactus) {
          work = true;
          break;
        } else {
          work = false;
        }
      }
      if (work) {
        let dino = document.querySelector('.dino')
        if (cactus.classList.contains('pterodact')) {
          let dinoHeight = parseInt(window.getComputedStyle(dino).getPropertyValue("height"));
          let cactusLeft = parseInt(
            window.getComputedStyle(cactus).getPropertyValue("left")
          );
          if (cactusLeft < 132 && cactusLeft > 0 && 70 <= dinoHeight) {
            clearInterval(timeId);
            this.startGame = false;
            this.deleteAnimation(cactus, cactusLeft);
            this.subjectService.resetMenu.next(true);
          } else if (!this.startGame) {
            clearInterval(timeId);
            this.deleteAnimation(cactus, cactusLeft);
          }
        } else if (cactus.classList.contains('cactus') || cactus.classList.contains('moreCactus')) {
          let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
          let cactusLeft = parseInt(
            window.getComputedStyle(cactus).getPropertyValue("left")
          );
          if (cactusLeft < 120 && cactusLeft > 0 && dinoTop <= 80) {
            clearInterval(timeId);
            this.startGame = false;
            this.deleteAnimation(cactus, cactusLeft);
            this.subjectService.resetMenu.next(true);

            this.deleteAnimation(dino, dinoTop);
          } else if (!this.startGame) {
            clearInterval(timeId);
            this.deleteAnimation(cactus, cactusLeft);
          }
        } else {
          clearInterval(timeId);
        }
      } else {
        clearInterval(timeId);
      }

    }, 10);
    return timeId;
  }

  deleteElement(el, interval) {
    for (let i = 0; i < document.querySelector('.game-block').children.length; i++) {
      if (document.querySelector('.game-block').children.item(i).classList.contains(el)) {
        document.querySelector('.game-block').children[i].remove();
        clearInterval(interval)
        break;
      }
    }
  }

  deleteAll() {
    // for (let i = 0; i < document.querySelector('.game-block').children.length; i++) {
    //   if (!document.querySelector('.game-block').children.item(i).classList.contains('dino')) {
    //     document.querySelector('.game-block').children[i].remove();
    //     clearInterval();
    //   }
    // }
    document.querySelector('.game-block').remove()
    let div = document.createElement('div')
    div.classList.add('game-block')
    document.querySelector('.score-block').insertAdjacentElement('afterend', div);

    let div1 = document.createElement('div');
    div1.classList.add('dino');
    div.appendChild(div1);
  }

  deleteAnimation(el, position) {
    clearInterval(this.timer);
    this.highScore = this.highScore < this.score ? this.score : this.highScore;
    if (el.classList.contains('ptero')) {
      el.style.left = `${position}px`
      el.classList.remove('ptero');
    }
    else if (el.classList.contains('cactus')) {
      el.style.left = `${position}px`
      el.classList.remove('block');
    }
    else if (el.classList.contains('moreCactus')) {
      el.style.left = `${position}px`
      el.classList.remove('block');
    }
    else if (el.classList.contains('dino')) {
      el.style.bottom = `${position}px`
      // el.classList.remove('block');
    }
  }

}



