import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PageTitleService } from "../../shared/services/page-title.service";
import { PlannedDataWell } from "../../shared/interfaces";
import { PlannedDataWellService } from "../../shared/services/planned-data-well.service";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddPlannedDataWellComponent } from "./add-planned-data-well/add-planned-data-well.component";
import { EditPlannedDataWellComponent } from "./edit-planned-data-well/edit-planned-data-well.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";

@Component({
  selector: 'app-planned-data-well',
  templateUrl: './planned-data-well.component.html',
  styleUrls: ['./planned-data-well.component.scss']
})
export class PlannedDataWellComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Плановые данные по скважинам";

  loading: boolean = false;
  isOpenForm: boolean = false;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  search = "";
  isActive = true;
  displayedColumns: string[] = [
    "oilfield_short_name",
    "wellplatform_name",
    "well",
    "project_depth",
    "layer",
    "diameter",
    "short_name",
    "chock",
    "drill_start",
    "drill_end"
  ];
  ngUnsubscribe = new Subject<void>();

  public dataSource;

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private pageTitleService: PageTitleService,
    private _plannedDataWellService: PlannedDataWellService,
    private _toast: ToastrService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
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
    this._plannedDataWellService.fetch(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddPlannedDataWellComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: PlannedDataWell) {
    let dialogRef = this.dialog.open(EditPlannedDataWellComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: PlannedDataWell) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: "500px",
      data: {
        title: "Подтвердите удаление",
        message: `Прежде чем продолжить, вы уверены что хотите удалить плановые данные по скважине "${row.oilfield_short_name} ${row.wellplatform_name} ${row.well}"? При удалении плановых данных удаляются все фактические записи по данной скважине.`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._plannedDataWellService.delete(row.spr_wellplatforms_id, row.well).subscribe(
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