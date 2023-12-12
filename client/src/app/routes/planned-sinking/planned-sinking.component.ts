import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PageTitleService } from "../../shared/services/page-title.service";
import { PlannedSinking, Year, Month } from "../../shared/interfaces";
import { MonthService } from "../../shared/services/months.service";
import { YearService } from "../../shared/services/years.service";
import { PlannedSinkingService } from "../../shared/services/planned-sinkings.service";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddPlannedSinkingComponent } from "./add-planned-sinking/add-planned-sinking.component";
import { EditPlannedSinkingComponent } from "./edit-planned-sinking/edit-planned-sinking.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";

import * as _moment from 'moment';
const moment = _moment;

const COLS = [
  { value: "team_name", displayName: 'Бригада' },
  { value: "master_name", displayName: 'Мастер' },
  { value: "sinking_month", displayName: 'За месяц' }
];

@Component({
  selector: 'app-planned-sinking',
  templateUrl: './planned-sinking.component.html',
  styleUrls: ['./planned-sinking.component.scss']
})
export class PlannedSinkingComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Плановая проходка по бригадам";

  loading: boolean = false;
  isOpenForm: boolean = false;
  allCols = COLS;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  search = "";
  displayedColumns: any[];
  isActive = true;

  months: Month[];
  years: Year[];

  convert(value) {
    return parseFloat(value);
  }

  selectedMonth = this.convert(moment().format('M'));
  selectedYear = this.convert(moment().format('YYYY'));

  ngUnsubscribe = new Subject<void>();

  public dataSource;

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private pageTitleService: PageTitleService,
    private _plannedSinkingService: PlannedSinkingService,
    private _monthService: MonthService,
    private _yearService: YearService,
    public dialog: MatDialog,
    private _toast: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
    this.displayedColumns = this.allCols.map(col => col.value);
    this.loadMonths();
    this.loadYears();
  }

  ngAfterViewInit() {
    this.load();
    this.cdr.detectChanges();
  }

  onSelectMonth(event): void {
    this.selectedMonth = event;
    this.load();
  }

  onSelectYear(event): void {
    this.selectedYear = event;
    this.load();
  }

  applyFilter() {
    this.dataSource.filter = this.search ? this.search.trim().toLowerCase() : '';
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

  loadMonths() {
    this._monthService.fetch().subscribe(month => {
      this.months = month;
    });
  }


  loadYears() {
    this._yearService.fetch().subscribe(year => {
      this.years = year;
    });
  }

  load() {
    this.loading = true;
    this.isActive = false;
    this._plannedSinkingService.fetch(this.selectedMonth, this.selectedYear, this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.loading = false;
      this.isActive = true;
      this.dataSource = new MatTableDataSource(data.rows);
      this.totalItems = data.count;
      this.dataSource.sort = this.sort;
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  add() {
    let dialogRef = this.dialog.open(AddPlannedSinkingComponent, {
      width: "500px",
      data: {
        title: "Добавить",
        action: "add",
        months_id: this.selectedMonth,
        years_id: this.selectedYear-2019
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: PlannedSinking) {
    let dialogRef = this.dialog.open(EditPlannedSinkingComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: PlannedSinking) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить плановые данные по бригаде № ${row.team_name} и мастеру ${row.master_name} за ${row.month} ${row.year} г.?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._plannedSinkingService.delete(row.planned_sinking_id).subscribe(
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

}