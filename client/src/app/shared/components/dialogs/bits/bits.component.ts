import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { SprBitsService } from '../../../services/spr-bits.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { AddBitComponent } from './add-bit/add-bit.component';

const COLS = [
  { value: "type", displayName: 'Тип долота' }
];

@Component({
  selector: 'app-bits',
  templateUrl: './bits.component.html',
  styleUrls: ['./bits.component.scss']
})
export class BitsComponent implements OnInit, AfterViewInit, OnDestroy {

  loading: boolean = false;
  isOpenForm: boolean = false;
  allCols = COLS;
  pageSize = 5;
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
    public dialogRef: MatDialogRef<BitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _bitsService: SprBitsService,
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
    this._bitsService.fetch(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddBitComponent, {
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

