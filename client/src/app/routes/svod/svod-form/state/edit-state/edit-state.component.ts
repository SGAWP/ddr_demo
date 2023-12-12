import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StateService } from '../../../../../shared/services/state.service';
import { TimeBalanceComponent } from '../../../../../shared/components/dialogs/time-balance/time-balance.component';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.scss']
})
export class EditStateComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _stateService: StateService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        bottom: new FormControl(this.data.data.bottom, Validators.required),
        density: new FormControl(this.data.data.density, Validators.required),
        visconsity: new FormControl(this.data.data.visconsity, Validators.required),
        water_separation: new FormControl(this.data.data.water_separation, Validators.required),
        time_balances_id: new FormControl(this.data.data.time_balances_id, Validators.required),
        operation_short_name: new FormControl({ value: this.data.data.operation_short_name, disabled: true }, Validators.required),
        day_reports_id: new FormControl(this.data.data.day_reports_id, Validators.required),
        state_id: new FormControl(this.data.data.state_id, Validators.required)
      })
    } else {
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

  openDialogTimeBalance() {
    let dialogRef = this.dialog.open(TimeBalanceComponent, {
      width: "500px",
      data: { title: "Баланс времени", day_reports_id: this.data.data.day_reports_id }
    });
    dialogRef.afterClosed().subscribe(time_balances => {
      if (time_balances) {
        this.form.get("time_balances_id").patchValue(time_balances.time_balance_id);
        this.form.get("operation_short_name").patchValue(time_balances.operation_short_name);
      }
    });
  }

  onSave() {
    this._stateService.update(this.form.value.state_id, this.form.value).subscribe(
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
