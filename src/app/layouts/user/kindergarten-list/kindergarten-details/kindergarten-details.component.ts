import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';

@Component({
  selector: 'app-kindergarten-details',
  templateUrl: './kindergarten-details.component.html',
  styleUrls: ['./kindergarten-details.component.scss']
})
export class KindergartenDetailsComponent implements OnInit {
  kinderTitle: string;
  currkinder;
  isLoading: boolean = true;
  windowSize: number;
  isOpen: boolean;
  constructor(private kindergartenServise: KindergartenListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.windowSize = window.innerWidth;
    this.kinderTitle = this.route.snapshot.params.title;
    console.log(this.kinderTitle);
    this.kindergartenServise.menuPosition.subscribe(
      res => {
        this.isOpen = res;
      }
    )

    this.getKindergarten()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }


  getKindergarten() {
    this.kindergartenServise.getOne(this.kinderTitle).onSnapshot(
      document => {
        document.forEach(kinder => {
          const kindergarten = {
            id: kinder.id,
            ...kinder.data()
          };
          this.currkinder = kindergarten;
          console.log(this.currkinder);

          setTimeout(() => {
            this.isLoading = false;
          }, 300)

        });
      }
    );
  }

}
