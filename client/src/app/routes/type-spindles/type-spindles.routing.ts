import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeSpindlesComponent } from './type-spindles.component';

const routes: Routes = [
    {
        path: "",
        component: TypeSpindlesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TypeSpindlesRoutingModule { }
