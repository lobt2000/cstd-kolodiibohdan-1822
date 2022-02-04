import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';

@Component({
  selector: 'app-kindergarten-list',
  templateUrl: './kindergarten-list.component.html',
  styleUrls: ['./kindergarten-list.component.scss']
})
export class KindergartenListComponent implements OnInit {
  kinderLists: Array<any> = [];
  isLoading: boolean = true;
  windowSize: number = window.innerWidth;
  isOpen: boolean;
  searchText: string;
  constructor(private kindergartenService: KindergartenListService, private router: Router) { }

  ngOnInit(): void {
    this.windowSize = window.innerWidth
    this.getKindergarten();
    this.kindergartenService.menuPosition.subscribe(res => {
      this.isOpen = res;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }

  getKindergarten() {
    this.kindergartenService.getAllKindergartenList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      // take(1)
    ).subscribe(data => {
      this.kinderLists = data;
      this.isLoading = false;
    });
  }

  onGoToDetails(kinderElem) {
    this.router.navigate(['/user', 'kindergarten-list', kinderElem.title])
  }

}
