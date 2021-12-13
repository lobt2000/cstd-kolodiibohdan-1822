import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ClickOutsideModule } from 'ng-click-outside';
import { AuthService } from 'src/app/service/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

import { HeaderItemsComponent } from './header-items.component';

describe('HeaderItemsComponent', () => {
  let component: HeaderItemsComponent;
  let fixture: ComponentFixture<HeaderItemsComponent>;
  let service: AuthService;
  let mockAuthService: AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderItemsComponent],
      imports: [SharedModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        ClickOutsideModule,
        RouterTestingModule,
        BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderItemsComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AuthService);
    mockAuthService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain user', async () => {
    await mockAuthService.signIn('bkolodiy20013@gmail.com', 'qwerty123');
    const user = {
      email: "bkolodiy20013@gmail.com",
      firstname: "Bogdan",
      icon: "assets/image/profile.svg",
      id: "Pj5Oa7pjLTxlrjR13YRS",
      password: "qwerty123",
      secondname: "Kolodiy",
      userPos: "user"
    }
    localStorage.setItem('mainuser', JSON.stringify(user))
    service.updUser.next(user);
    console.log(component.currUser);
    expect(component.currUser.hasOwnProperty('id')).toBeTrue();
  });

  it('should be without user', () => {
    localStorage.clear();
    expect(localStorage.length).toBe(0);
  });

  it('should be with user', () => {
    mockAuthService.updUser.next(null)
    expect(component.currUser).toBeNull();
  });

  it('should change position of drop menu', () => {
    component.dropMenu()

    expect(component.dropWay).toBeTrue();
  });

  it('should close drop menu if click outside', () => {
    component.onClickedOutsideItem(event)
    expect(component.dropWay).toBeFalse();
  });

  it('should sign out of the system', () => {
    const spy = spyOn(mockAuthService, 'signOut')
    component.signOUT()
    expect(spy).toHaveBeenCalled();
  });
});
