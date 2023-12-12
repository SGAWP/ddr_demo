import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { SvodWorkDrillingComponent } from './svod-work-drilling/svod-work-drilling.component';
import { SvodComponent } from './svod/svod.component';

@NgModule({
    declarations: [
        SettingsComponent,
        SvodWorkDrillingComponent,
        SvodComponent
    ],
    imports: [
        SharedModule,
    ],
    entryComponents: [
        SettingsComponent,
        SvodWorkDrillingComponent,
        SvodComponent
    ]
})
export class DialogModule { }
