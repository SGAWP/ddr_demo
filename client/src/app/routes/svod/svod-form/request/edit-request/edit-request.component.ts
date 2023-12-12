import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RequestService } from '../../../../../shared/services/request.service';
import { RequestsComponent } from '../../../../../shared/components/dialogs/requests/requests.component';
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
    public dialog: MatDialog,
    private _requestService: RequestService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        date_request: new FormControl(this.data.data.date_request, Validators.required),
        spr_requests_id: new FormControl(this.data.data.spr_requests_id, Validators.required),
        request_name: new FormControl({ value: this.data.data.request_name, disabled: true }, Validators.required),
        day_reports_id: new FormControl(this.data.data.day_reports_id, Validators.required),
        request_id: new FormControl(this.data.data.request_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        date_request: new FormControl(new Date(), Validators.required),
        spr_requests_id: new FormControl(null, Validators.required),
        request_name: new FormControl({ value: "", disabled: true }, Validators.required),
        day_reports_id: new FormControl(this.data.day_reports_id, Validators.required)
      })
    }
  }

  openDialogRequest() {
    let dialogRef = this.dialog.open(RequestsComponent, {
      width: "500px",
      data: { title: "Заявка", day_reports_id: this.data.day_reports_id }
    });
    dialogRef.afterClosed().subscribe(requests => {
      if (requests) {
        this.form.get("spr_requests_id").patchValue(requests.request_id);
        this.form.get("request_name").patchValue(requests.request_name);
      }
    });
  }

  onSave() {
    this._requestService.update(this.form.value.request_id, this.form.value).subscribe(
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

  getRequestDateErrorMessage() {
    return this.form.controls.date_request.hasError('required') ? 'Поле "Дата заявки" не должено быть пустым.' : '';
  }

  getRequestErrorMessage() {
    return this.form.controls.spr_requests_id.hasError('required') ? 'Поле "Заявка" не должено быть пустым.' : '';
  }

}
