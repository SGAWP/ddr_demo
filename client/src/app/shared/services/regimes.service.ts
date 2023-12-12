import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Regime, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class RegimesService {
    constructor(private http: HttpClient) { }

    fetch(day_reports_id: number, search: string, pageSize: number, page: number): Observable<RegimeApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        // params = params.append("sort", sort);
        // params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<RegimeApi>(`${environment.url}/API/REGIMES/GET/${day_reports_id}`, { params: params });
    }

    create(regime: Regime): Observable<Regime[]> {
        return this.http.post<Regime[]>(`${environment.url}/API/REGIMES/POST`, regime);
    }

    update(id: number, regime: Regime): Observable<Regime> {
        return this.http.patch<Regime>(`${environment.url}/API/REGIMES/PATCH/${id}`, regime);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/REGIMES/DELETE/${id}`);
    }

}

export interface RegimeApi {
    count: number;
    rows: Regime[];
}
