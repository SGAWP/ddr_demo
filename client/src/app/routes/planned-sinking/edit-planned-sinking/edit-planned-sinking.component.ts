import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PlannedSinkingService } from '../../../shared/services/planned-sinkings.service';
import { MonthService } from '../../../shared/services/months.service';
import { YearService } from '../../../shared/services/years.service';
import { PlannedSinking, Month, Year } from "../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";
import { MastersTeamsComponent } from '../../../shared/components/dialogs/masters-teams/masters-teams.component';

@Component({
  selector: 'app-edit-planned-sinking',
  templateUrl: './edit-planned-sinking.component.html',
  styleUrls: ['./edit-planned-sinking.component.scss']
})
export class EditPlannedSinkingComponent implements OnInit {

  user: PlannedSinking;
  months: Month[];
  years: Year[];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPlannedSinkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
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
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        sinking_month: new FormControl(this.data.data.sinking_month, [Validators.required]),
        masters_teams_id: new FormControl(this.data.data.masters_teams_id, [Validators.required]),
        team_name: new FormControl({ value: this.data.data.team_name, disabled: true }, Validators.required),
        master_name: new FormControl({ value: this.data.data.master_name, disabled: true }, Validators.required),
        planned_sinking_id: new FormControl(this.data.data.planned_sinking_id)
      })
    } else {
      this.form = new FormGroup({
        sinking_month: new FormControl(null, Validators.required),
        masters_teams_id: new FormControl(null, Validators.required),
        team_name: new FormControl({ value: "", disabled: true }, Validators.required),
        master_name: new FormControl({ value: "", disabled: true }, Validators.required)
      })
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
    this._plannedSinkingService.update(this.form.value.planned_sinking_id, this.form.value).subscribe(
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
