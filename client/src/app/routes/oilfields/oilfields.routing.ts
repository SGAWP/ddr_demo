import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OilfieldsComponent } from './oilfields.component';

const routes: Routes = [
    {
        path: "",
        component: OilfieldsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OilfieldsRoutingModule { }
