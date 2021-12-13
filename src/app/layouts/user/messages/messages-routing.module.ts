import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesChatComponent } from './messages-chat/messages-chat.component';
import { MessagesComponent } from './messages.component';



const routes: Routes = [
    {
        path: '',
        component: MessagesComponent,
        children: [
            {
                path: ':url',
                component: MessagesChatComponent
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessagesRoutingModule { }