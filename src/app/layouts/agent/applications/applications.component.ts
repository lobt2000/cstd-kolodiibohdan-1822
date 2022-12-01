import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  kinderApplyLists: Array<any> = [];
  windowSize: number = window.innerWidth;
  isOpen: boolean;
  isLoading: boolean = false;
  destroy$ = new Subject<any>();
  constructor(private kindergartenServise: KindergartenListService, private router: Router) { }

  ngOnInit(): void {
    this.kindergartenServise.menuPosition.subscribe(
      res => {
        this.isOpen = res;
      }
    )

    const user = JSON.parse(localStorage.getItem('mainuser'))
    this.isLoading = true;
    if (user.kinderId) this.kindergartenServise.getOneById(user.kinderId).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (localStorage.getItem('kindergarten')) {
        const storage = JSON.parse(localStorage.getItem('kindergarten'));
        this.kinderApplyLists = storage.kindergartenGroup;
      } else {
        this.kinderApplyLists = res.kindergartenGroup;
      }
      this.isLoading = false;
    })
    else {
      this.isLoading = false;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }

  onGoToDetails(kinderApply) {
    this.router.navigate(['/agent', 'kindergarten-apply', kinderApply.name])
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
