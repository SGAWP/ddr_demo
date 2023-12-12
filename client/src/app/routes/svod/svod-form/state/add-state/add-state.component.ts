import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../../../shared/services/state.service';
import { StateTime } from '../../../../../shared/interfaces';
import { TimeBalanceComponent } from '../../../../../shared/components/dialogs/time-balance/time-balance.component';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.scss']
})
export class AddStateComponent implements OnInit {

  form: FormGroup;
  state_times: StateTime[];

  constructor(
    public dialogRef: MatDialogRef<AddStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _stateService: StateService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.load();
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        bottom: new FormControl(null, Validators.required),
        density: new FormControl(null, Validators.required),
        visconsity: new FormControl(null, Validators.required),
        water_separation: new FormControl(null, Validators.required),
        time_balances_id: new FormControl(null, Validators.required),
        operation_short_name: new FormControl({ value: "", disabled: true }, Validators.required),
        state_times_id: new FormControl(null, Validators.required),
        day_reports_id: new FormControl(this.data.day_reports_id, Validators.required)
      })
    }
  }

  load() {
    this._stateService.getStateTime().subscribe(state_times => {
      this.state_times = state_times;
    });
  }

  openDialogTimeBalance() {
    let dialogRef = this.dialog.open(TimeBalanceComponent, {
      width: "500px",
      data: { title: "Баланс времени", day_reports_id: this.data.day_reports_id }
    });
    dialogRef.afterClosed().subscribe(time_balances => {
      if (time_balances) {
        this.form.get("time_balances_id").patchValue(time_balances.time_balance_id);
        this.form.get("operation_short_name").patchValue(time_balances.operation_short_name);
      }
    });
  }

  onSave() {
    this._stateService.create(this.form.value).subscribe(
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

  getBottomErrorMessage() {
    return this.form.controls.bottom.hasError('required') ? 'Поле "Глубина забоя" не должно быть пустым.' : '';
  }

  getDensityErrorMessage() {
    return this.form.controls.density.hasError('required') ? 'Поле "Плотность" не должно быть пустым.' : '';
  }

  getVisconsityErrorMessage() {
    return this.form.controls.visconsity.hasError('required') ? 'Поле "Вязкость" не должно быть пустым.' : '';
  }

  getWaterSeparationErrorMessage() {
    return this.form.controls.water_separation.hasError('required') ? 'Поле "Водоотдача" не должно быть пустым.' : '';
  }

  getOperationErrorMessage() {
    return this.form.controls.time_balances_id.hasError('required') ? 'Поле "Баланс времени" не должно быть пустым.' : '';
  }
}
