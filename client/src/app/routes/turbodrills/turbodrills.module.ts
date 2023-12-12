import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TurbodrillsRoutingModule } from './turbodrills.routing';
import { TurbodrillsComponent } from './turbodrills.component';
import { EditTurbodrillComponent } from './edit-turbodrill/edit-turbodrill.component';

@NgModule({
    imports: [
        SharedModule,
        TurbodrillsRoutingModule
    ],
    declarations: [
        TurbodrillsComponent,
        EditTurbodrillComponent
    ],
    entryComponents: [
        EditTurbodrillComponent
    ]
})
export class TurbodrillsModule { }
