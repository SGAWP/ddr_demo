import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from "../../../../shared/services/users.service";
import { ToastrService } from "ngx-toastr";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;

  matcher = new MyErrorStateMatcher();

  @Output() optionsEvent = new EventEmitter<object>();

  constructor(
    public dialog: MatDialog,
    private _toast: ToastrService,
    private _userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSave() {
    this._userService.reset(this.form.value)
      .subscribe(
        () => {
          this.dialogRef.close(true);
          this._toast.success("Пароль изменен.");
        },
        error => {
          this.dialogRef.close(true);
          this._toast.error(error.error.message);
        }
      );
  }

  getPasswordErrorMessage() {
    return this.form.controls.password.hasError("required") ? "Пароль не должен быть пустым." :
      this.form.controls.password.hasError("minlength") ? "Пароль должен быть больше 6 символов." : "";
  }

  getPasswordConfirmErrorMessage() {
    return this.form.controls.confirmPassword.hasError("required") ? "Пароли не совпадают." :
      this.form.hasError("notSame") ? "Пароли не совпадают." : "";
  }

}
