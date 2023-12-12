import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SprOperationsService } from '../../../shared/services/spr-operations.service';
import { Operation } from "../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent implements OnInit {

  form: FormGroup;
  uniqueOperations: Operation[];

  constructor(
    public dialogRef: MatDialogRef<AddOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast: ToastrService,
    private _sprOperationsService: SprOperationsService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.load();
  }

  load() {
    this._sprOperationsService.unique().subscribe(
      operations => {
        this.uniqueOperations = operations
      }
    )
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        operation_full_name: new FormControl("", Validators.required),
        operation_short_name: new FormControl(""),
        parentOperation_id: new FormControl(this.data.data.operation_id),
        group_name: new FormControl("")
      });
    }
    this.form.get('operation_full_name').valueChanges.subscribe(operation_full_name => this.form.get('operation_short_name').setValue(operation_full_name))
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
