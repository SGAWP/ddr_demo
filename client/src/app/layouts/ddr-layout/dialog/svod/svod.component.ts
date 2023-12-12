import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ReportService } from "../../../../shared/services/report.service";
import { saveAs } from 'file-saver';
import { ToastrService } from "ngx-toastr";

import * as _moment from 'moment';
const moment = _moment;

export const FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-svod',
  templateUrl: './svod.component.html',
  styleUrls: ['./svod.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: FORMAT }
  ]
})
export class SvodComponent {

  selectedDate: string = moment().format('YYYY-MM-DD');
  maxDate: string = moment().format('YYYY-MM-DD');
  
  constructor(
    public dialogRef: MatDialogRef<SvodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _reportService: ReportService,
    private _toast: ToastrService
  ) { }

  onSelectDate(event): void {
    this.selectedDate = moment(event).format('YYYY-MM-DD')
  }

  report() {
    this._reportService.getSvod(this.selectedDate).subscribe((file) => {
      saveAs(file, `svod-${moment(this.selectedDate).format('DD.MM.YYYY')}.xlsx`, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    }, error => {
      this._toast.error(`Сводка за ${moment(this.selectedDate).format('DD.MM.YYYY')} не может быть составлен.`);
    })
  }

}
