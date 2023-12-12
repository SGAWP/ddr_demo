import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SvodComponent } from './svod.component';

const routes: Routes = [
  {
    path: "",
    component: SvodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SvodRoutingModule { }
