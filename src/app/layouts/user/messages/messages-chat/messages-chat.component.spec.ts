import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClickOutsideModule } from 'ng-click-outside';
import { KindergartenListService } from 'src/app/service/kindergarten-list.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { KindergartenListRoutingModule } from '../../kindergarten-list/kindergarten-list-routing.module';

import { MessagesChatComponent } from './messages-chat.component';

describe('MessagesChatComponent', () => {
  let component: MessagesChatComponent;
  let fixture: ComponentFixture<MessagesChatComponent>;
  let route: Router;
  let activatedRoute: ActivatedRoute;
  let service: KindergartenListService;
  let storage: AngularFireStorage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesChatComponent],
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
    fixture = TestBed.createComponent(MessagesChatComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(Router)
    activatedRoute = TestBed.inject(ActivatedRoute)
    service = fixture.debugElement.injector.get(KindergartenListService);
    storage = fixture.debugElement.injector.get(AngularFireStorage);
    fixture.detectChanges();
  });

  it('should create', () => {
    service.menuPosition.next(false);
    const mainuser = {
      id: 'Pj5Oa7pjLTxlrjR13YRS',
      firstname: 'Bogdan',
      userPos: 'user',
      password: 'qwerty123',
      contacts: [{
        id: "",
        img: "https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fuser1.png?alt=media&token=5338afc7-46ed-408a-b3e4-db03ed8303c2",
        messages: [{
          date: "6 JULY 2020",
          file: "",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget",
          time: "10:45 AM",
          user: "Guy Hawkins",
          userIcon: "https://firebasestorage.googleapis.com/v0/b/skillcheckers-ac855.appspot.com/o/userImg%2Fuser1.png?alt=media&token=5338afc7-46ed-408a-b3e4-db03ed8303c2"
        },
        {
          date: "6 JULY 2020",
          file: "",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eget",
          time: "10:45 AM",
          user: "Bogdan Kolodiy",
          userIcon: "assets/images/profile.svg"
        }],
        missing: "0",
        name: "Guy Hawkins",
        text: "Please give us feedback...",
        time: "11:15",
        url: "Guy_Hawkins",
      }],
      email: "bkolodiy20013@gmail.com",
      icon: "assets/image/profile.svg",
      secondname: "Kolodiy",
      username: "Bogdan Kolodiy"
    }
    localStorage.setItem('mainuser', JSON.stringify(mainuser));
    activatedRoute.snapshot.params.url = 'Guy_Hawkins'
    expect(component).toBeTruthy();
  });
});
