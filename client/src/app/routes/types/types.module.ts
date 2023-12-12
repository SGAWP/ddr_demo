import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TypesRoutingModule } from './types.routing';
import { TypesComponent } from './types.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { AddTypeComponent } from './add-type/add-type.component';

@NgModule({
    imports: [
        SharedModule,
        TypesRoutingModule
    ],
    declarations: [
        TypesComponent,
        EditTypeComponent,
        AddTypeComponent
    ],
    entryComponents: [
        EditTypeComponent,
        AddTypeComponent
    ]
})
export class TypesModule { }
