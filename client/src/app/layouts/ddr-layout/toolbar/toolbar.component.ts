import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from "@angular/material";
import { SvodWorkDrillingComponent } from "../dialog/svod-work-drilling/svod-work-drilling.component";
import { SvodComponent } from "../../../layouts/ddr-layout/dialog/svod/svod.component";
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})

export class ToolbarComponent {
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog
  ) { }

  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  fullscreen() {
    if (this.screenfull.enabled) {
      this.screenfull.toggle();
    }
  }

  openDialogStatesReport() {
    let dialogRef = this.dialog.open(SvodWorkDrillingComponent, {
      width: '300px',
      data: { title: "Сводка выполнения работ по бурению" }
    })
    dialogRef.afterClosed();
  }

  openDialogSvod() {
    let dialogRef = this.dialog.open(SvodComponent, {
      width: '300px',
      data: { title: "Сводка" }
    })
    dialogRef.afterClosed();
  }

}
