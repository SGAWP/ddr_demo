import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprDrillrigsService } from '../../../shared/services/spr-drillrigs.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-drillrig',
  templateUrl: './add-drillrig.component.html',
  styleUrls: ['./add-drillrig.component.scss']
})
export class AddDrillrigComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDrillrigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _drillrigsService: SprDrillrigsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        drillrig_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._drillrigsService.create(this.form.value).subscribe(
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

  getDrillrigNameErrorMessage() {
    return this.form.controls.drillrig_name.hasError('required') ? 'Поле "Буровая установока" не должно быть пустым.' : '';
  }

}
