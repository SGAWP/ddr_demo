import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitsComponent } from './bits.component';

const routes: Routes = [
    {
        path: "",
        component: BitsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class  BitsRoutingModule { }
