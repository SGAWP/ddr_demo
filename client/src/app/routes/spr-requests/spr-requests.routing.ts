import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SprRequestsComponent } from './spr-requests.component';

const routes: Routes = [
    {
        path: "",
        component: SprRequestsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SprRequestsRoutingModule { }
