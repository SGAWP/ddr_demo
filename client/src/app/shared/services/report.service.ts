import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ReportService {
    constructor(private http: HttpClient) { }

    getSvod(report_date: string): Observable<any> {
        return this.http.get(`${environment.url}/API/REPORT/GET/${report_date}`, { responseType: 'blob' })
    }

    getSvodWorkDrilling(report_date: string): Observable<any> {
        return this.http.get(`${environment.url}/API/REPORT/GET/SVOD_WORK_DRILLING/${report_date}`, { responseType: 'blob' })
    }

}
