import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class RoleGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const current = this.auth.decode();
        if (next.data.role_name.includes(current.role_name)) {
            return true;
        }
        this.router.navigate(["/svod"]);
        return false;
    }
}
