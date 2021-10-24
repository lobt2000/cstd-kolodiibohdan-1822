import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoginGuard } from './guards/is-login.guard';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'kindergarten', loadChildren: () => import('./layouts/layouts.module').then((m) => m.LayoutsModule), canActivate: [IsLoginGuard]
  },
  { path: 'login', component: LoginComponent, canLoad: [IsLoginGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    redirectTo: 'kindergarten',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
