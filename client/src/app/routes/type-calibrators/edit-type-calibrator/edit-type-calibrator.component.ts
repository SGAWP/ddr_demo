import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TypeCalibratorsService } from '../../../shared/services/type_calibrators.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-type-calibrator',
  templateUrl: './edit-type-calibrator.component.html',
  styleUrls: ['./edit-type-calibrator.component.scss']
})
export class EditTypeCalibratorComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTypeCalibratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _typeCalibratorService: TypeCalibratorsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        type_calibrator: new FormControl(this.data.data.type_calibrator, Validators.required),
        type_calibrator_id: new FormControl(this.data.data.type_calibrator_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        type_calibrator: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._typeCalibratorService.update(this.form.value.type_calibrator_id, this.form.value).subscribe(
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

  getTypeCalibratorErrorMessage() {
    return this.form.controls.type_calibrator.hasError('required') ? 'Поле "Тип калибратора" не должно быть пустым.' : '';
  }

}
