import { Component, OnInit } from '@angular/core';
import { PageTitleService } from "../../shared/services/page-title.service";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  title = "Страница не найдена";

  constructor(
    private _auth: AuthService,
    private router: Router,
    private pageTitleService: PageTitleService
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle(this.title);
  }

  onSubmit() {
    if (this._auth.decode()) {
      this.router.navigate(["/svod"]);
    } else {
      this.router.navigate(["/auth/sign-in"]);
    }
  }

}
