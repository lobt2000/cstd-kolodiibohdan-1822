import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuthService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
        BrowserAnimationsModule
      ]
    });
    service = TestBed.inject(AuthService);
    mockAuthService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should send email for reset password', () => {
    const spy = spyOn(service, 'sendEmailForResetPass')
    service.sendEmailForResetPass('bkolodiy20013@gmail.com');
    expect(spy).toHaveBeenCalledWith('bkolodiy20013@gmail.com');
  });

  it('should sign in to the system', () => {
    const spy = spyOn(service, 'signIn')
    service.signIn('bkolodiy20013@gmail.com', 'qwerty123');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should sign up to the system', () => {
    const spy = spyOn(service, 'signUp')
    service.signUp('bkolodiy20013@gmail.com', 'qwerty123', 'Bohdan', 'Kolodii', 'user');
    expect(spy).toHaveBeenCalled();
  });

  it('should sign out from the system', () => {
    const spy = spyOn(service, 'signOut')
    service.signOut();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should reset the password', () => {
    const spy = spyOn(service, 'resetPassword')
    service.resetPassword('bsoJIDN21E3rFppviob1cSjZUMJ_xc6nx1WeQIfvPlkAAAF837V6eg', 'qwerty1234');
    expect(spy).toHaveBeenCalled();
  });
});
