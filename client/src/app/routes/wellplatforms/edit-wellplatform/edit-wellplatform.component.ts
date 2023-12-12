import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SprWellplatformsService } from '../../../shared/services/spr-wellplatforms.service';
import { ToastrService } from "ngx-toastr";
import { OilfieldsComponent } from '../../../shared/components/dialogs/oilfields/oilfields.component';

@Component({
  selector: 'app-edit-wellplatform',
  templateUrl: './edit-wellplatform.component.html',
  styleUrls: ['./edit-wellplatform.component.scss']
})
export class EditWellplatformComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditWellplatformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _wellplatformsService: SprWellplatformsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        wellplatform_name: new FormControl(this.data.data.wellplatform_name, Validators.required),
        is_active: new FormControl(this.data.data.is_active),
        spr_oilfields_id: new FormControl(this.data.data.spr_oilfields_id, Validators.required),
        oilfield_short_name: new FormControl({ value: this.data.data.oilfield_short_name, disabled: true }, Validators.required),
        wellplatform_id: new FormControl(this.data.data.wellplatform_id)
      })
    } else {
      this.form = new FormGroup({
        wellplatform_name: new FormControl("", Validators.required),
        spr_oilfields_id: new FormControl(null, Validators.required),
        oilfield_short_name: new FormControl({ value: "", disabled: true }, Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  openDialogOilfields() {
    let dialogRef = this.dialog.open(OilfieldsComponent, {
      width: "500px",
      data: { title: "Месторождения" }
    });
    dialogRef.afterClosed().subscribe(oilfields => {
      if (oilfields) {
        this.form.get("spr_oilfields_id").patchValue(oilfields.oilfield_id);
        this.form.get("oilfield_short_name").patchValue(oilfields.oilfield_short_name);
      }
    });
  }

  onSave() {
    this._wellplatformsService.update(this.form.value.wellplatform_id, this.form.value).subscribe(
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

  getWellplatformNameErrorMessage() {
    return this.form.controls.wellplatform_name.hasError('required') ? 'Поле "Куст" не должно быть пустым.' : '';
  }

  getOilfieldErrorMessage() {
    return this.form.controls.spr_oilfields_id.hasError('required') ? 'Поле "Месторождение" не должно быть пустым.' : '';
  }


}
