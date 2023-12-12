import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Input, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { TimeBalanceService } from '../../../services/time-balance.service';
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddTimeBalanceComponent } from './add-time-balance/add-time-balance.component';

const COLS = [
  { value: "operation_short_name", displayName: 'Содержание' },
  { value: "duration", displayName: 'Длительность' }
];

@Component({
  selector: 'app-time-balance',
  templateUrl: './time-balance.component.html',
  styleUrls: ['./time-balance.component.scss']
})
export class TimeBalanceComponent implements OnInit, AfterViewInit, OnDestroy {

  loading: boolean = false;
  allCols = COLS;
  pageSize = 5;
  page = 1;
  totalItems = 0;
  search = "";
  displayedColumns: any[];
  isActive = true;

  ngUnsubscribe = new Subject<void>();

  public dataSource;

  @Input('day_reports_id') day_reports_id: number;

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<TimeBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _timeBlanceService: TimeBalanceService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.displayedColumns = this.allCols.map(col => col.value);
  }

  ngAfterViewInit() {
    this.load();
    this.cdr.detectChanges();
  }

  applyFilter() {
    this.dataSource.filter = this.search ? this.search.trim().toLowerCase() : '';
    if (this.page !== 1) {
      this.page = this.paginator.pageIndex = 0;
      this.pageLoad()
    } else {
      this.load()
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
    this.loading = true;
    this.isActive = false;
    this._timeBlanceService.fetch(this.data.day_reports_id, this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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

  onAddToForm(row) {
    this.dialogRef.close(row);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  add() {
    let dialogRef = this.dialog.open(AddTimeBalanceComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add", day_reports_id: this.day_reports_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

