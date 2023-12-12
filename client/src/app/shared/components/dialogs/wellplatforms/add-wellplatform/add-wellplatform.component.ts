import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprWellplatformsService } from '../../../../services/spr-wellplatforms.service';
import { ToastrService } from "ngx-toastr";
import { OilfieldsComponent } from '../../oilfields/oilfields.component';

@Component({
  selector: 'app-add-wellplatform',
  templateUrl: './add-wellplatform.component.html',
  styleUrls: ['./add-wellplatform.component.scss']
})
export class AddWellplatformComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddWellplatformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _wellplatformsService: SprWellplatformsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
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
    this._wellplatformsService.create(this.form.value).subscribe(
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
