import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeCalibratorsComponent } from './type-calibrators.component';

const routes: Routes = [
    {
        path: "",
        component: TypeCalibratorsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TypeCalibratorsRoutingModule { }
