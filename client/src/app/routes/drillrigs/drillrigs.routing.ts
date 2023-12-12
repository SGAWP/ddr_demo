import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrillrigsComponent } from './drillrigs.component';

const routes: Routes = [
    {
        path: "",
        component: DrillrigsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DrillrigsRoutingModule { }
