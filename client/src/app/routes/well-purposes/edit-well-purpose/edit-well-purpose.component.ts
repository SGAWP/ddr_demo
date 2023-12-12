import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SprWellPurposesService } from '../../../shared/services/spr-well-purposes.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-well-purpose',
  templateUrl: './edit-well-purpose.component.html',
  styleUrls: ['./edit-well-purpose.component.scss']
})
export class EditWellPurposeComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditWellPurposeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _wellPurposesService: SprWellPurposesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        full_name: new FormControl(this.data.data.full_name, Validators.required),
        is_active: new FormControl(this.data.data.is_active),
        well_purpose_id: new FormControl(this.data.data.well_purpose_id)
      })
    } else {
      this.form = new FormGroup({
        full_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._wellPurposesService.update(this.form.value.well_purpose_id, this.form.value).subscribe(
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

  getFullNameErrorMessage() {
    return this.form.controls.full_name.hasError('required') ? 'Поле "Назначение" не должно быть пустым.' : '';
  }

}
