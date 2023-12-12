import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RequestsComponent } from './requests.component';
import { AddRequestsComponent } from './add-requests/add-requests.component';

@NgModule({
    declarations: [
        RequestsComponent,
        AddRequestsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        RequestsComponent,
        AddRequestsComponent
    ]
})
export class RequestModule { }
