import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClickOutsideModule } from 'ng-click-outside';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../../shared.module';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let service: AuthService;
  let mockAuthService: AuthService;
  let fb: FormBuilder;
  let router: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        ClickOutsideModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MomentDateModule,
        CommonModule,
        MatStepperModule,
        MatRadioModule,
        SharedModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AuthService);
    mockAuthService = TestBed.get(AuthService);
    fb = TestBed.get(FormBuilder)
    router = TestBed.get(ActivatedRoute)
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form for new login', () => {
    component.buildForm();
    expect(component.resetPass.value).toEqual({ pass: '', confirmpass: '' });
  })

  it('should change type of password input', () => {
    component.ChangeType();
    expect(component.isVisible).toBeTrue();
  })

  it('should change type of confirm password input', () => {
    component.ChangeTypeConfirm();
    expect(component.isConfirmVisible).toBeTrue();
  })

  it('Reset password form shouldn`t be valid', () => {
    component.buildForm();
    component.resetPass.setValue({
      pass: 'qwerty1234',
      confirmpass: '',
    })
    expect(component.resetPass.valid).toBeFalse();
  })

  it('Reset password form shouldn`t be valid', () => {
    component.buildForm();
    component.resetPass.setValue({
      pass: '',
      confirmpass: '',
    })
    expect(component.resetPass.valid).toBeFalse();
  })

  it('Reset password form shouldn`t be valid', () => {
    component.buildForm();
    component.resetPass.get('pass').setValue('qwerty1234')
    expect(component.resetPass.valid).toBeFalse();
  })

  it('Reset password form should be valid', () => {
    component.buildForm();
    component.resetPass.setValue({
      pass: 'qwerty1234',
      confirmpass: 'qwerty1234',
    })
    expect(component.resetPass.valid).toBeTrue();
  })

  it('should get error if password don`t match', () => {
    component.buildForm();
    component.resetPass.get('pass').setValue('qwerty1234')
    component.resetPass.get('confirmpass').setValue('qwerty');
    expect(component.resetPass.controls.confirmpass.getError('notmatch')).toEqual('This value should be the same as password');
  })

  it('Password should change', () => {
    const spy = spyOn(mockAuthService, 'resetPassword')
    component.buildForm();
    component.resetPass.setValue({
      pass: 'qwerty1234',
      confirmpass: 'qwerty1234',
    })
    router.snapshot.queryParams['oobCode'] = 'bsoJIDN21E3rFppviob1cSjZUMJ_xc6nx1WeQIfvPlkAAAF837V6eg'
    component.sendNewPass();
    expect(spy).toHaveBeenCalledWith('bsoJIDN21E3rFppviob1cSjZUMJ_xc6nx1WeQIfvPlkAAAF837V6eg', 'qwerty1234');
  })

  it('Password shouldn`t change', () => {
    const spy = spyOn(mockAuthService, 'resetPassword')
    component.buildForm();
    component.resetPass.setValue({
      pass: 'qwerty1234',
      confirmpass: '',
    })
    component.sendNewPass();
    expect(spy).toHaveBeenCalledTimes(0);
  })
});
