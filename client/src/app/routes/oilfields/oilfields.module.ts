import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { OilfieldsComponent } from './oilfields.component';
import { OilfieldsRoutingModule } from './oilfields.routing';
import { EditOilfieldComponent } from './edit-oilfield/edit-oilfield.component';

@NgModule({
    imports: [
        SharedModule,
        OilfieldsRoutingModule
    ],
    declarations: [
        OilfieldsComponent,
        EditOilfieldComponent
    ],
    entryComponents: [
        EditOilfieldComponent
    ]
})
export class OilfieldsModule { }
