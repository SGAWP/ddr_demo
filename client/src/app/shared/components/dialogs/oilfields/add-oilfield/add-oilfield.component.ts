import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprOilfieldsService } from '../../../../services/spr-oilfields.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-oilfield',
  templateUrl: './add-oilfield.component.html',
  styleUrls: ['./add-oilfield.component.scss']
})
export class AddOilfieldComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOilfieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _oilfieldsService: SprOilfieldsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        oilfield_short_name: new FormControl("", Validators.required),
        oilfield_full_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
    this.form.get('oilfield_full_name').valueChanges.subscribe(oilfield_full_name => this.form.get('oilfield_short_name').setValue(oilfield_full_name))
  }

  onSave() {
    this._oilfieldsService.create(this.form.value).subscribe(
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

  getShortNameErrorMessage() {
    return this.form.controls.oilfield_short_name.hasError('required') ? 'Поле "Сокращенное наименование месторождения" не должно быть пустым.' : '';
  }

  getFullNameErrorMessage() {
    return this.form.controls.oilfield_full_name.hasError('required') ? 'Поле "Полное наименование месторождения" не должно быть пустым.' : '';
  }

}
