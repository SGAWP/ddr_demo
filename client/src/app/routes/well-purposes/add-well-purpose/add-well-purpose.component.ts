import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprWellPurposesService } from '../../../shared/services/spr-well-purposes.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-well-purpose',
  templateUrl: './add-well-purpose.component.html',
  styleUrls: ['./add-well-purpose.component.scss']
})
export class AddWellPurposeComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddWellPurposeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _wellPurposesService: SprWellPurposesService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        full_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._wellPurposesService.create(this.form.value).subscribe(
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

