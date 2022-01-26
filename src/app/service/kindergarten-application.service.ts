import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
}
