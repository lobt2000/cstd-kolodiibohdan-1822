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
  private dbPath1 = '/kindergarten-list-apply';
  menuPosition: Subject<any> = new Subject();
  kinderRef: AngularFirestoreCollection<any> = null;
  kinderListApplyRef: AngularFirestoreCollection<any> = null;

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) {
    this.kinderRef = this.db.collection(this.dbPath);
    this.kinderListApplyRef = this.db.collection(this.dbPath1);
  }

  getAllKindergartenList(): AngularFirestoreCollection<any> {
    return this.kinderRef;
  }

  getOne(title: string): any {
    return this.kinderRef.ref.where('title', '==', title);
  }

  updateKinderApply(id, data) {
    this.kinderListApplyRef.ref.where('title', '==', id).onSnapshot(res => {
      res.forEach(kinder => {

        this.kinderListApplyRef.doc(kinder.data().id).update({ ...data })
          .catch(err => {
            this.toastr.error(`Denied`, 'Smth go wrong try again later');
          })
          .finally(() => {
            this.toastr.success(`Success`, 'Your apply send sucessful');
          })
      });
    })
  }
}
