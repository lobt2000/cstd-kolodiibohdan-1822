
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from 'src/app/shared/const/myformat';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClickOutsideModule } from 'ng-click-outside';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesChatComponent } from './messages-chat/messages-chat.component';


@NgModule({
    declarations: [
    MessagesChatComponent
  ],
    imports: [
        CommonModule,
        MessagesRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        ClickOutsideModule,
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ],
})
export class MessagesModule { }