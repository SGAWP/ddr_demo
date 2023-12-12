import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { StateService } from "../../../../shared/services/state.service";
import { State } from "../../../../shared/interfaces";
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
// import { Chart } from 'chart.js';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddStateComponent } from "./add-state/add-state.component";
import { EditStateComponent } from "./edit-state/edit-state.component";
import { ConfirmComponent } from "../../../../shared/components/confirm/confirm.component";

const COLS = [
  { value: "state_time", displayName: 'Время состояния' },
  { value: "bottom", displayName: 'Глубина забоя' },
  { value: "density", displayName: 'Плотность' },
  { value: "visconsity", displayName: 'Вязкость' },
  { value: "water_separation", displayName: 'Водоотдача' }
];

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit, AfterViewInit, OnDestroy {

  title = "Состояния";

  loading: boolean = false;
  allCols = COLS;
  pageSizeOptions = [5, 10, 25];
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

  @Input('day_reports_id') day_reports_id: number;
  // @ViewChild('state', { static: false }) stateRef: ElementRef;

  constructor(
    private _stateService: StateService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.displayedColumns = this.allCols.map(col => col.value);
  }
  ngAfterViewInit() {
    this.load();
    // this.loadChartState();
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
    this._stateService.fetch(this.day_reports_id, this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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

  // private loadChartState() {
  //   const densityConfig: any = {
  //     label: 'Плотность',
  //     backgroundColor: 'rgb(103, 58, 183)',
  //     borderColor: 'rgb(103, 58, 183)',
  //     fill: false
  //   }

  //   const visconsityConfig: any = {
  //     label: 'Вязкость',
  //     backgroundColor: 'rgb(96, 125, 139)',
  //     borderColor: 'rgb(96, 125, 139)',
  //     fill: false
  //   }

  //   const bottomConfig: any = {
  //     label: 'Глубина забоя',
  //     backgroundColor: 'rgb(233, 30, 99)',
  //     borderColor: 'rgb(233, 30, 99)',
  //     fill: false
  //   }

  //   const waterSeparationConfig: any = {
  //     label: 'Водоотдача',
  //     backgroundColor: 'rgb(63, 81, 181)',
  //     borderColor: 'rgb(63, 81, 181)',
  //     fill: false
  //   }

  //   const stateTimeConfig: any = {
  //     datasets: [visconsityConfig, densityConfig, bottomConfig, waterSeparationConfig]
  //   }
  //   this._stateService.getCharts(this.day_reports_id).subscribe((data: State[]) => {
  //     densityConfig.data = data.map(item => item.density)
  //     bottomConfig.data = data.map(item => item.bottom)
  //     visconsityConfig.data = data.map(item => item.visconsity)
  //     waterSeparationConfig.data = data.map(item => item.water_separation)
  //     stateTimeConfig.labels = data.map(item => item.state_time)
  //     const stateCtx = this.stateRef.nativeElement.getContext('2d')

  //     new Chart(stateCtx, {
  //       type: 'line',
  //       data: stateTimeConfig,
  //       options: {
  //         responsive: true,
  //         scales: {
  //           yAxes: [{
  //             gridLines: {
  //               color: "rgba(0, 0, 0, 0.2)"
  //             }
  //           }],
  //           xAxes: [{
  //             gridLines: {
  //               color: "rgba(0, 0, 0, 0.2)"
  //             }
  //           }]
  //         }
  //       }
  //     })
  //   })
  // }

  add() {
    let dialogRef = this.dialog.open(AddStateComponent, {
      width: "500px",
      data: { title: "Добавить", action: "add", day_reports_id: this.day_reports_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
        // this.loadChartState();
      }
    });
  }

  edit(row: State) {
    let dialogRef = this.dialog.open(EditStateComponent, {
      width: "500px",
      data: { title: "Редактировать", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
        // this.loadChartState();
      }
    });
  }

  delete(row: State) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить режим?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._stateService.delete(row.state_id).subscribe(
          response => this._toast.success(response.message),
          error => {
            this._toast.error(error.error.message);
          },
          () => {
            this.load();
            // this.loadChartState();
          }
        );
      }
    });
  }

}
