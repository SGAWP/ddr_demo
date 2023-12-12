import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BitsComponent } from './bits.component';
import { AddBitComponent } from './add-bit/add-bit.component';

@NgModule({
    declarations: [
        BitsComponent,
        AddBitComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        BitsComponent,
        AddBitComponent
    ]
})
export class BitsModule { }
