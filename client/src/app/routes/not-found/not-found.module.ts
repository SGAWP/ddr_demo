import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundRoutingModule } from './not-found.routing';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    imports: [
        SharedModule,
        NotFoundRoutingModule
    ],
    declarations: [
        NotFoundComponent
    ]
})
export class NotFoundModule { }
