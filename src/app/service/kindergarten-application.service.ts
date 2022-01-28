import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KindergartenApplicationService {
  private dbPath = '/kindergarten-list-apply';
  kinderApplyRef: AngularFirestoreCollection<any> = null;

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) {
    this.kinderApplyRef = this.db.collection(this.dbPath);
  }

  getGroupApplyList(id) {
    return this.kinderApplyRef.ref.where('kinderId', '==', id)
  }

  update(id: string, data: any): Promise<void> {
    return this.kinderApplyRef.doc(id).update({ ...data });
  }

  getUsersApplications(userId) {
    return this.kinderApplyRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map(res => res.map(
        item => item.listOfApply.filter(el => {
          if (el.userId == userId) {
            console.log(item.title);
            el.kinderTitle = item.title;
            return el;
          }
        })))
      // take(1)
    )
  }
}
