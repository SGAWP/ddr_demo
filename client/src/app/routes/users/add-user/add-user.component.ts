import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../../shared/services/users.service';
import { RoleService } from '../../../shared/services/roles.service';
import { User, Role } from "../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  roles: Role[];
  form: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _toast: ToastrService,
    private _userService: UserService,
    private _roleService: RoleService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadRoles();
  }

  loadRoles() {
    this._roleService.fetch().subscribe(role => {
      this.roles = role;
    });
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = this.fb.group({
        username: new FormControl("", Validators.required),
        full_name: new FormControl("", Validators.required),
        roles_id: new FormControl(null, [Validators.required]),
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['']
      }, { validator: this.checkPasswords });
    }
  }

  onSave() {
    this._userService.create(this.form.value).subscribe(
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

  getFullNameErrorMessage() {
    return this.form.controls.full_name.hasError('required') ? 'Поле "ФИО" не должно быть пустым.' : '';
  }

  getLoginErrorMessage() {
    return this.form.controls.username.hasError('required') ? 'Поле "Имя пользователя" не должно быть пустым.' : '';
  }

  getRoleErrorMessage() {
    return this.form.controls.roles_id.hasError('required') ? 'Нужно обязательно выбрать роль пользователя.' : '';
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
