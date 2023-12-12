import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurbodrillsComponent } from './turbodrills.component';

const routes: Routes = [
    {
        path: "",
        component: TurbodrillsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TurbodrillsRoutingModule { }
