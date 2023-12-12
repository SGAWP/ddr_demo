import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Year } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class YearService {
    constructor(private http: HttpClient) { }

    fetch(): Observable<Year[]> {
        return this.http.get<Year[]>(`${environment.url}/API/YEARS/GET`);
    }
}
