import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NewSvodRoutingModule } from './new-svod.routing';
import { NewSvodComponent } from './new-svod.component';

@NgModule({
    imports: [
        SharedModule,
        NewSvodRoutingModule
    ],
    declarations: [
        NewSvodComponent
    ]
})
export class NewSvodModule { }
