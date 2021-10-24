import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoginGuard } from '../guards/is-login.guard';
import { LayoutsComponent } from './layouts.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutsRoutingModule { }