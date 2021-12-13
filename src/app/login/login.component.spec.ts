import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../service/auth.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let mockAuthService: AuthService;
  let fb: FormBuilder

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
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
        LoginRoutingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AuthService);
    mockAuthService = TestBed.get(AuthService);
    fb = TestBed.get(FormBuilder)
    // httpClient = TestBed.get(HttpClient);
    // httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form for login', () => {
    component.buildFormForSignIn();
    expect(component.formLogIn.value).toEqual({ email: '', pass: '' });
  })

  it('should create form for registration', () => {
    component.buildFormForSignUp();
    expect(component.formLogUp.value).toEqual({
      email: '',
      pass: '',
      firstname: '',
      secondname: '',
      confirmpass: '',
      checkPosition: ''
    });
  })

  it('should change type of password input', () => {
    component.ChangeType();
    expect(component.isVisible).toBeTrue();
  })

  it('should change type of registration form', () => {
    component.ChangeTypeSignUp();
    expect(component.isSignUpVisible).toBeTrue();
  })

  it('should change type of confirm password input', () => {
    component.ChangeTypeConfirm();
    expect(component.isConfirmVisible).toBeTrue();
  })

  it('login should have been called', () => {
    const spy = spyOn(mockAuthService, 'signIn');
    component.formLogIn.setValue({
      email: 'bkolody20013@gmail.com',
      pass: 'qwerty123'
    })
    component.signIN();
    expect(spy).toHaveBeenCalled();
  })

  it('Login shouldn`t be valid', () => {
    const spy = spyOn(component, 'resetForm');
    component.buildFormForSignIn();
    component.formLogIn.setValue({
      email: 'bkolody20013@gmail.com',
      pass: '',
    })
    component.signIN();
    expect(spy).toHaveBeenCalled();
  })

  it('Registration should have been called', () => {
    const spy = spyOn(mockAuthService, 'signUp');
    component.buildFormForSignUp()
    component.formLogUp.setValue({
      firstname: 'Bohdan',
      secondname: 'Kolodii',
      email: 'bkolody20013@gmail.com',
      pass: 'qwerty123',
      confirmpass: 'qwerty123',
      checkPosition: 'user'
    })
    component.signUP();
    expect(spy).toHaveBeenCalled();
  })

  it('Registration shouldn`t be valid', () => {
    const spy = spyOn(component, 'resetForm');
    component.buildFormForSignUp();
    component.formLogUp.setValue({
      firstname: 'Bohdan',
      secondname: 'Kolodii',
      email: 'bkolody20013@gmail.com',
      pass: 'qwerty123',
      confirmpass: '',
      checkPosition: 'user'
    })
    component.signUP();
    expect(spy).toHaveBeenCalled();
  })

  it('should reset registration form', () => {
    component.formLogUp = fb.group({
      firstname: 'Bohdan',
      secondname: 'Kolodii',
      email: 'bkolody20013@gmail.com',
      pass: 'qwerty123',
      confirmpass: 'qwerty123',
      checkPosition: 'user'
    })
    component.resetForm();
    expect(component.formLogUp.value.firstname && component.formLogUp.value.secondname).toBeNull();
  })

  it('should reset login form', () => {
    component.formLogIn = fb.group({
      email: 'bkolody20013@gmail.com',
      pass: 'qwerty123',
    })
    component.resetForm();
    expect(component.formLogIn.value.email && component.formLogIn.value.pass).toBeNull();
  })

  it('should change type of form', () => {
    component.formLogUp = fb.group({
      firstname: 'Bohdan',
      secondname: 'Kolodii',
      email: 'bkolody20013@gmail.com',
      pass: 'qwerty123',
      confirmpass: 'qwerty123',
      checkPosition: 'user'
    })
    component.changeSignForm('signIn');
    expect(component.formLogIn.value.hasOwnProperty('email')).toBeTrue();
  })

  it('should change type of form', () => {
    component.formLogIn = fb.group({
      email: 'bkolody20013@gmail.com',
      pass: 'qwerty123',
    })
    component.changeSignForm('signUp');
    expect(component.formLogUp.value.hasOwnProperty('email')).toBeTrue();
  })

  it('should change form into reset password by email', () => {
    const spy = spyOn(component, 'buildFormForResetPass');
    component.resetPasswordByEmail('resetEmail');
    expect(spy).toHaveBeenCalled();
  })
  it('should clear form for resetting password by email', () => {
    component.resetPasswordByEmail('resetEmail');
    component.resetPasswordByEmail('');
    expect(component.formReset.value.email).toBeNull();
  })

  it('should create form for resetting password by email', () => {
    component.buildFormForResetPass();
    expect(component.formReset.value).toEqual({ email: '' });
  })

  it('should send email for reseting password', () => {
    component.buildFormForResetPass();
    component.formReset.setValue({ email: 'bkolodiy20013@gmail.com' })
    component.sendEmailForReset();
    service.sendEmailForResetPass(component.formReset.get('email').value)
    expect(component.resetPassword).toBe('waitForEmail');
  })

  it('should get error if password don`t match', () => {
    component.buildFormForSignUp();
    component.formLogUp.get('pass').patchValue('qwerty123')
    component.formLogUp.get('confirmpass').patchValue('qwerty');
    // component.confirmPassValidator()
    expect(component.formLogUp.controls.confirmpass.getError('notmatch')).toEqual('This value should be the same as password');
  })



});
