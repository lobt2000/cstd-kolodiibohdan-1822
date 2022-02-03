import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentProfileComponent } from 'src/app/shared/components/agent-profile/agent-profile.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';
import { AgentComponent } from './agent.component';
import { KindergartenComponent } from './kindergarten/kindergarten.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
    {
        path: '',
        component: AgentComponent,
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
                path: 'kindergarten',
                component: KindergartenComponent
            },
            {
                path: 'kindergarten-apply',
                loadChildren: () => import('./applications/applications.module').then((m) => m.ApplicationsModule)
            },
            {
                path: 'profile',
                component: AgentProfileComponent
            },
            {
                path: 'messages',
                loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule)
            },
            {
                path: 'contact',
                component: ContactComponent
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
export class AgentRoutingModule { }