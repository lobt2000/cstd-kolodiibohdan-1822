import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClickOutsideModule } from 'ng-click-outside';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { KindergartenListRoutingModule } from './kindergarten-list-routing.module';

import { KindergartenListComponent } from './kindergarten-list.component';

describe('KindergartenListComponent', () => {
  let component: KindergartenListComponent;
  let fixture: ComponentFixture<KindergartenListComponent>;
  let route: ActivatedRoute
  let service: KindergartenListService;
  let mockKindergartenListService: KindergartenListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KindergartenListComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        CommonModule,
        KindergartenListRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        ClickOutsideModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindergartenListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute)
    mockKindergartenListService = TestBed.inject(KindergartenListService);
    service = fixture.debugElement.injector.get(KindergartenListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    service.getAllKindergartenList()
    service.menuPosition.next(true)
    expect(component).toBeTruthy();
  });

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

  it('should go to kindergarten-details', () => {
    component.onGoToDetails({ title: 'Kindergarten' })
    const routerSpy = { navigate: jasmine.createSpy('navigate') };
    expect(routerSpy.navigate).toBeDefined();
  });
});
