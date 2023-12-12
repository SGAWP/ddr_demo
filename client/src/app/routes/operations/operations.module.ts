import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { OperationsRoutingModule } from './operations.routing';
import { OperationsComponent } from './operations.component';
import { EditOperationComponent } from './edit-operation/edit-operation.component';
import { AddOperationComponent } from './add-operation/add-operation.component';
import { AddOperationDirectoryComponent } from './add-operation-directory/add-operation-directory.component';

@NgModule({
    imports: [
        SharedModule,
        OperationsRoutingModule
    ],
    declarations: [
        OperationsComponent,
        EditOperationComponent,
        AddOperationComponent,
        AddOperationDirectoryComponent
    ],
    entryComponents: [
        AddOperationComponent,
        AddOperationDirectoryComponent,
        EditOperationComponent
    ]
})
export class OperationsModule { }
