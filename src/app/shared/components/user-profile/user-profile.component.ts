import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { KindergartenApplicationService } from 'src/app/service/kindergarten-application.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profUser;
  userImage: string = 'No data';
  isEdit = false;
  regExpEmail = /^[a-z0-9\-\.]{1,}@gmail\.com|net\.us|org\.ua$/i;
  regExpPhone = /^[0-9]{10}$/;
  regExpFname = /^[a-z]{2,}$/i;
  regExpSname = /^[a-z]{2,}$/i;
  userFrom: FormGroup;
  userApplies: Array<any> = [];
  constructor(private profService: AuthService,
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private kindergartenApplications: KindergartenApplicationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProfile();
    this.buildFrom();
    this.getUsersApplication();
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  buildFrom() {
    this.userFrom = this.fb.group({
      icon: '',
      phone: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.pattern(this.regExpEmail)]),
      firstname: this.fb.control('', [Validators.required, Validators.pattern(this.regExpFname)]),
      secondname: this.fb.control('', [Validators.required, Validators.pattern(this.regExpSname)]),
    })
    this.userFrom.setValue({
      icon: this.profUser?.icon || '',
      phone: this.profUser?.phone || '',
      email: this.profUser.email,
      firstname: this.profUser.firstname,
      secondname: this.profUser.secondname,
    })
  }

  getProfile(): void {
    this.profUser = JSON.parse(localStorage.getItem('mainuser'))
  }
  edit(): void {
    this.isEdit = !this.isEdit;
    this.userFrom.setValue({
      icon: this.profUser?.icon || '',
      phone: this.profUser?.phone || '',
      email: this.profUser.email,
      firstname: this.profUser.firstname,
      secondname: this.profUser.secondname,
    })
  }
  save(): void {
    if (this.userFrom.valid) {
      const user = {
        ...this.profUser,
        ...this.userFrom.getRawValue()
      }
      this.profService.update(this.profUser.id, user).then(
        () => {
          this.updateLocal(user)
          this.profUser = user;
          this.toastr.success('Changes saved success!', 'Success');
          this.edit();
        }
      )
    }
    else {
      this.toastr.error('You write invalid data!', 'Denied');
    }
  }


  private updateLocal(data): void {
    const update = {
      ...this.profUser,
      ...data
    }
    localStorage.setItem('mainuser', JSON.stringify(update))
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);


    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.userFrom.patchValue({ icon: url });
      });
    });
  }

  getUsersApplication() {
    this.kindergartenApplications.getUsersApplications(this.profUser.id).pipe(debounceTime(300), distinctUntilChanged()).subscribe(res => {
      this.userApplies = [].concat(...res);
    }
    )
  }

}
