import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MastersRoutingModule } from './masters.routing';
import { MastersComponent } from './masters.component';
import { EditMasterComponent } from './edit-master/edit-master.component';

@NgModule({
    imports: [
        SharedModule,
        MastersRoutingModule
    ],
    declarations: [
        MastersComponent,
        EditMasterComponent
    ],
    entryComponents: [
        EditMasterComponent
    ]
})
export class MastersModule { }
