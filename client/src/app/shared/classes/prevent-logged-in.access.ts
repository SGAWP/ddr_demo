import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class PreventLoggedInAccess implements CanActivate, CanActivateChild {
    constructor(private _auth: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (!this._auth.isAuthenticated()) {
            return of(true);
        } else {
            this.router.navigate(["/svod"], {
                queryParams: {
                    accessDenied: true
                }
            });
            return of(false);
        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}
