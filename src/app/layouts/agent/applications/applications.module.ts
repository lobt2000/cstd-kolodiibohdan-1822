import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClickOutsideModule } from 'ng-click-outside';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { GroupApplicationComponent } from './group-application/group-application.component';



@NgModule({
  declarations: [
    GroupApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ClickOutsideModule,
  ]
})
export class ApplicationsModule { }
