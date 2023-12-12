import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, AfterViewInit, OnDestroy } from "@angular/core";
import { RegimesService } from "../../../../shared/services/regimes.service";
import { Regime } from "../../../../shared/interfaces";
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddRegimeComponent } from "./add-regime/add-regime.component";
import { EditRegimeComponent } from "./edit-regime/edit-regime.component";
import { ConfirmComponent } from "../../../../shared/components/confirm/confirm.component";

// const COLS = [
//   { value: "slotting_n", displayName: 'Номер долбления' },
//   { value: "duration", displayName: 'Время' },
//   { value: "start_slotting", displayName: 'Начало долбления' },
//   { value: "slotting_end", displayName: 'Конец долбления' },
//   { value: "type", displayName: 'Долото' },
//   { value: "turbodrill_name", displayName: 'Турбобур' },
//   { value: "pump_pressure", displayName: 'Давление насоса' }
// ];

@Component({
  selector: 'app-regimes',
  templateUrl: './regimes.component.html',
  styleUrls: ['./regimes.component.scss']
})
export class RegimesComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Режимы";

  loading: boolean = false;

  pageSizeOptions = [5, 10, 25];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  search = "";
  displayedColumns: string[] = [
    'slotting_n', 
    'duration',
    'start_slotting', 
    'slotting_end', 
    'type', 
    'bit_number', 
    'turbodrill_name', 
    'turbodrill_n',
    'spindle',
    'type_spindle',
    'type_calibrator',
    'd1',
    'd2',
    'pump_pressure'
  ];
  isActive = true;

  public dataSource;

  ngUnsubscribe = new Subject<void>();

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input('day_reports_id') day_reports_id: number;

  constructor(
    private _regimesService: RegimesService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    // this.displayedColumns = this.allCols.map(col => col.value);
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
    this._regimesService.fetch(this.day_reports_id, this.search, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  add() {
    let dialogRef = this.dialog.open(AddRegimeComponent, {
      width: "700px",
      data: { title: "Добавить", action: "add", day_reports_id: this.day_reports_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: Regime) {
    let dialogRef = this.dialog.open(EditRegimeComponent, {
      width: "700px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: Regime) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить режим?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._regimesService.delete(row.regime_id).subscribe(
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
