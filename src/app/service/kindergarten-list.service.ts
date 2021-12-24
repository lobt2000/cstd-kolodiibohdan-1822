import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KindergartenListService {
  private dbPath = '/kindergarten';
  private dbPath1 = '/kindergarten-list-apply';
  menuPosition: Subject<any> = new Subject();
  kinderRef: AngularFirestoreCollection<any> = null;
  kinderListApplyRef: AngularFirestoreCollection<any> = null;
  isConversationOpen: Subject<any> = new Subject();
  updList: Subject<any> = new Subject();
  applyFile: Subject<any> = new Subject();

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

  getOne(title: string, id?): any {
    return this.kinderRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      ),
      map(res => res.filter(item => item.title == title)[0])
      // take(1)
    )
  }
  addKinderApply(apply) {
    this.kinderListApplyRef.add({ ...apply }).then(
      data => {
        this.updList.next(data.id);

      }
    );
  }
  update(id: string, data: any): Promise<void> {
    return this.kinderListApplyRef.doc(id).update({ ...data });
  }

  updateKinderApply(id, data) {
    try {
      this.kinderListApplyRef.ref.where('title', '==', id).get().then(res => {
        if (res.size == 0) {
          this.addKinderApply(data)
          this.updList.subscribe(
            id => {
              data.id = id
              this.update(id, data)
            }
          )
        }
        else {
          res.forEach(kinder => {
            const apply = {
              ...kinder.data(),
              ...data,
              listOfApply: [...data.listOfApply, ...kinder.data().listOfApply]
            }
            this.kinderListApplyRef.doc(kinder.data().id).update({ ...apply })
              .catch(err => {
                this.toastr.error(`Denied`, 'Smth go wrong try again later');
              })
              .finally(() => {
                this.toastr.success(`Success`, 'Your apply send sucessful');
              })
          });
        }
      })
    }
    catch (e) {
      console.log(e);
    }
  }
}
