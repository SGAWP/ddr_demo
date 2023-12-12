import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSvodComponent } from './new-svod.component';

const routes: Routes = [
    {
        path: "",
        component: NewSvodComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewSvodRoutingModule { }
