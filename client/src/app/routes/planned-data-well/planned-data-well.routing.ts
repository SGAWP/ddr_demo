import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannedDataWellComponent } from './planned-data-well.component';

const routes: Routes = [
    {
        path: "",
        component: PlannedDataWellComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlannedDataWellRoutingModule { }
