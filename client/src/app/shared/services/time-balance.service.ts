import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TimeBalance, Message } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TimeBalanceService {
    constructor(private http: HttpClient) { }

    fetch(day_reports_id: number, search: string, sort: string, order: string, pageSize: number, page: number): Observable<TimeBalanceApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TimeBalanceApi>(`${environment.url}/API/TIMEBALANCE/GET/${day_reports_id}`, { params: params });
    }

    total(day_reports_id: number): Observable<TimeBalance> {
        return this.http.get<TimeBalance>(`${environment.url}/API/TIMEBALANCE/GET/TOTAL/${day_reports_id}`)
    }

    create(timeBalance: TimeBalance): Observable<TimeBalance[]> {
        return this.http.post<TimeBalance[]>(`${environment.url}/API/TIMEBALANCE/POST`, timeBalance)
    }

    update(id: number, timeBalance: TimeBalance): Observable<TimeBalance> {
        return this.http.patch<TimeBalance>(`${environment.url}/API/TIMEBALANCE/PATCH/${id}`, timeBalance);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/TIMEBALANCE/DELETE/${id}`)
    }

}

export interface TimeBalanceApi {
    count: number;
    rows: TimeBalance[];
}
