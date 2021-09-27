import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChromeDragonGameComponent } from './component/chrome-dragon-game/chrome-dragon-game.component';
import { ControlsInfoComponent } from './component/controls-info/controls-info.component';

const routes: Routes = [
  { path: 'game/:name', component: ChromeDragonGameComponent },
  { path: 'game', component: AppComponent },
  { path: 'controls', component: ControlsInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
