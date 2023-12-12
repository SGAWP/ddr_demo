import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellPurposesComponent } from './well-purposes.component';

const routes: Routes = [
    {
        path: "",
        component: WellPurposesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WellPurposesRoutingModule { }
