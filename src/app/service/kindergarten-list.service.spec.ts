import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { KindergartenListService } from './kindergarten-list.service';

describe('KindergartenListService', () => {
  let service: KindergartenListService;

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
    service = TestBed.inject(KindergartenListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
