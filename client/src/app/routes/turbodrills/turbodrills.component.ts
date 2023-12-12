import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PageTitleService } from "../../shared/services/page-title.service";
import { Turbodrill } from "../../shared/interfaces";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SprTurbodrillsService } from "../../shared/services/spr-turbodrills.service";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AddTurbodrillComponent } from "../../shared/components/dialogs/turbodrills/add-turbodrill/add-turbodrill.component";
import { EditTurbodrillComponent } from "./edit-turbodrill/edit-turbodrill.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";
import { ToastrService } from "ngx-toastr";

const COLS = [
  { value: "turbodrill_name", displayName: 'Турбобур' }
];

@Component({
  selector: 'app-turbodrills',
  templateUrl: './turbodrills.component.html',
  styleUrls: ['./turbodrills.component.scss']
})
export class TurbodrillsComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Турбобуры";

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
    private _turbodrillsService: SprTurbodrillsService,
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
    this._turbodrillsService.fetch(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddTurbodrillComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: Turbodrill) {
    let dialogRef = this.dialog.open(EditTurbodrillComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: Turbodrill) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить турбобур ${row.turbodrill_name}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._turbodrillsService.delete(row.turbodrill_id).subscribe(
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

