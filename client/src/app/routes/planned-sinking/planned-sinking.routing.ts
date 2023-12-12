import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannedSinkingComponent } from './planned-sinking.component';

const routes: Routes = [
    {
        path: "",
        component: PlannedSinkingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlannedSinkingRoutingModule { }
