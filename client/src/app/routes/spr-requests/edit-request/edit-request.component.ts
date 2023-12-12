import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SprRequestsService } from '../../../shared/services/spr-requests.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})
export class EditRequestComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _requestsService: SprRequestsService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        request_name: new FormControl(this.data.data.request_name, Validators.required),
        is_active: new FormControl(this.data.data.is_active),
        request_id: new FormControl(this.data.data.request_id)
      })
    } else {
      this.form = new FormGroup({
        request_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._requestsService.update(this.form.value.request_id, this.form.value).subscribe(
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
