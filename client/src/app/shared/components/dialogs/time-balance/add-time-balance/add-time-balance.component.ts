import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeBalanceService } from '../../../../services/time-balance.service';
import { ToastrService } from "ngx-toastr";
import { OperationsComponent } from '../../operations/operations.component';

@Component({
  selector: 'app-add-time-balance',
  templateUrl: './add-time-balance.component.html',
  styleUrls: ['./add-time-balance.component.scss']
})
export class AddTimeBalanceComponent implements OnInit {

  form: FormGroup;

  constructor(  
    public dialogRef: MatDialogRef<AddTimeBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _timeBalanceService: TimeBalanceService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        duration: new FormControl('', Validators.required),
        spr_operations_id: new FormControl(null, Validators.required),
        operation_short_name: new FormControl({ value: "", disabled: true }, Validators.required),
        day_reports_id: new FormControl(this.data.day_reports_id, Validators.required)
      })
    }
  }

  openDialogOperations() {
    let dialogRef = this.dialog.open(OperationsComponent, {
      width: "500px",
      data: { title: "Операции" }
    });
    dialogRef.afterClosed().subscribe(operations => {
      if (operations) {
        this.form.get("spr_operations_id").patchValue(operations.operation_id);
        this.form.get("operation_short_name").patchValue(operations.operation_short_name);
      }
    });
  }

  onSave() {
    this._timeBalanceService.create(this.form.value).subscribe(
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

  getDurationErrorMessage() {
    return this.form.controls.duration.hasError('required') ? 'Поле "Длительность" не должно быть пустым.' : '';
  }

  getOperationErrorMessage() {
    return this.form.controls.spr_operations_id.hasError('required') ? 'Поле "Содержание" не должно быть пустым.' : '';
  }

}
