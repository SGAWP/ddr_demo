import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WellplatformsRoutingModule } from './wellplatforms.routing'
import { WellplatformsComponent } from './wellplatforms.component';
import { EditWellplatformComponent } from './edit-wellplatform/edit-wellplatform.component';


@NgModule({
    imports: [
        SharedModule,
        WellplatformsRoutingModule
    ],
    declarations: [
        WellplatformsComponent,
        EditWellplatformComponent
    ],
    entryComponents: [
        EditWellplatformComponent
    ]
})
export class WellplatformsModule { }
