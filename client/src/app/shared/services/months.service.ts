import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Month } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MonthService {
    constructor(private http: HttpClient) { }

    fetch(): Observable<Month[]> {
        return this.http.get<Month[]>(`${environment.url}/API/MONTHS/GET`);
    }
}
