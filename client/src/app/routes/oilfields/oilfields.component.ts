import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PageTitleService } from "../../shared/services/page-title.service";
import { Oilfield } from "../../shared/interfaces";
import { SprOilfieldsService } from "../../shared/services/spr-oilfields.service";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddOilfieldComponent } from "../../shared/components/dialogs/oilfields/add-oilfield/add-oilfield.component";
import { EditOilfieldComponent } from "./edit-oilfield/edit-oilfield.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";

const COLS = [
  { value: "oilfield_short_name", displayName: 'Сокр. Наим. Месторождения' },
  { value: "oilfield_full_name", displayName: 'Полн. Наим. Месторождения' }
];

@Component({
  selector: 'app-oilfields',
  templateUrl: './oilfields.component.html',
  styleUrls: ['./oilfields.component.scss']
})
export class OilfieldsComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Месторождения";

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

  ngUnsubscribe = new Subject<void>();

  public dataSource;

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private pageTitleService: PageTitleService,
    private _oilfieldsService: SprOilfieldsService,
    private _toast: ToastrService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
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
    this._oilfieldsService.fetch(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddOilfieldComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: Oilfield) {
    let dialogRef = this.dialog.open(EditOilfieldComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: Oilfield) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить месторождение ${row.oilfield_short_name}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._oilfieldsService.delete(row.oilfield_id).subscribe(
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
