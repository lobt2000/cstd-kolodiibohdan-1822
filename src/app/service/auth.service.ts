import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Users } from '../shared/interfaces/users.interface';
// import { Users } from '../shared/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localUser: any;
  private dbPath = '/users';
  updUser: Subject<any> = new Subject<any>();
  profRef: AngularFirestoreCollection<any> = null;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) {
    this.profRef = this.db.collection(this.dbPath);
  }

  sendEmailForResetPass(email) {
    this.auth.sendPasswordResetEmail(email).then(
      () => {
        this.toastr.success(`Email was sent`, 'Success');
      })
      .catch(
        err => {
          console.log(err);
          this.toastr.error(`${err.toString().split('.')[0]}`, 'Login denied');
        }
      )
  }

  signUp(email: string, password: string, userFname: string, userSname: string, userPos): void {
    this.auth.createUserWithEmailAndPassword(email, password)

      .then(userResponse => {
        const user = {
          email: userResponse.user.email,
          password: password,
          firstname: userFname,
          secondname: userSname,
          userPos: userPos,
          icon: '@assets/images/profile.svg'
        }

        this.db.collection('users').add(user)
          .then(collection => {
            collection.get()
              .then(user => {
                const myUser = {
                  id: user.id,
                  ...user.data() as Users
                }
                this.toastr.success(`Hello ${myUser.firstname} ${myUser.secondname}`, 'Sing up success');
                localStorage.setItem('mainuser', JSON.stringify(myUser))
                this.localUser = JSON.parse(localStorage.getItem('user'))
                this.router.navigate(['user'])
              })
          })

      })

      .catch(
        err => {
          console.log(err);
          this.toastr.error(`${err.toString().split('.')[0]}`, 'Sign up denied');
        }
      )
  }







  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        this.db.collection('users').ref.where('email', '==', userResponse.user.email).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              const myUser = {
                id: userRef.id,
                ...userRef.data() as Users,
                password: password,

              }
              this.update(userRef.id, myUser)
              this.toastr.success(`Hello ${myUser.firstname} ${myUser.secondname}`, 'Login success');
              this.updUser.next(myUser)
              localStorage.setItem('mainuser', JSON.stringify(myUser))
              this.localUser = JSON.parse(localStorage.getItem('user'))
              this.router.navigate(['user']);
            })
          }
        )
      })
      .catch(
        (err) => {
          console.log(err);
          this.toastr.error(`${err.toString().split('.')[0]}`, 'Login denied');
        }

      )
  }
  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('mainuser');
        this.router.navigate(['login']);
        this.toastr.success(`Bay`, 'Logout success');
      })
  }

  getAllusers(): AngularFirestoreCollection<any> {
    return this.profRef;
  }
  update(id: string, data): Promise<void> {
    return this.profRef.doc(id).update({ ...data });
  }
  getOne(email: string): any {
    return this.profRef.ref.where('email', '==', email);
  }

  resetPassword(code, password) {
    this.auth
      .confirmPasswordReset(code, password)
      .then(() => {
        this.toastr.success(`Password was reset successful`, 'Success');
        this.router.navigate(['login'])
      })
      .catch(err => {
        this.toastr.error(`${err.toString().split('.')[0]}`, 'Reset password denied');
      });
  }
}

