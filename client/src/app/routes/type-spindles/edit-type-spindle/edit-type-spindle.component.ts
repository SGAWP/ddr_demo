import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TypeSpindlesService } from '../../../shared/services/type_spindles.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-type-spindle',
  templateUrl: './edit-type-spindle.component.html',
  styleUrls: ['./edit-type-spindle.component.scss']
})
export class EditTypeSpindleComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTypeSpindleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _typeSpindleService: TypeSpindlesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        type_spindle: new FormControl(this.data.data.type_spindle, Validators.required),
        type_spindle_id: new FormControl(this.data.data.type_spindle_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        type_spindle: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._typeSpindleService.update(this.form.value.type_spindle_id, this.form.value).subscribe(
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

  getTypeSpindleErrorMessage() {
    return this.form.controls.type_spindle.hasError('required') ? 'Поле "Тип шпинделя" не должно быть пустым.' : '';
  }

}
