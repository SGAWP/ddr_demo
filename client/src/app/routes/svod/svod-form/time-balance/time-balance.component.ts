import { Component, OnInit, ViewChild, Input, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { TimeBalanceService } from "../../../../shared/services/time-balance.service";
import { TimeBalance } from "../../../../shared/interfaces";
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddTimeBalanceComponent } from "../../../../shared/components/dialogs/time-balance/add-time-balance/add-time-balance.component";
import { EditTimeBalanceComponent } from "./edit-time-balance/edit-time-balance.component";
import { ConfirmComponent } from "../../../../shared/components/confirm/confirm.component";

const COLS = [
  { value: "operation_short_name", displayName: 'Содержание' },
  { value: "duration", displayName: 'Длительность' }
];

@Component({
  selector: 'app-time-balance',
  templateUrl: './time-balance.component.html',
  styleUrls: ['./time-balance.component.scss']
})
export class TimeBalanceComponent implements OnInit, AfterViewInit {

  title = "Баланс времени";

  loading: boolean = false;
  allCols = COLS;
  pageSizeOptions = [5, 10, 25];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  search = "";
  displayedColumns: any[];
  isActive = true;
  totalDuration: TimeBalance;

  public dataSource;

  ngUnsubscribe = new Subject<void>();

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input('day_reports_id') day_reports_id: number;

  constructor(
    private _timeBalanceService: TimeBalanceService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.displayedColumns = this.allCols.map(col => col.value);
  }
  ngAfterViewInit() {
    this.load();
    this.total();
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
    this._timeBalanceService.fetch(this.day_reports_id, this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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

  total() {
    this.loading = true;
    this._timeBalanceService.total(this.day_reports_id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(total => {
      this.loading = false;
      this.totalDuration = total;
      console.log(this.totalDuration)
    }, error => {
      this.loading = false;
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

  add() {
    let dialogRef = this.dialog.open(AddTimeBalanceComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add", day_reports_id: this.day_reports_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
        this.total();
      }
    });
  }

  edit(row: TimeBalance) {
    let dialogRef = this.dialog.open(EditTimeBalanceComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
        this.total();
      }
    });
  }

  delete(row: TimeBalance) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить баланс времени?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._timeBalanceService.delete(row.time_balance_id).subscribe(
          response => this._toast.success(response.message),
          error => {
            this._toast.error(error.error.message);
          },
          () => {
            this.load();
            this.total();
          }
        );
      }
    });
  }

}
