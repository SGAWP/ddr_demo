import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegimesService } from '../../../../../shared/services/regimes.service';
import { TypeCalibratorsService } from '../../../../../shared/services/type_calibrators.service';
import { TypeSpindlesService } from '../../../../../shared/services/type_spindles.service';
import { BitsComponent } from '../../../../../shared/components/dialogs/bits/bits.component';
import { TurbodrillsComponent } from '../../../../../shared/components/dialogs/turbodrills/turbodrills.component';
import { TypeCalibrator, TypeSpindle } from "../../../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-regime',
  templateUrl: './edit-regime.component.html',
  styleUrls: ['./edit-regime.component.scss']
})
export class EditRegimeComponent implements OnInit {

  form: FormGroup;

  typesCalibrator: TypeCalibrator[];
  typesSpindle: TypeSpindle[];

  constructor(
    public dialogRef: MatDialogRef<EditRegimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _regimesService: RegimesService,
    private _typeCalibratorsService: TypeCalibratorsService,
    private _typeSpindlesService: TypeSpindlesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadTypesCalibrator();
    this.loadTypesSpindle();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      console.log(this.data.data.duration)
      this.form = this.fb.group({
        slotting_n: new FormControl(this.data.data.slotting_n),
        duration: new FormControl(new Date('1970-01-01T'+this.data.data.duration), Validators.required),
        start_slotting: new FormControl(this.data.data.start_slotting),
        slotting_end: new FormControl(this.data.data.slotting_end),
        pump_pressure: new FormControl(this.data.data.pump_pressure),
        spr_bits_id: new FormControl(this.data.data.spr_bits_id, Validators.required),
        type: new FormControl({ value: this.data.data.type, disabled: true }, Validators.required),
        spr_turbodrills_id: new FormControl(this.data.data.spr_turbodrills_id, Validators.required),
        turbodrill_name: new FormControl({ value: this.data.data.turbodrill_name, disabled: true }, Validators.required),
        day_reports_id: new FormControl(this.data.data.day_reports_id, Validators.required),
        d1: new FormControl(this.data.data.d1),
        d2: new FormControl(this.data.data.d2),
        type_calibrators_id: new FormControl(this.data.data.type_calibrators_id, Validators.required),
        type_spindles_id: new FormControl(this.data.data.type_spindles_id, Validators.required),
        spindle: new FormControl(this.data.data.spindle),
        turbodrill_n: new FormControl(this.data.data.turbodrill_n),
        bit_number: new FormControl(this.data.data.bit_number),
        regime_id: new FormControl(this.data.data.regime_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        slotting_n: new FormControl(null),
        duration: new FormControl(null, Validators.required),
        start_slotting: new FormControl(null),
        slotting_end: new FormControl(null),
        pump_pressure: new FormControl(null),
        spr_bits_id: new FormControl(null, Validators.required),
        type: new FormControl({ value: "", disabled: true }, Validators.required),
        spr_turbodrills_id: new FormControl(null, Validators.required),
        turbodrill_name: new FormControl({ value: "", disabled: true }, Validators.required),
        day_reports_id: new FormControl(this.data.day_reports_id, Validators.required),
        d1: new FormControl(null),
        d2: new FormControl(null),
        type_calibrators_id: new FormControl(null, Validators.required),
        type_spindles_id: new FormControl(null, Validators.required),
        spindle: new FormControl(null),
        turbodrill_n: new FormControl(""),
        bit_number: new FormControl(null)
      })
    }
  }

  loadTypesCalibrator() {
    this._typeCalibratorsService.getSelect().subscribe(typeCalibrator => {
      this.typesCalibrator = typeCalibrator;
    });
  }


  loadTypesSpindle() {
    this._typeSpindlesService.getSelect().subscribe(typeSpindle => {
      this.typesSpindle = typeSpindle;
    });
  }

  openDialogBits() {
    let dialogRef = this.dialog.open(BitsComponent, {
      width: "500px",
      data: { title: "Долотья" }
    });
    dialogRef.afterClosed().subscribe(bits => {
      if (bits) {
        this.form.get("spr_bits_id").patchValue(bits.bit_id);
        this.form.get("type").patchValue(bits.type);
      }
    });
  }

  openDialogTurbodrills() {
    let dialogRef = this.dialog.open(TurbodrillsComponent, {
      width: "500px",
      data: { title: "Турбобуры" }
    });
    dialogRef.afterClosed().subscribe(turbodrills => {
      if (turbodrills) {
        this.form.get("spr_turbodrills_id").patchValue(turbodrills.turbodrill_id);
        this.form.get("turbodrill_name").patchValue(turbodrills.turbodrill_name);
      }
    });
  }

  onSave() {
    this._regimesService.update(this.form.value.regime_id, this.form.value).subscribe(
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

  getTurbodrillErrorMessage() {
    return this.form.controls.spr_turbodrills_id.hasError('required') ? 'Поле "Турбобур" не должно быть пустым.' : '';
  }

  getBitErrorMessage() {
    return this.form.controls.spr_bits_id.hasError('required') ? 'Поле "Долото" не должно быть пустым.' : '';
  }

  getDurationErrorMessage() {
    return this.form.controls.duration.hasError('required') ? 'Поле "Время" не должно быть пустым.' : '';
  }

  getTypeCalibratorErrorMessage() {
    return this.form.controls.type_calibrators_id.hasError('required') ? 'Выберите тип калибратора.' : '';
  }

  getTypeSpindleErrorMessage() {
    return this.form.controls.type_spindles_id.hasError('required') ? 'Выберите тип шпинделя.' : '';
  }

}
