import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeSpindlesService } from '../../../shared/services/type_spindles.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-type-spindle',
  templateUrl: './add-type-spindle.component.html',
  styleUrls: ['./add-type-spindle.component.scss']
})
export class AddTypeSpindleComponent implements OnInit {

  form: FormGroup;

  constructor(  
    public dialogRef: MatDialogRef<AddTypeSpindleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _typeSpindleService: TypeSpindlesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        type_spindle: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._typeSpindleService.create(this.form.value).subscribe(
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