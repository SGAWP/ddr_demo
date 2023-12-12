import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { MastersService } from '../../../services/masters.service';
import { ToastrService } from "ngx-toastr";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddMasterComponent } from './add-master/add-master.component';

const COLS = [
  { value: "master_name", displayName: 'Мастер' },
  { value: "assistant_master", displayName: 'Помощник мастера' },
  { value: "second_assistant_master", displayName: 'Помощник мастера' }
];

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit, AfterViewInit, OnDestroy {

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

  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<MastersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mastersService: MastersService,
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
    this._mastersService.getMTAll(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddMasterComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  };

  close() {
    this.dialogRef.close();
  }
}

