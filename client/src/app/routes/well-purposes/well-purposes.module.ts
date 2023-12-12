import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WellPurposesRoutingModule } from './well-purposes.routing';
import { WellPurposesComponent } from './well-purposes.component';
import { EditWellPurposeComponent } from './edit-well-purpose/edit-well-purpose.component';
import { AddWellPurposeComponent } from './add-well-purpose/add-well-purpose.component';

@NgModule({
    imports: [
        SharedModule,
        WellPurposesRoutingModule
    ],
    declarations: [
        WellPurposesComponent,
        AddWellPurposeComponent,
        EditWellPurposeComponent
    ],
    entryComponents: [
        AddWellPurposeComponent,
        EditWellPurposeComponent
    ]
})
export class WellPurposesModule { }
