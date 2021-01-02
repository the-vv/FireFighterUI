import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ControllerBaseComponent } from './controller-base/controller-base.component'


const routes: Routes = [
  { path: 'starter', component: StarterComponent },
  { path: 'controller', component: ControllerBaseComponent },
  { path: '**', component: StarterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
