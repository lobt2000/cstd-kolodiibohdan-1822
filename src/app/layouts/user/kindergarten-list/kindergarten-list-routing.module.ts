import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KindergartenDetailsComponent } from './kindergarten-details/kindergarten-details.component';
import { KindergartenListComponent } from './kindergarten-list.component';


const routes: Routes = [
    {
        path: '',
        component: KindergartenListComponent
    },
    {
        path: ':title',
        component: KindergartenDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KindergartenListRoutingModule { }