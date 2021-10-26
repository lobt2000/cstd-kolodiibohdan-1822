import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoginGuard } from '../guards/is-login.guard';
import { IsUserGuard } from '../guards/is-user.guard';
import { LoginComponent } from '../login/login.component';
import { ResetPasswordComponent } from '../shared/components/reset-password/reset-password.component';
import { LayoutsComponent } from './layouts.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutsComponent,
        children: [
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
                canActivate: [IsLoginGuard, IsUserGuard]
            },
            { path: 'login', component: LoginComponent},
            { path: 'reset-password', component: ResetPasswordComponent },
            {
                path: "**",
                redirectTo: "user",
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutsRoutingModule { }