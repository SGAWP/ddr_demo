import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { SvodService } from '../../shared/services/svod.service';
import { ToastrService } from "ngx-toastr";
import { PageTitleService } from "../../shared/services/page-title.service";
import { WellplatformsComponent } from '../../shared/components/dialogs/wellplatforms/wellplatforms.component';
import { MastersTeamsComponent } from '../../shared/components/dialogs/masters-teams/masters-teams.component';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-new-svod',
  templateUrl: './new-svod.component.html',
  styleUrls: ['./new-svod.component.scss']
})
export class NewSvodComponent implements OnInit {

  title = "Создать сводку";

  form: FormGroup;

  date = moment();

  constructor(
    private pageTitleService: PageTitleService,
    public dialog: MatDialog,
    private router: Router,
    private _toast: ToastrService,
    private _svodService: SvodService
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
    this.initializeForm()
  }

  initializeForm() {
    if (!localStorage.getItem('selectedDate')) {
      this.date = moment();
    } else {
      this.date = moment(localStorage.getItem('selectedDate'));
    }
    this.form = new FormGroup({
      report_date: new FormControl(this.date, Validators.required),
      masters_teams_id: new FormControl(null, Validators.required),
      team_name: new FormControl({ value: "", disabled: true }, Validators.required),
      master_name: new FormControl({ value: "", disabled: true }, Validators.required),
      assistant_master: new FormControl({ value: "", disabled: true }),
      second_assistant_master: new FormControl({ value: "", disabled: true }),
      spr_wellplatforms_id: new FormControl(null, [Validators.required]),
      wellplatform_name: new FormControl({ value: "", disabled: true }, Validators.required),
      oilfield_short_name: new FormControl({ value: "", disabled: true }, Validators.required),
      well: new FormControl("", Validators.required),
      vAbsorbing: new FormControl(null, Validators.required),
      rest_oil: new FormControl(null, Validators.required),
      urgent_need: new FormControl(""),
      msgrp: new FormControl(false),
      sinking_day: new FormControl(null, Validators.required),
      sinking_month: new FormControl({ value: 0, disabled: true }),
      sinking_year: new FormControl({ value: 0, disabled: true }),
      drill_start_deviation: new FormControl(null, Validators.required),
      percent_liquid: new FormControl("", Validators.required)
    })
  }

  openDialogWellplatforms() {
    let dialogRef = this.dialog.open(WellplatformsComponent, {
      width: "500px",
      data: { title: "Кусты" }
    });
    dialogRef.afterClosed().subscribe(wellplatforms => {
      if (wellplatforms) {
        this.form.get("spr_wellplatforms_id").patchValue(wellplatforms.wellplatform_id);
        this.form.get("wellplatform_name").patchValue(wellplatforms.wellplatform_name);
        this.form.get("oilfield_short_name").patchValue(wellplatforms.oilfield_short_name);
      }
    });
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
        this.form.get("assistant_master").patchValue(mt.assistant_master);
        this.form.get("second_assistant_master").patchValue(mt.second_assistant_master);
      }
    });
  }

  onSave() {
    this._svodService.create(this.form.value).subscribe(
      res => {
        this._toast.success("Данные сохранены.");
        this.router.navigate([`/svod/${res.hour_id}`]);
      },
      error => {
        this._toast.error(error.error.message);
      }
    )
  }

  getWellErrorMessage() {
    return this.form.controls.well.hasError('required') ? 'Поле "Скважина" не должено быть пустым.' : '';
  }

  getVAbsorbingErrorMessage() {
    return this.form.controls.vAbsorbing.hasError('required') ? 'Поле "V поглощения" не должено быть пустым.' : '';
  }

  getDrillStartDeviationErrorMessage() {
    return this.form.controls.drill_start_deviation.hasError('required') ? 'Поле "Отклонение" не должено быть пустым.' : '';
  }

  getRestOilErrorMessage() {
    return this.form.controls.rest_oil.hasError('required') ? 'Поле "Остаток нефти" не должено быть пустым.' : '';
  }

  getRestSolutionErrorMessage() {
    return this.form.controls.percent_liquid.hasError('required') ? 'Поле "Процент жидкости" не должено быть пустым.' : '';
  }

  getSinkingDayErrorMessage() {
    return this.form.controls.sinking_day.hasError('required') ? 'Поле "Проходка за день" не должено быть пустым.' : '';
  }
}
