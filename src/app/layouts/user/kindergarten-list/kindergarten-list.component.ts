import { Component, OnInit } from '@angular/core';
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
  constructor(private kindergartenService: KindergartenListService) { }

  ngOnInit(): void {
    this.getKindergarten();
  }

  getKindergarten() {
    this.kindergartenService.getAllKindergartenList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      take(1)
    ).subscribe(data => {
      this.kinderLists = data;
      console.log(data);
      
    }, (e) => { }, () => {
      this.isLoading = false;
    });
  }

}
