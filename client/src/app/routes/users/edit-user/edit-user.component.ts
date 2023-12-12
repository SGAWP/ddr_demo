import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from '../../../shared/services/users.service';
import { RoleService } from '../../../shared/services/roles.service';
import { Role } from "../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  roles: Role[];

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService,
    private _roleService: RoleService,
    private _toast: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadRoles();
  }

  private loadRoles() {
    this._roleService.fetch().subscribe(role => {
      this.roles = role;
    })
  }

  initializeForm() {
    if (this.data.action == "edit") {
      this.form = this.fb.group({
        username: new FormControl(this.data.data.username, Validators.required),
        full_name: new FormControl(this.data.data.full_name, Validators.required),
        roles_id: new FormControl(this.data.data.roles_id, Validators.required),
        user_id: new FormControl(this.data.data.user_id, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        username: new FormControl("", Validators.required),
        full_name: new FormControl("", Validators.required),
        roles_id: new FormControl(null, Validators.required)
      });
    }
  }

  onSave() {
    this._userService.update(this.form.value.user_id, this.form.value).subscribe(
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

  getFullNameErrorMessage() {
    return this.form.controls.full_name.hasError('required') ? 'Поле "ФИО" не должно быть пустым.' : '';
  }

  getLoginErrorMessage() {
    return this.form.controls.username.hasError('required') ? 'Поле "Имя пользователя" не должно быть пустым.' : '';
  }

  getRoleErrorMessage() {
    return this.form.controls.roles_id.hasError('required') ? 'Нужно обязательно выбрать роль пользователя.' : '';
  }

}
