import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SprBitsService } from '../../../shared/services/spr-bits.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-bit',
  templateUrl: './edit-bit.component.html',
  styleUrls: ['./edit-bit.component.scss']
})
export class EditBitComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditBitComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private _bitsService: SprBitsService,
    private _toast: ToastrService
  ) { }


  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        type: new FormControl(this.data.data.type, Validators.required),
        bit_id: new FormControl(this.data.data.bit_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        type: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._bitsService.update(this.form.value.bit_id, this.form.value).subscribe(
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

  getBitErrorMessage() {
    return this.form.controls.type.hasError('required') ? 'Поле "Тип долота" не должно быть пустым.' : '';
  }

}
