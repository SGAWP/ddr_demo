import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DrillrigsRoutingModule } from './drillrigs.routing';
import { DrillrigsComponent } from './drillrigs.component';
import { AddDrillrigComponent } from './add-drillrig/add-drillrig.component';
import { EditDrillrigComponent } from './edit-drillrig/edit-drillrig.component';

@NgModule({
    imports: [
        SharedModule,
        DrillrigsRoutingModule
    ],
    declarations: [
        DrillrigsComponent,
        AddDrillrigComponent,
        EditDrillrigComponent
    ],
    entryComponents: [
        AddDrillrigComponent,
        EditDrillrigComponent
    ]
})
export class DrillrigsModule { }
