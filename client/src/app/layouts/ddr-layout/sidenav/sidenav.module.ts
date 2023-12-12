import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DialogModule } from '../dialog/dialog.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { MenuModule } from '../menu/menu.module';
import { SidenavComponent } from './sidenav.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

@NgModule({
    declarations: [
        SidenavComponent,
        UserPanelComponent
    ],
    imports: [
        SharedModule,
        DialogModule,
        ToolbarModule,
        MenuModule
    ],
    exports: [
        SidenavComponent,
        UserPanelComponent
    ]
})
export class SidenavModule { }
