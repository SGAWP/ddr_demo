import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprBitsService } from '../../../../services/spr-bits.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-bit',
  templateUrl: './add-bit.component.html',
  styleUrls: ['./add-bit.component.scss']
})
export class AddBitComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _bitsService: SprBitsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        type: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._bitsService.create(this.form.value).subscribe(
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
