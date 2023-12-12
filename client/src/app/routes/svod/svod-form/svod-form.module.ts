import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SvodFormRoutingModule } from './svod-form.routing';
import { SvodFormComponent } from './svod-form.component';
import { SvodModule } from '../svod.module';
import { TimeBalanceComponent } from './time-balance/time-balance.component';
import { RegimesComponent } from './regimes/regimes.component';
import { AddRegimeComponent } from './regimes/add-regime/add-regime.component';
import { EditRegimeComponent } from './regimes/edit-regime/edit-regime.component';
import { StateComponent } from './state/state.component';
import { AddStateComponent } from './state/add-state/add-state.component';
import { EditStateComponent } from './state/edit-state/edit-state.component';
import { SinkingYearComponent } from './sinking-year/sinking-year.component';
import { SinkingMonthComponent } from './sinking-month/sinking-month.component';
import { RequestComponent } from './request/request.component';
import { AddRequestComponent } from './request/add-request/add-request.component';
import { EditRequestComponent } from './request/edit-request/edit-request.component';
import { EditTimeBalanceComponent } from './time-balance/edit-time-balance/edit-time-balance.component';

@NgModule({
    imports: [
        SharedModule,
        SvodFormRoutingModule,
        SvodModule
    ],
    declarations: [
        SvodFormComponent,
        TimeBalanceComponent,
        RegimesComponent,
        AddRegimeComponent,
        EditRegimeComponent,
        StateComponent,
        AddStateComponent,
        EditStateComponent,
        SinkingYearComponent,
        SinkingMonthComponent,
        RequestComponent,
        AddRequestComponent,
        EditRequestComponent,
        EditTimeBalanceComponent
    ],
    entryComponents: [
        AddRegimeComponent,
        EditRegimeComponent,
        AddStateComponent,
        EditStateComponent,
        AddRequestComponent,
        EditRequestComponent,
        EditTimeBalanceComponent
    ]
})
export class SvodFormModule { }
