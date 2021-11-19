import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';

@Component({
  selector: 'app-kindergarten-details',
  templateUrl: './kindergarten-details.component.html',
  styleUrls: ['./kindergarten-details.component.scss']
})
export class KindergartenDetailsComponent implements OnInit {
  form: FormGroup;
  kinderTitle: string;
  currkinder;
  isLoading: boolean = true;
  windowSize: number;
  isOpen: boolean;
  isGroupCheck: boolean;
  isType: boolean;
  regExpEmail = /^[a-z0-9\-\.]{1,}@gmail\.com|net\.us|org\.ua$/i;
  @ViewChild('content') content: ElementRef;
  constructor(private kindergartenServise: KindergartenListService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.windowSize = window.innerWidth;
    this.kinderTitle = this.route.snapshot.params.title;
    console.log(this.kinderTitle);
    this.kindergartenServise.menuPosition.subscribe(
      res => {
        this.isOpen = res;
      }
    )

    this.getKindergarten();

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

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.regExpEmail)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      childName: ['', [Validators.required]],
      childYear: ['', [Validators.required, Validators.min(0), Validators.max(6)]],
      childSex: ['', [Validators.required]],
      groupType: ['', [Validators.required]],
      typeOfReg: ['', [Validators.required]],
    });


  }

  openHidden(item: string): void {
    if (item == 'groupType') {
      this.isGroupCheck = !this.isGroupCheck;
    }
    else if (item == 'typeOfReg') {
      this.isType = !this.isType;
    }
  }

  onClickedOutsideItem(e: Event, item: string) {
    e.stopPropagation();

    if (item == 'groupType') {
      this.isGroupCheck = false;
    }
    else if (item == 'typeOfReg') {
      this.isType = false;
    }
  }

  groupCheckType(item, kind) {
    kind === 'groupType' ? this.form.get('groupType').setValue(item) : this.form.get('typeOfReg').setValue(item);
  }

  scrollToBottom() {
    const el: HTMLDivElement = this.content.nativeElement;
    el.scrollTo({ top: Math.max(0, el.scrollHeight - el.offsetHeight), behavior: 'smooth' });
  }

  goToApply() {
    this.scrollToBottom()
    const user = JSON.parse(localStorage.getItem('mainuser'))
    this.form.patchValue({
      email: user.email,
      firstName: user.firstname,
      lastName: user.secondname
    })
  }

  sendApply() {
    console.log(this.form.value.title)
    if (this.form.valid) this.kindergartenServise.updateKinderApply(this.currkinder.title, this.form.value)
  }

}
