import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PlannedDataUBRService } from '../../../shared/services/planned-data-ubr.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-planned-data-ubr',
  templateUrl: './add-planned-data-ubr.component.html',
  styleUrls: ['./add-planned-data-ubr.component.scss']
})
export class AddPlannedDataUbrComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPlannedDataUbrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast: ToastrService,
    private _plannedDataUBRService: PlannedDataUBRService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        months_id: new FormControl(this.data.selectedMonth, Validators.required),
        years_id: new FormControl(this.data.selectedYear, Validators.required),
        sinking_month: new FormControl(0, Validators.required)
      });
    }
  }

  onSave() {
    this._plannedDataUBRService.create(this.form.value)
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

  getSinkingMonthErrorMessage() {
    return this.form.controls.sinking_month.hasError('required') ? 'Поле "Проходка за месяц" не должно быть пустым.' : '';
  }
}
