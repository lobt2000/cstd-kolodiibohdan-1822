import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KindergartenListComponent } from './kindergarten-list/kindergarten-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserComponent } from './user.component';


const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'main-page'
            },
            {
                path: 'main-page',
                component: MainPageComponent                
            }, 
            {
                path: 'kindergarten-list',
                component: KindergartenListComponent                
            }, 
            {
                path: "**",
                redirectTo: "main-page"
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }