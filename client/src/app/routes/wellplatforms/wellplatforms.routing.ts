import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellplatformsComponent } from './wellplatforms.component';

const routes: Routes = [
    {
        path: "",
        component: WellplatformsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WellplatformsRoutingModule { }
