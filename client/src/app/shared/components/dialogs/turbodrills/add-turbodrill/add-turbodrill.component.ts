import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprTurbodrillsService } from '../../../../services/spr-turbodrills.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-turbodrill',
  templateUrl: './add-turbodrill.component.html',
  styleUrls: ['./add-turbodrill.component.scss']
})
export class AddTurbodrillComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTurbodrillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _turbodrillsService: SprTurbodrillsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        turbodrill_name: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._turbodrillsService.create(this.form.value).subscribe(
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
