import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  firstKinder: any = {};
  isLoading: boolean = false;
  constructor(private kindergartenService: KindergartenListService, private router: Router, private s: AuthService) { }

  ngOnInit(): void {
    // this.getFirstKindergarten();
  }

  // getFirstKindergarten() {
  //   this.kindergartenService.getAllKindergartenList().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     ),
  //     take(1)
  //   ).subscribe(data => {
  //     this.firstKinder = data[0];
  //   }, (e) => { }, () => {
  //     this.isLoading = false;
  //   });
  // }

  onGoToDetails(kinderElem) {
    // this.router.navigate(['/user', 'kindergarten', kinderElem.title])
  }

  onGoToAnotherPage(page) {
    this.router.navigate(['/agent', `${page}`])
  }
}
