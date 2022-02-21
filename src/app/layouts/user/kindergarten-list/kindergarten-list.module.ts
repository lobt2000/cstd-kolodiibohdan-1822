
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from 'src/app/shared/const/myformat';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KindergartenListRoutingModule } from './kindergarten-list-routing.module';
import { KindergartenDetailsComponent } from './kindergarten-details/kindergarten-details.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    KindergartenDetailsComponent
  ],
  imports: [
    CommonModule,
    KindergartenListRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ClickOutsideModule,
    MatTooltipModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class KindergartenListModule { }