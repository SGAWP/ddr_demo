import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { PageTitleService } from "../../shared/services/page-title.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  title = "Авторизация";
  loading: boolean = false;

  constructor(
    private pageTitleService: PageTitleService,
    private _auth: AuthService,
    private _toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);

    this.form = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      const accessDenied = this.route.snapshot.queryParamMap.has("accessDenied");
      if (accessDenied) {
        this._toast.warning("Для начала работы выполните авторизацию.");
      }
    });
  }

  onLogin() {
    this.loading = true;
    this.form.disable();
    this._auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(["/svod"]);
        this.loading = false;
      },
      error => {
        this.form.enable();
        this._toast.error(error.error.message);
        this.loading = false;
      }
    );
  }

  getLoginErrorMessage() {
    return this.form.controls.username.hasError("required") ? "Имя пользователя не должено быть пустым." : "";
  }

  getPasswordErrorMessage() {
    return this.form.controls.password.hasError("required") ? "Пароль не должен быть пустым." :
      this.form.controls.password.hasError("minlength") ? "Пароль должен быть больше 6 символов." : "";
  }

}
