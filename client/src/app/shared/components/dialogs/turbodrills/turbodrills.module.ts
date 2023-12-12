import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TurbodrillsComponent } from './turbodrills.component';
import { AddTurbodrillComponent } from './add-turbodrill/add-turbodrill.component';

@NgModule({
    declarations: [
        TurbodrillsComponent,
        AddTurbodrillComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        TurbodrillsComponent,
        AddTurbodrillComponent
    ]
})
export class TurbodrillsModule { }
