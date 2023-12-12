import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DayReport, Message } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SvodService {
    constructor(private http: HttpClient) { }

    fetch(report_date: string, params: any = {}): Observable<DayReportApi> {
        return this.http.get<DayReportApi>(`${environment.url}/API/SVOD/GET/${report_date}`, { params: new HttpParams({ fromObject: params }) });
    }

    getById(id: string): Observable<DayReport> {
        return this.http.get<DayReport>(`${environment.url}/API/SVOD/GET/BY/${id}`)
    }

    getSinkingYear(hour_id: number): Observable<DayReport[]> {
        return this.http.get<DayReport[]>(`${environment.url}/API/SVOD/GET/SINKING/YEAR/${hour_id}`)
    }

    getSinkingMonth(hour_id: number): Observable<DayReport[]> {
        return this.http.get<DayReport[]>(`${environment.url}/API/SVOD/GET/SINKING/MONTH/${hour_id}`)
    }

    create(day_report: DayReport): Observable<DayReport> {
        return this.http.post<DayReport>(`${environment.url}/API/SVOD/POST`, day_report);
    }

    defaultCreate(): Observable<any> {
        return this.http.post<any>(`${environment.url}/API/SVOD/DEFAULT/POST`, undefined);
    }

    update(id: number, day_report: DayReport): Observable<DayReport> {
        return this.http.patch<DayReport>(`${environment.url}/API/SVOD/PATCH/${id}`, day_report)
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/SVOD/DELETE/${id}`)
    }

}

export interface DayReportApi {
    count: number;
    rows: DayReport[];
}
