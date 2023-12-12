import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SprDrillrigsService } from '../../../shared/services/spr-drillrigs.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-drillrig',
  templateUrl: './edit-drillrig.component.html',
  styleUrls: ['./edit-drillrig.component.scss']
})
export class EditDrillrigComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDrillrigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _drillrigsService: SprDrillrigsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        drillrig_name: new FormControl(this.data.data.drillrig_name, Validators.required),
        is_active: new FormControl(this.data.data.is_active),
        drillrig_id: new FormControl(this.data.data.drillrig_id)
      })
    } else {
      this.form = new FormGroup({
        drillrig_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._drillrigsService.update(this.form.value.drillrig_id, this.form.value).subscribe(
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
