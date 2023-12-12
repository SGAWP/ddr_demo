import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SvodRoutingModule } from './svod.routing';
import { SvodComponent } from './svod.component';

@NgModule({
    imports: [
        SharedModule,
        SvodRoutingModule
    ],
    declarations: [
        SvodComponent
    ]
})
export class SvodModule { }
