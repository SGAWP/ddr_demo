import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeamsComponent } from './teams.component';
import { AddTeamComponent } from './add-team/add-team.component';

@NgModule({
    declarations: [
        TeamsComponent,
        AddTeamComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        TeamsComponent,
        AddTeamComponent
    ]
})
export class TeamsModule { }
