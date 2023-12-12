import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PlannedDataUbrRoutingModule } from './planned-data-ubr.routing';
import { PlannedDataUbrComponent } from './planned-data-ubr.component';
import { AddPlannedDataUbrComponent } from './add-planned-data-ubr/add-planned-data-ubr.component';

@NgModule({
    imports: [
        SharedModule,
        PlannedDataUbrRoutingModule
    ],
    declarations: [
        PlannedDataUbrComponent,
        AddPlannedDataUbrComponent
    ],
    entryComponents: [
        AddPlannedDataUbrComponent
    ]
})
export class PlannedDataUBRModule { }
