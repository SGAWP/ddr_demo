import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog, MatPaginator } from "@angular/material";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { PageTitleService } from "../../shared/services/page-title.service";
import { DayReport } from '../../shared/interfaces'
import { SvodService } from "../../shared/services/svod.service";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

import * as _moment from 'moment';
const moment = _moment;

export const FORMAT = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
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
export class SvodComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Сводка";

  dayReports: DayReport[];
  date = moment().format('YYYY-MM-DD');

  loading: boolean = false;
  pageSizeOptions = [6, 12, 24, 48, 100];
  pageSize = 12;
  page = 1;
  totalItems = 0;
  isActive = true;
  search: string = "";
  isOpenForm: boolean = false;

  form: FormGroup;

  maxDate: string = moment().format('YYYY-MM-DD');
  selectedDate: string = moment().format('YYYY-MM-DD');

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private pageTitleService: PageTitleService,
    private _toast: ToastrService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _svodService: SvodService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('selectedDate')) {
      this.selectedDate = moment().format('YYYY-MM-DD');
    } else {
      this.onSelectDate(localStorage.getItem('selectedDate'));
    }
    this.pageTitleService.setTitle(this.title);
  }

  ngAfterViewInit() {
    this.load();
    this.cdr.detectChanges();
  }

  onSelectDate(event): void {
    this.selectedDate = moment(event).format('YYYY-MM-DD');
    localStorage.setItem('selectedDate', this.selectedDate);
    this.load();
  }

  applyFilter() {
    let searchFilter: any = {
      filterValue: this.search
    };
    this.dayReports.filter = searchFilter;
    if (this.page !== 1) {
      this.page = this.paginator.pageIndex = 0;
      this.pageLoad();
    } else {
      this.load();
    }
  }

  pageLoad() {
    if (this.page === 0) {
      this.page = this.paginator.pageIndex + 1;
      this.load();
    }
  }

  clear(): void {
    this.search = "";
    this.applyFilter();
  }

  load() {
    const params = {
      search: this.search,
      pageSize: this.pageSize,
      page: this.page
    };
    this.loading = true;
    this.isActive = false;
    this._svodService.fetch(this.selectedDate, params).pipe(takeUntil(this.ngUnsubscribe)).subscribe(dayReports => {
      this.loading = false;
      this.isActive = true;
      this.dayReports = dayReports.rows;
      this.totalItems = dayReports.count;
    }, error => {
      this.loading = false;
      this.isActive = true;
      this._toast.error(error.error.message);
    })
  }

  onPaginateChange(event) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.load();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  delete(dayReport: DayReport) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить сводку?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._svodService.delete(dayReport.hour_id).subscribe(
          response => this._toast.success(response.message),
          error => {
            this._toast.error(error.error.message);
          },
          () => {
            this.load();
          }
        );
      }
    });
  }

  onSave() {
    this.loading = true;
    this._svodService.defaultCreate().subscribe(
      () => {
        this.loading = false;
        this._toast.success("Данные сохраненны.");
        this.load();
      },
      error => {
        this.loading = false;
        this._toast.error(error.error.message);
        this.load();
      }
    )
  }

}
