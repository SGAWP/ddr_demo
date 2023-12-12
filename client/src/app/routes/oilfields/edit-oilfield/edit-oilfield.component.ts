import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SprOilfieldsService } from '../../../shared/services/spr-oilfields.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-oilfield',
  templateUrl: './edit-oilfield.component.html',
  styleUrls: ['./edit-oilfield.component.scss']
})
export class EditOilfieldComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditOilfieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _oilfieldsService: SprOilfieldsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        oilfield_short_name: new FormControl(this.data.data.oilfield_short_name, Validators.required),
        oilfield_full_name: new FormControl(this.data.data.oilfield_full_name, Validators.required),
        is_active: new FormControl(this.data.data.is_active),
        oilfield_id: new FormControl(this.data.data.oilfield_id)
      })
    } else {
      this.form = new FormGroup({
        oilfield_short_name: new FormControl("", Validators.required),
        oilfield_full_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
    this.form.get('oilfield_full_name').valueChanges.subscribe(oilfield_full_name => this.form.get('oilfield_short_name').setValue(oilfield_full_name))
  }

  onSave() {
    this._oilfieldsService.update(this.form.value.oilfield_id, this.form.value).subscribe(
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
