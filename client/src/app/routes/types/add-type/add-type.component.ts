import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprTypesService } from '../../../shared/services/spr-types.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

  form: FormGroup;

  constructor(  
    public dialogRef: MatDialogRef<AddTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _typeService: SprTypesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        type: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._typeService.create(this.form.value).subscribe(
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