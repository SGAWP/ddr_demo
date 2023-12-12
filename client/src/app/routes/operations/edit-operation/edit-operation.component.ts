import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Operation } from "../../../shared/interfaces";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SprOperationsService } from '../../../shared/services/spr-operations.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.scss']
})
export class EditOperationComponent implements OnInit {

  form: FormGroup;
  uniqueOperations: Operation[];

  constructor(
    public dialogRef: MatDialogRef<EditOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _operationsService: SprOperationsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.load();
  }

  load() {
    this._operationsService.unique().subscribe(
      operations => {
        this.uniqueOperations = operations
      }
    )
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        operation_short_name: new FormControl(this.data.data.operation_short_name),
        operation_full_name: new FormControl(this.data.data.operation_full_name, [Validators.required]),
        operation_id: new FormControl(this.data.data.operation_id),
        group_name: new FormControl(this.data.data.group_name)
      })
    } else {
      this.form = new FormGroup({
        operation_short_name: new FormControl(""),
        operation_full_name: new FormControl("", [Validators.required]),
        group_name: new FormControl("")
      })
    }
    this.form.get('operation_full_name').valueChanges.subscribe(operation_full_name => this.form.get('operation_short_name').setValue(operation_full_name))
  }

  onSave() {
    this._operationsService.update(this.form.value.operation_id, this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
        this._toast.success("Данные сохраненны.");
      },
      error => {
        this.dialogRef.close(true);
        this._toast.error(error.error.message);
      }
    )
  }

  getOperationErrorMessage() {
    return this.form.controls.operation_full_name.hasError('required') ? 'Поле "Полное наименование операции" не должно быть пустым.' : '';
  }

}
