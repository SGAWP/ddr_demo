import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DayReport } from "../../../shared/interfaces";
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { SvodService } from "../../../shared/services/svod.service";
import { PageTitleService } from "../../../shared/services/page-title.service";
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { CloseComponent } from '../../../shared/components/close/close.component';
import { SinkingYearComponent } from './sinking-year/sinking-year.component';
import { SinkingMonthComponent } from './sinking-month/sinking-month.component';
import { WellplatformsComponent } from '../../../shared/components/dialogs/wellplatforms/wellplatforms.component';
import { MastersTeamsComponent } from '../../../shared/components/dialogs/masters-teams/masters-teams.component';

@Component({
  selector: 'app-svod-form',
  templateUrl: './svod-form.component.html',
  styleUrls: ['./svod-form.component.scss'],
})
export class SvodFormComponent implements OnInit {

  title = "Суточная сводка";

  dayReport: DayReport;
  form: FormGroup;
  loading: boolean = false;
  data: string;

  @ViewChild(SinkingYearComponent, undefined) sinkingYear: SinkingYearComponent;
  @ViewChild(SinkingMonthComponent, undefined) sinkingMonth: SinkingMonthComponent;

  constructor(
    private pageTitleService: PageTitleService,
    private _svodService: SvodService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
    this.load();
    this.form = new FormGroup({
      report_date: new FormControl(new Date(), Validators.required),
      masters_teams_id: new FormControl(null, Validators.required),
      team_name: new FormControl({ value: "", disabled: true }, Validators.required),
      master_name: new FormControl({ value: "", disabled: true }, Validators.required),
      assistant_master: new FormControl({ value: "", disabled: true }, Validators.required),
      second_assistant_master: new FormControl({ value: "", disabled: true }, Validators.required),
      spr_wellplatforms_id: new FormControl(null, Validators.required),
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

  load() {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              return this._svodService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (dayReport: DayReport) => {
          this.dayReport = dayReport;
          this.form.patchValue({
            report_date: this.dayReport.report_date,
            masters_teams_id: this.dayReport.masters_teams_id,
            team_name: this.dayReport.masters_team.team.team_name,
            master_name: this.dayReport.masters_team.master.master_name,
            assistant_master: this.dayReport.masters_team.master.assistant_master,
            second_assistant_master: this.dayReport.masters_team.master.second_assistant_master,
            spr_wellplatforms_id: this.dayReport.spr_wellplatforms_id,
            wellplatform_name: this.dayReport.spr_wellplatform.wellplatform_name,
            oilfield_short_name: this.dayReport.spr_wellplatform.spr_oilfield.oilfield_short_name,
            well: this.dayReport.well,
            vAbsorbing: this.dayReport.vAbsorbing,
            rest_oil: this.dayReport.rest_oil,
            urgent_need: this.dayReport.urgent_need,
            sinking_day: this.dayReport.sinking_day,
            percent_liquid: this.dayReport.percent_liquid,
            msgrp: this.dayReport.msgrp,
            drill_start_deviation: this.dayReport.drill_start_deviation
          })
          this.loading = false;
        },
        error => {
          this._toast.error(error.error.message);
          this.loading = false;
        }
      )
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
      }
    });
  }

  onSave() {
    this.loading = true;
    this._svodService.update(this.dayReport.hour_id, this.form.value).subscribe(
      () => {
        this._toast.success("Данные сохранены.");
        this.load();
        this.sinkingYear.load();
        this.sinkingMonth.load();
        this.loading = false;
      },
      error => {
        this._toast.error(error.error.message);
        this.load();
        this.sinkingYear.load();
        this.sinkingMonth.load();
        this.loading = false;
      }
    )
  }

  delete(dayReport: DayReport) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Подтвердите удаление",
        message: `Вы уверены что хотите удалить сводку?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._svodService.delete(dayReport.hour_id).subscribe(
          response => this._toast.success(response.message),
          error => {
            this._toast.error(error.error.message);
          },
          () => {
            this.router.navigate(["/svod"]);
          }
        );
      }
    });
  }

  back() {
    if (!!this.form && this.form.dirty) {
      let dialogRef = this.dialog.open(CloseComponent, {
        data: {
          title: "Сохранить изменения перед закрытием?",
          message: `Изменения будут утеряны, если их не сохранить.`
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.onSave();
          this.router.navigate(["/svod"]);
        }
      })
    } else {
      this.router.navigate(["/svod"]);
    }
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



