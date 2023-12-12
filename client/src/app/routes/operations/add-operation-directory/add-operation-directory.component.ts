import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SprOperationsService } from '../../../shared/services/spr-operations.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-operation-directory',
  templateUrl: './add-operation-directory.component.html',
  styleUrls: ['./add-operation-directory.component.scss']
})
export class AddOperationDirectoryComponent implements  OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOperationDirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast: ToastrService,
    private _sprOperationsService: SprOperationsService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        operation_full_name: new FormControl("", Validators.required),
        operation_short_name: new FormControl(""),
        parentOperation_id: new FormControl(null)
      });
    }
  }

  onSave() {
    this._sprOperationsService.create(this.form.value)
      .subscribe(
        () => {
          this.dialogRef.close(true);
          this._toast.success("Данные сохранены.");
        },
        error => {
          this.dialogRef.close(true);
          this._toast.error(error.error.message);
        }
      );
  }

  getOperationErrorMessage() {
    return this.form.controls.operation_full_name.hasError('required') ? 'Поле "Полное наименование операции" не должно быть пустым.' : '';
  }
}
