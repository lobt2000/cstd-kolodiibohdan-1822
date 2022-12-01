import { ApplicationModule, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
import { GroupApplicationComponent } from './group-application/group-application.component';


const routes: Routes = [
    {
        path: '',
        component: ApplicationsComponent
    },
    {
        path: ':name',
        component: GroupApplicationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationsRoutingModule { }