import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ToolbarModule } from './ddr-layout/toolbar/toolbar.module';
import { SidenavModule } from './ddr-layout/sidenav/sidenav.module';
import { MenuModule } from './ddr-layout/menu/menu.module';
import { DDRLayoutComponent } from './ddr-layout/ddr-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    DDRLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    SharedModule,
    ToolbarModule,
    SidenavModule,
    MenuModule
  ]
})
export class LayoutModule { }
