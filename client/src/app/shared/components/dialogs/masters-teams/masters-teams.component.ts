import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { MastersTeamsService } from '../../../services/masters-teams.service';
import { MasterTeam } from "../../../interfaces";
import { AddMtComponent } from './add-mt/add-mt.component';
import { EditMtComponent } from './edit-mt/edit-mt.component';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from "ngx-toastr";

const COLS = [
  { value: "team_name", displayName: 'Бригада' },
  { value: "master_name", displayName: 'Мастер' },
  { value: "assistant_master", displayName: 'Помощник мастера' },
  { value: "second_assistant_master", displayName: 'Помощник мастера' }
];

@Component({
  selector: 'app-masters-teams',
  templateUrl: './masters-teams.component.html',
  styleUrls: ['./masters-teams.component.scss']
})
export class MastersTeamsComponent implements OnInit, AfterViewInit {

  loading: boolean = false;
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
    public dialogRef: MatDialogRef<MastersTeamsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _mtService: MastersTeamsService,
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
    this._mtService.fetch(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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
    let dialogRef = this.dialog.open(AddMtComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  };

  edit(row: MasterTeam) {
    let dialogRef = this.dialog.open(EditMtComponent, {
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

  delete(row: MasterTeam) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить мастера и бригаду из списка?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._mtService.delete(row.master_team_id).subscribe(
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

  close() {
    this.dialogRef.close();
  }
}

