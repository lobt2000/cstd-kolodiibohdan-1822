import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
// import { AngularFireModule } from '@angular/fire'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    // FormsModule,
    // ReactiveFormsModule,
    // // QuillModule.forRoot(),
    // ClickOutsideModule,
    // BrowserAnimationsModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // MatRadioModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MomentDateModule,
    // ToastrModule.forRoot({
    //   positionClass: 'toast-bottom-right',
    //   preventDuplicates: true,
    // }),
    CommonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
