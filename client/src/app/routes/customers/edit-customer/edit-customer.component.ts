import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SprCustomersService } from '../../../shared/services/spr-customers.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(  
    public dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _customerService: SprCustomersService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'edit') {
      this.form = this.fb.group({
        customer_name: new FormControl(this.data.data.customer_name, Validators.required),
        is_active: new FormControl(this.data.data.is_active, Validators.required),
        customer_id: new FormControl(this.data.data.customer_id, Validators.required)
      })
    } else {
      this.form = new FormGroup({
        customer_name: new FormControl("", Validators.required),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._customerService.update(this.form.value.customer_id, this.form.value).subscribe(
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

  getCustomerNameErrorMessage() {
    return this.form.controls.customer_name.hasError('required') ? 'Поле "Заказчик" не должно быть пустым.' : '';
  }

}
