import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _auth: AuthService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this._auth.getToken()
                }
            });
        }
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => this.handleAuthError(error)));
    }
    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this._auth.logout(), this.router.navigate(["/auth/sign-in"]), {
                queryParams: {
                    sessionFailed: true
                }
            };
        }
        return throwError(error);
    }
}
