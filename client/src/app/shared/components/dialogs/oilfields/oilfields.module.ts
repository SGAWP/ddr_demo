import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OilfieldsComponent } from './oilfields.component';
import { AddOilfieldComponent } from './add-oilfield/add-oilfield.component';

@NgModule({
    declarations: [
        OilfieldsComponent,
        AddOilfieldComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        OilfieldsComponent,
        AddOilfieldComponent
    ]
})
export class OilfieldsModule { }
