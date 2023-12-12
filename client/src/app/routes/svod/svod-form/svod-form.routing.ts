import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SvodFormComponent } from './svod-form.component';

const routes: Routes = [
    {
        path: "",
        component: SvodFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SvodFormRoutingModule { }
