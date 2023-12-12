import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannedDataUbrComponent } from './planned-data-ubr.component';

const routes: Routes = [
    {
        path: "",
        component: PlannedDataUbrComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlannedDataUbrRoutingModule { }
