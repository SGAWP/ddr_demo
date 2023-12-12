import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprCustomersService } from '../../../shared/services/spr-customers.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(  
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _customerService: SprCustomersService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        customer_name: new FormControl("", [Validators.required]),
        is_active: new FormControl(true)
      })
    }
  }

  onSave() {
    this._customerService.create(this.form.value).subscribe(
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