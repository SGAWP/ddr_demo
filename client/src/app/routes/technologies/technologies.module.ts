import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TechnologiesRoutingModule } from './technologies.routing';
import { TechnologiesComponent } from './technologies.component';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';

@NgModule({
    imports: [
        SharedModule,
        TechnologiesRoutingModule
    ],
    declarations: [
        TechnologiesComponent,
        AddTechnologyComponent,
        EditTechnologyComponent
    ],
    entryComponents: [
        AddTechnologyComponent,
        EditTechnologyComponent
    ]
})
export class TechnologiesModule { }
