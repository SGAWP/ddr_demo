import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PageTitleService } from "../../shared/services/page-title.service";
import { Wellplatform } from "../../shared/interfaces";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SprWellplatformsService } from "../../shared/services/spr-wellplatforms.service";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AddWellplatformComponent } from "../../shared/components/dialogs/wellplatforms/add-wellplatform/add-wellplatform.component";
import { EditWellplatformComponent } from "./edit-wellplatform/edit-wellplatform.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";
import { ToastrService } from "ngx-toastr";

const COLS = [
  { value: "wellplatform_name", displayName: 'Куст' },
  { value: "oilfield_short_name", displayName: 'Месторождение' }
];

@Component({
  selector: 'app-wellplatforms',
  templateUrl: './wellplatforms.component.html',
  styleUrls: ['./wellplatforms.component.scss']
})
export class WellplatformsComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Кусты";

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
    private _wellplatformsService: SprWellplatformsService,
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
    this._wellplatformsService.fetch(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddWellplatformComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: Wellplatform) {
    let dialogRef = this.dialog.open(EditWellplatformComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: Wellplatform) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить куст ${row.wellplatform_name}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._wellplatformsService.delete(row.wellplatform_id).subscribe(
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

