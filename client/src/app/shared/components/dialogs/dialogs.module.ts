import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MastersTeamsModule } from './masters-teams/masters-teams.module';
import { WellplatformsModule } from './wellplatforms/wellplatforms.module';
import { TurbodrillsModule } from './turbodrills/turbodrills.module';
import { TimeBalanceModule } from './time-balance/time-balance.module';
import { OperationsModule } from './operations/operations.module';
import { OilfieldsModule } from './oilfields/oilfields.module';
import { BitsModule } from './bits/bits.module';
import { RequestModule } from './requests/requests.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        MastersTeamsModule,
        WellplatformsModule,
        TurbodrillsModule,
        TimeBalanceModule,
        OperationsModule,
        OilfieldsModule,
        BitsModule,
        RequestModule
    ]
})
export class DialogsModule { }
