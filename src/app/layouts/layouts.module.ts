
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../shared/const/myformat';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutsComponent } from './layouts.component';
import { UserComponent } from './user/user.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    LayoutsComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class LayoutsModule { }
