import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DialogModule } from '../dialog/dialog.module';
import { ToolbarComponent } from './toolbar.component';
import { BrandingComponent } from './branding/branding.component';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        BrandingComponent,
        UserComponent
    ],
    imports: [
        SharedModule,
        DialogModule
    ],
    exports: [
        ToolbarComponent,
        BrandingComponent,
        UserComponent
    ]
})
export class ToolbarModule { }
