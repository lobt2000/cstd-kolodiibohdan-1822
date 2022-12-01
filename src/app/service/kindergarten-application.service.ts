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
  private dbPath1 = '/kindergarten';
  kinderApplyRef: AngularFirestoreCollection<any> = null;
  kinderRef: AngularFirestoreCollection<any> = null;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) {
    this.kinderApplyRef = this.db.collection(this.dbPath);
    this.kinderRef = this.db.collection(this.dbPath1);
  }

  getGroupApplyList(id: string) {
    return this.kinderApplyRef.ref.where('kinderId', '==', id)
  }

  update(id: string, data: any): Promise<void> {
    return this.kinderApplyRef.doc(id).update({ ...data }).then(
      () => {
        this.toastr.success(`Success`, 'Your application was updated sucessful');
      }
    ).catch(e => {
      this.toastr.error(`Denied`, 'Smth go wrong try again later');
    });
  }

  getUsersApplications(userId: string) {
    return this.kinderApplyRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map(res => res.map(
        item => item.listOfApply.filter(el => {
          if (el.userId == userId) {
            el.kinderTitle = item.title;
            return el;
          }
        })))
      // take(1)
    )
  }

  getKinder(kinderId: string) {
    return this.kinderRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map(res => {
        return res.filter(item => item.id == kinderId)
      }),
      map(res => res[0])
    )
  }
}
