import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WellplatformsComponent } from './wellplatforms.component';
import { AddWellplatformComponent } from './add-wellplatform/add-wellplatform.component';

@NgModule({
    declarations: [
        WellplatformsComponent,
        AddWellplatformComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        WellplatformsComponent,
        AddWellplatformComponent
    ]
})
export class WellplatformsModule { }
