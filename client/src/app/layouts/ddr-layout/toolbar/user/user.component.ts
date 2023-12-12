import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../../shared/services/auth.service";
import { MatDialog } from "@angular/material";
import { SettingsComponent } from "../../dialog/settings/settings.component";
import { User } from "../../../../shared/interfaces";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private _auth: AuthService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user = this._auth.decode();
    this.loadProfile();
  }

  private loadProfile() {
    this._auth.getProfile().subscribe(user => {
      this.user = user;
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(SettingsComponent, {
      width: "350px",
      data: { title: "Cброс пароля" }
    });
    dialogRef.afterClosed();
  }

  onLogout(event: Event) {
    event.preventDefault();
    this._auth.logout();
    this.router.navigate(["/auth/sign-in"]);
  }

}
