import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PlannedSinkingService } from '../../../shared/services/planned-sinkings.service';
import { MonthService } from '../../../shared/services/months.service';
import { YearService } from '../../../shared/services/years.service';
import { PlannedSinking, Month, Year } from "../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";
import { MastersTeamsComponent } from '../../../shared/components/dialogs/masters-teams/masters-teams.component';

@Component({
  selector: 'app-add-planned-sinking',
  templateUrl: './add-planned-sinking.component.html',
  styleUrls: ['./add-planned-sinking.component.scss']
})
export class AddPlannedSinkingComponent implements OnInit {

  user: PlannedSinking;
  months: Month[];
  years: Year[];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPlannedSinkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _toast: ToastrService,
    private _plannedSinkingService: PlannedSinkingService,
    private _monthService: MonthService,
    private _yearService: YearService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadMonth();
    this.loadYear();
  }

  loadMonth() {
    this._monthService.fetch().subscribe(month => {
      this.months = month;
    });
  }

  loadYear() {
    this._yearService.fetch().subscribe(year => {
      this.years = year;
    });
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        sinking_month: new FormControl(null, Validators.required),
        months_id: new FormControl(this.data.months_id, Validators.required),
        years_id: new FormControl(this.data.years_id, Validators.required),
        masters_teams_id: new FormControl(null, Validators.required),
        team_name: new FormControl({ value: "", disabled: true }, Validators.required),
        master_name: new FormControl({ value: "", disabled: true }, Validators.required)
      });
    }
  }

  openDialogMT() {
    let dialogRef = this.dialog.open(MastersTeamsComponent, {
      width: "700px",
      data: { title: "Бригады и Мастера" }
    });
    dialogRef.afterClosed().subscribe(mt => {
      if (mt) {
        this.form.get("masters_teams_id").patchValue(mt.master_team_id);
        this.form.get("team_name").patchValue(mt.team_name);
        this.form.get("master_name").patchValue(mt.master_name);
      }
    });
  }

  onSave() {
    this._plannedSinkingService.create(this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
        this._toast.success("Данные сохранены.");
      },
      error => {
        this.dialogRef.close(true);
        this._toast.error(error.error.message);
      }
    )
  }

  getSinkingMonthErrorMessage() {
    return this.form.controls.sinking_month.hasError('required') ? 'Поле "Проходка за месяц" не должно быть пустым' : '';
  }

}
