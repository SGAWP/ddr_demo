import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SprRequestsRoutingModule } from './spr-requests.routing';
import { SprRequestsComponent } from './spr-requests.component';
import { EditRequestComponent } from './edit-request/edit-request.component';

@NgModule({
    imports: [
        SharedModule,
        SprRequestsRoutingModule
    ],
    declarations: [
        SprRequestsComponent,
        EditRequestComponent
    ],
    entryComponents: [
        EditRequestComponent
    ]
})
export class SprRequestsModule { }
