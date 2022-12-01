import { Component, OnInit } from '@angular/core';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  firstKinder: any = {};
  isLoading: boolean = true;
  constructor(private kindergartenService: KindergartenListService, private router: Router, private s: AuthService) { }

  ngOnInit(): void {
    this.getFirstKindergarten();
  }

  getFirstKindergarten() {
    this.kindergartenService.getAllKindergartenList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      take(1)
    ).subscribe(data => {
      this.firstKinder = data[1];
    }, (e) => { }, () => {
      this.isLoading = false;
    });
  }

  onGoToDetails(kinderElem) {
    this.router.navigate(['/user', 'kindergarten-list', kinderElem.title])
  }

  onGoToAnotherPage(page) {
    this.router.navigate(['/user', `${page}`])
  }
}
