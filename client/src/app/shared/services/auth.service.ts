import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../interfaces";
import { environment } from '@env/environment.prod';
import decode from "jwt-decode";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private token = null;

    constructor(private _http: HttpClient) { }

    login(user: User): Observable<{ token: string }> {
        return this._http.post<{ token: string }>(`${environment.url}/API/AUTH/POST/LOGIN`, user).pipe(tap(({ token }) => {
            localStorage.setItem("auth-token", token);
            this.setToken(token);
        }));
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    decode() {
        return decode(localStorage.getItem("auth-token"));
    }

    logout() {
        this.setToken(null);
        localStorage.clear();
    }

    getProfile(): Observable<User> {
        return this._http.get<User>(`${environment.url}/API/USERS/PROFILE`);
    }
}
