import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../../shared/services/users.service';
import { ToastrService } from "ngx-toastr";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  form: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<UpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _toast: ToastrService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      user_id: new FormControl(this.data.data.user_id, [Validators.required]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  onSave() {
    this._userService.updatePassword(this.form.value.user_id, this.form.value)
      .subscribe(
        () => {
          this.dialogRef.close(true);
          this._toast.success("Данные сохранены.");
        },
        error => {
          this.dialogRef.close(true);
          this._toast.error(error.error.message);
        }
      );
  }

  getPasswordErrorMessage() {
    return this.form.controls.password.hasError("required") ? 'Поле "Пароль" не должно быть пустым.' :
      this.form.controls.password.hasError("minlength") ? 'Пароль должен быть больше 6 символов.' : '';
  }

  getPasswordConfirmErrorMessage() {
    return this.form.controls.confirmPassword.hasError("required") ? 'Пароли не совпадают.' :
      this.form.hasError("notSame") ? 'Пароли не совпадают.' : '';
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
