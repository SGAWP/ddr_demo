import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PlannedSinkingRoutingModule } from './planned-sinking.routing';
import { PlannedSinkingComponent } from './planned-sinking.component';
import { AddPlannedSinkingComponent } from './add-planned-sinking/add-planned-sinking.component';
import { EditPlannedSinkingComponent } from './edit-planned-sinking/edit-planned-sinking.component';

@NgModule({
    imports: [
        SharedModule,
        PlannedSinkingRoutingModule
    ],
    declarations: [
        PlannedSinkingComponent,
        AddPlannedSinkingComponent,
        EditPlannedSinkingComponent
    ],
    entryComponents: [
        AddPlannedSinkingComponent,
        EditPlannedSinkingComponent
    ]
})
export class PlannedSinkingModule { }
