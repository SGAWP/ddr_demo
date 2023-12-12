import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BitsRoutingModule } from './bits.routing';
import { BitsComponent } from './bits.component';
import { EditBitComponent } from './edit-bit/edit-bit.component';

@NgModule({
    imports: [
        SharedModule,
        BitsRoutingModule
    ],
    declarations: [
        BitsComponent,
        EditBitComponent
    ],
    entryComponents: [
        EditBitComponent
    ]
})
export class BitsModule { }
