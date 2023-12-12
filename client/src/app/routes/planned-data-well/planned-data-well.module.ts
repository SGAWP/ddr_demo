import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PlannedDataWellRoutingModule } from './planned-data-well.routing';
import { PlannedDataWellComponent } from './planned-data-well.component';
import { AddPlannedDataWellComponent } from './add-planned-data-well/add-planned-data-well.component';
import { EditPlannedDataWellComponent } from './edit-planned-data-well/edit-planned-data-well.component';

@NgModule({
    imports: [
        SharedModule,
        PlannedDataWellRoutingModule
    ],
    declarations: [
        PlannedDataWellComponent,
        AddPlannedDataWellComponent,
        EditPlannedDataWellComponent
    ],
    entryComponents: [
        AddPlannedDataWellComponent,
        EditPlannedDataWellComponent
    ]
})
export class PlannedDataWellModule { }
