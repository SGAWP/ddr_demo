import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SprTurbodrillsService } from '../../../shared/services/spr-turbodrills.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-turbodrill',
  templateUrl: './edit-turbodrill.component.html',
  styleUrls: ['./edit-turbodrill.component.scss']
})
export class EditTurbodrillComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTurbodrillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _turbodrillsService: SprTurbodrillsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        turbodrill_name: new FormControl(this.data.data.turbodrill_name, Validators.required),
        turbodrill_id: new FormControl(this.data.data.turbodrill_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        turbodrill_name: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._turbodrillsService.update(this.form.value.turbodrill_id, this.form.value).subscribe(
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

  getTurbodrillErrorMessage() {
    return this.form.controls.turbodrill_name.hasError('required') ? 'Поле "Турбобур" не должно быть пустым.' : '';
  }

}
