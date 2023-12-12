import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimeBalanceComponent } from './time-balance.component';
import { AddTimeBalanceComponent } from './add-time-balance/add-time-balance.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { OwlDTIntl } from '../../../classes/owldatetimeintl';

@NgModule({
    declarations: [
        TimeBalanceComponent,
        AddTimeBalanceComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TextMaskModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MaterialModule,
        FlexLayoutModule
    ],
    entryComponents: [
        TimeBalanceComponent,
        AddTimeBalanceComponent
    ],
    providers: [
        { provide: OwlDateTimeIntl, useClass: OwlDTIntl }
    ]
})
export class TimeBalanceModule { }
