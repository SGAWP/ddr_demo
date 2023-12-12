import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { PlannedDataUBR } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class PlannedDataUBRService {
    constructor(private http: HttpClient) { }

    getById(months_id: number, year: number): Observable<PlannedDataUBR> {
        return this.http.get<PlannedDataUBR>(`${environment.url}/API/PLANNED_DATA/UBR/GET/${months_id}/${year}`)
    }

    create(plannedDataUBR: PlannedDataUBR): Observable<PlannedDataUBR[]> {
        return this.http.post<PlannedDataUBR[]>(`${environment.url}/API/PLANNED_DATA/UBR/POST`, plannedDataUBR)
    }

    update(id: number, plannedDataUBR: PlannedDataUBR): Observable<PlannedDataUBR> {
        return this.http.patch<PlannedDataUBR>(`${environment.url}/API/PLANNED_DATA/UBR/PATCH/${id}`, plannedDataUBR)
    }

}
