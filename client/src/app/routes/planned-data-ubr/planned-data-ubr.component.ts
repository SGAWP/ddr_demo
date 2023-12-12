import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlannedDataUBR, Month, Year } from "../../shared/interfaces";
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { PlannedDataUBRService } from "../../shared/services/planned-data-ubr.service";
import { PageTitleService } from "../../shared/services/page-title.service";
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MonthService } from "../../shared/services/months.service";
import { YearService } from "../../shared/services/years.service";
import { AddPlannedDataUbrComponent } from "./add-planned-data-ubr/add-planned-data-ubr.component";

import * as _moment from 'moment';
const moment = _moment;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-planned-data-ubr',
  templateUrl: './planned-data-ubr.component.html',
  styleUrls: ['./planned-data-ubr.component.scss']
})

export class PlannedDataUbrComponent implements OnInit {

  title = "Плановые данные для УБР в целом";


  plannedDataUBR: PlannedDataUBR;
  loading: boolean = false;
  isOpenForm: boolean = false;

  months: Month[];
  years: Year[];

  matcher = new MyErrorStateMatcher();

  convert(value) {
    return parseFloat(value);
  }

  selectedMonth = this.convert(moment().format('M'));
  selectedYear = this.convert(moment().format('YYYY'));

  constructor(
    private pageTitleService: PageTitleService,
    private _plannedDataUBRService: PlannedDataUBRService,
    private _monthService: MonthService,
    private _yearService: YearService,
    public dialog: MatDialog,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
    this.loadMonths();
    this.loadYears();
    this.load();
  }

  onSelectMonth(event): void {
    this.selectedMonth = event;
    this.load();
  }

  onSelectYear(event): void {
    this.selectedYear = event;
    this.load();
  }


  loadMonths() {
    this._monthService.fetch().subscribe(month => {
      this.months = month;
    });
  }


  loadYears() {
    this._yearService.fetch().subscribe(year => {
      this.years = year;
    });
  }

  load() {
    this.loading = true;
    this._plannedDataUBRService.getById(this.selectedMonth, this.selectedYear).subscribe(plannedDataUBR => {
      this.loading = false;
      this.plannedDataUBR = plannedDataUBR;
    }, error => {
      this.loading = false;
      this._toast.error(error.error.message);
    })
  }

  add() {
    let dialogRef = this.dialog.open(AddPlannedDataUbrComponent, {
      width: "500px",
      data: { 
        title: "Добавить", 
        action: "add", 
        selectedYear: this.selectedYear-2019,
        selectedMonth: this.selectedMonth 
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  onSave() {
    this._plannedDataUBRService.update(this.plannedDataUBR.planned_sinking_ubr_id, this.plannedDataUBR).subscribe(
      () => {
        this._toast.success("Данные сохраненны.");
      },
      error => {
        this._toast.error(error.error.message);
      }
    )
  }

}