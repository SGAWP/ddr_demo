import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SprTypesService } from '../../../shared/services/spr-types.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _typeService: SprTypesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        type: new FormControl(this.data.data.type, Validators.required),
        is_active: new FormControl(this.data.data.is_active, Validators.required),
        type_id: new FormControl(this.data.data.type_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        type: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._typeService.update(this.form.value.type_id, this.form.value).subscribe(
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

  getTypeErrorMessage() {
    return this.form.controls.type.hasError('required') ? 'Поле "Тип" не должно быть пустым.' : '';
  }

}
