import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { GroupDetailsComponent } from 'src/app/shared/components/group-details/group-details.component';
import { v4 } from 'uuid';

@Component({
  selector: 'app-kindergarten-details',
  templateUrl: './kindergarten-details.component.html',
  styleUrls: ['./kindergarten-details.component.scss']
})
export class KindergartenDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  kinderTitle: string;
  currkinder;
  isLoading: boolean = true;
  windowSize: number = window.innerWidth;
  isOpen: boolean;
  isGroupCheck: boolean;
  isType: boolean;
  regExpEmail = /^[a-z0-9\-\.]{1,}@gmail\.com|net\.us|org\.ua$/i;
  destroy$ = new Subject<any>();
  @ViewChild('content') content: ElementRef;
  constructor(
    private kindergartenServise: KindergartenListService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
    private dialog: MatDialog) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowSize = window.innerWidth;
  }

  ngOnInit(): void {
    this.windowSize = window.innerWidth;
    this.kinderTitle = this.route.snapshot.params.title;
    this.kindergartenServise.menuPosition.subscribe(
      res => {
        this.isOpen = res;
      }
    )

    this.getKindergarten();

  }



  getKindergarten() {
    this.kindergartenServise.getOne(this.kinderTitle)
      .subscribe(kindergarten => {
        this.currkinder = kindergarten;
        this.buildForm();
        setTimeout(() => {
          this.isLoading = false;
        }, 300)

      });
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.regExpEmail)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      childName: ['', [Validators.required]],
      childYear: ['', [Validators.required, Validators.min(0), Validators.max(6)]],
      childSex: ['', [Validators.required]]
    });
    // console.log(this.form.get('email'));
    if (this.currkinder.kindergartenGroup) {
      this.form.addControl(
        'groupType', new FormControl('', Validators.required)
      )
    }
    if (this.currkinder.kinderForm) {
      this.form.addControl(
        'typeOfReg', new FormControl('', Validators.required)
      )
    }
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
    if (this.form.valid) {
      const user = JSON.parse(localStorage.getItem('mainuser'))
      const form = {
        ...this.form.value,
        id: v4(),
        userId: user.id
      }
      const apply = {
        title: this.currkinder.title,
        kinderId: this.currkinder.id,
        listOfApply: [
          form
        ]
      }
      var fileObj = new File([`${JSON.stringify(apply)}`], 'apply_file.txt', {
        type: 'contentType'
      });
      this.kindergartenServise.applyFile.next(fileObj)
      this.kindergartenServise.updateKinderApply(this.currkinder.title, apply);
      this.form.patchValue({
        email: '',
        firstName: '',
        lastName: '',
        childName: '',
        childYear: '',
        childSex: '',
        groupType: '',
        typeOfReg: ''
      });
    }
  }

  goToKinderAgent() {
    this.authService.getAllusers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      debounceTime(600),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      const agent = res.find(item => item.kinderId == this.currkinder.id);
      if (agent) this.router.navigate(['/user', `messages`, `${agent.id}`])
    })

  }

  copyNumber() {
    navigator.clipboard.writeText(this.currkinder.phoneNumber);
    this.toastrService.success('Text copied')
  }

  openGroupDetails(group) {
    const dialogRef = this.dialog.open(GroupDetailsComponent, {
      data: {
        groupDetails: group.groupDetails,
        showMode: 'user',
        group: group.name
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }


}
