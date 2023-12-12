import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Role } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class RoleService {
    constructor(private http: HttpClient) { }

    fetch(): Observable<Role[]> {
        return this.http.get<Role[]>(`${environment.url}/API/ROLES/GET`);
    }
}
