import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';
import { AuthService } from "../../../shared/services/auth.service";
import { User } from "../../../shared/interfaces";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @Input() ripple = false;

  user: User;

  menus = this.menuService.getAll();

  constructor(
    private _auth: AuthService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.user = this._auth.decode();
  }

}
