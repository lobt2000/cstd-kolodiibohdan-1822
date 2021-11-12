import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KindergartenListService {
  private dbPath = '/kindergarten';
  menuPosition: Subject<any> = new Subject();
  kinderRef: AngularFirestoreCollection<any> = null;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) {
    this.kinderRef = this.db.collection(this.dbPath);
  }

  getAllKindergartenList(): AngularFirestoreCollection<any> {
    return this.kinderRef;
  }

  getOne(title: string): any {
    return this.kinderRef.ref.where('title', '==', title);
  }
}
