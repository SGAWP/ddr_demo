import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MastersModule } from '../masters/masters.module';
import { TeamsModule } from '../teams/teams.module';
import { MastersTeamsComponent } from './masters-teams.component';
import { AddMtComponent } from './add-mt/add-mt.component';
import { EditMtComponent } from './edit-mt/edit-mt.component';

@NgModule({
    declarations: [
        MastersTeamsComponent,
        AddMtComponent,
        EditMtComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        MastersModule,
        TeamsModule
    ],
    entryComponents: [
        MastersTeamsComponent,
        AddMtComponent,
        EditMtComponent
    ]
})
export class MastersTeamsModule { }
