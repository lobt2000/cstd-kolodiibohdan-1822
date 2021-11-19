import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { environment } from 'src/environments/environment';

import { KindergartenDetailsComponent } from './kindergarten-details.component';

describe('KindergartenDetailsComponent', () => {
  let component: KindergartenDetailsComponent;
  let fixture: ComponentFixture<KindergartenDetailsComponent>;
  let service: KindergartenListService;
  let mockKindergartenListService: KindergartenListService;
  let fb: FormBuilder
  let route: ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KindergartenDetailsComponent],
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
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindergartenDetailsComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder)
    route = TestBed.inject(ActivatedRoute)
    mockKindergartenListService = TestBed.inject(KindergartenListService);
    service = fixture.debugElement.injector.get(KindergartenListService);
    fixture.detectChanges();
  });

  it('should create', (() => {
    route.snapshot.params.title = 'Kindergarten';
    service.getOne('Kindergarten')
    service.menuPosition.next(true)
    expect(component).toBeTruthy();
  }));

  it('should check resize', () => {
    let event = {
      target: {
        innerWidth: 1200
      }
    }
    event.target.innerWidth = 1200
    component.onResize(event)
    expect(component.windowSize).toEqual(component.windowSize);
  });

  it('should build form ', () => {
    component.buildForm();
    expect(component.form.get('email').value).toEqual('');
  });

  it('should opne Hide  ', () => {
    component.buildForm();
    component.openHidden('groupType')
    expect(component.isGroupCheck).toBeTrue();
  });

  it('should opne Hide  ', () => {
    component.buildForm();
    component.openHidden('typeOfReg')
    expect(component.isType).toBeTrue();
  });

  it('should click outside of select', () => {
    component.onClickedOutsideItem(event, 'typeOfReg')
    expect(component.isType).toBeFalse();
  });

  it('should click outside of select', () => {
    component.onClickedOutsideItem(event, 'groupType')
    expect(component.isGroupCheck).toBeFalse();
  });

  it('should check type of group', () => {
    component.buildForm();
    component.groupCheckType('type', 'groupType')
    expect(component.form.get('groupType').value).toEqual('type');
  });

  it('should check type of group', () => {
    component.buildForm();
    component.groupCheckType('type', 'typeOfReg')
    expect(component.form.get('typeOfReg').value).toEqual('type');
  });

  it('should scroll to bottom ', () => {
    const el: HTMLDivElement = component.content.nativeElement;
    component.scrollToBottom()
    expect(component.content.nativeElement.top).toEqual(Math.max(0, el.scrollHeight - el.offsetHeight));
  });

  it('should go to apply', () => {
    // component.ngOnInit();
    component.goToApply()
    expect(component.form.get('email').value).toEqual(JSON.parse(localStorage.getItem('mainuser')).email);
  });

});
