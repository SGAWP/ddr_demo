import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TypeSpindlesRoutingModule } from './type-spindles.routing';
import { TypeSpindlesComponent } from './type-spindles.component';
import { AddTypeSpindleComponent } from './add-type-spindle/add-type-spindle.component';
import { EditTypeSpindleComponent } from './edit-type-spindle/edit-type-spindle.component';

@NgModule({
    imports: [
        SharedModule,
        TypeSpindlesRoutingModule
    ],
    declarations: [
        TypeSpindlesComponent,
        AddTypeSpindleComponent,
        EditTypeSpindleComponent,
    ],
    entryComponents: [
        AddTypeSpindleComponent,
        EditTypeSpindleComponent
    ]
})
export class TypeSpindlesModule { }
