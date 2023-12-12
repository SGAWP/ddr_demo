import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TeamsRoutingModule } from './teams.routing';
import { TeamsComponent } from './teams.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

@NgModule({
    imports: [
        SharedModule,
        TeamsRoutingModule
    ],
    declarations: [
        TeamsComponent,
        EditTeamComponent
    ],
    entryComponents: [
        EditTeamComponent
    ]
})
export class TeamsModule { }
