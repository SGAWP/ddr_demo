import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddMasterComponent } from './add-master/add-master.component';
import { MastersComponent } from './masters.component';

@NgModule({
    declarations: [
        AddMasterComponent,
        MastersComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        AddMasterComponent,
        MastersComponent
    ]
})
export class MastersModule { }
