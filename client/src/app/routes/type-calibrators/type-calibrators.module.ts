import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TypeCalibratorsRoutingModule } from './type-calibrators.routing';
import { TypeCalibratorsComponent } from './type-calibrators.component';
import { AddTypeCalibratorComponent } from './add-type-calibrator/add-type-calibrator.component';
import { EditTypeCalibratorComponent } from './edit-type-calibrator/edit-type-calibrator.component';

@NgModule({
    imports: [
        SharedModule,
        TypeCalibratorsRoutingModule
    ],
    declarations: [
        TypeCalibratorsComponent,
        AddTypeCalibratorComponent,
        EditTypeCalibratorComponent
    ],
    entryComponents: [
        AddTypeCalibratorComponent,
        EditTypeCalibratorComponent 
    ]
})
export class TypeCalibratorsModule { }
