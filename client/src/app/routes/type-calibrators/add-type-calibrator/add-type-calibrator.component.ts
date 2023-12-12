import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeCalibratorsService } from '../../../shared/services/type_calibrators.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-type-calibrator',
  templateUrl: './add-type-calibrator.component.html',
  styleUrls: ['./add-type-calibrator.component.scss']
})
export class AddTypeCalibratorComponent implements OnInit {

  form: FormGroup;

  constructor(  
    public dialogRef: MatDialogRef<AddTypeCalibratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _typeCalibratorService: TypeCalibratorsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        type_calibrator: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._typeCalibratorService.create(this.form.value).subscribe(
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