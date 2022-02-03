
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { MY_FORMATS } from '../shared/const/myformat';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './components/header/header.component';
import { HeaderItemsComponent } from './components/header/header-items/header-items.component';
import { MenuComponent } from './components/menu/menu.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LayoutsRoutingModule } from '../layouts/layouts-routing.module';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgentMenuComponent } from './components/agent-menu/agent-menu.component';
import { AgentProfileComponent } from './components/agent-profile/agent-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchMessagesPipe } from './pipes/search-messages.pipe';
// import { MatRadioModule } from '@angular/material/radio';
@NgModule({
    declarations: [
        HeaderComponent,
        HeaderItemsComponent,
        MenuComponent,
        ResetPasswordComponent,
        AgentMenuComponent,
        AgentProfileComponent,
        UserProfileComponent,
        ContactComponent,
        SearchMessagesPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        ClickOutsideModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MomentDateModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        MatStepperModule,
        MatRadioModule,
        LayoutsRoutingModule,
        MatCarouselModule.forRoot(),
        MatProgressSpinnerModule
    ],
    exports: [
        HeaderComponent,
        HeaderItemsComponent,
        MenuComponent,
        ResetPasswordComponent,
        AgentMenuComponent,
        SearchMessagesPipe
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ],
})
export class SharedModule { }
