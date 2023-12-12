import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprRequestsService } from '../../../../services/spr-requests.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-requests',
  templateUrl: './add-requests.component.html',
  styleUrls: ['./add-requests.component.scss']
})
export class AddRequestsComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddRequestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _requestsService: SprRequestsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        request_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._requestsService.create(this.form.value).subscribe(
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

  getRequestNameErrorMessage() {
    return this.form.controls.request_name.hasError('required') ? 'Поле "Заявка" не должно быть пустым.' : '';
  }

}
