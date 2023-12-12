import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy } from "@angular/core";
import { MastersService } from "../../shared/services/masters.service";
import { PageTitleService } from "../../shared/services/page-title.service";
import { Master } from "../../shared/interfaces";
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddMasterComponent } from "../../shared/components/dialogs/masters/add-master/add-master.component";
import { EditMasterComponent } from "./edit-master/edit-master.component";
import { ConfirmComponent } from "../../shared/components/confirm/confirm.component";

const COLS = [
  { value: "master_name", displayName: 'ФИО мастера' },
  { value: "assistant_master", displayName: 'ФИО помощника мастера' },
  { value: "second_assistant_master", displayName: 'ФИО помощника мастера' },
  { value: "comment", displayName: 'Комментарий' }
];

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Мастера";

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

  public dataSource;

  ngUnsubscribe = new Subject<void>();

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private pageTitleService: PageTitleService,
    private _mastersService: MastersService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
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
    this._mastersService.fetch(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddMasterComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: Master) {
    let dialogRef = this.dialog.open(EditMasterComponent, {
      width: '500px',
      data: { title: 'Редактировать', action: 'edit', data: row }
    })
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.load()
        }
      }
    )
  }

  delete(row: Master) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить мастера ${row.master_name}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._mastersService.delete(row.master_id).subscribe(
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
