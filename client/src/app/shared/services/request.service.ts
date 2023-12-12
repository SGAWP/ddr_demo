import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Request, Message } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class RequestService {
    constructor(private http: HttpClient) { }

    fetch(day_reports_id: number, search: string, sort: string, order: string, pageSize: number, page: number): Observable<RequestApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<RequestApi>(`${environment.url}/API/REQUESTS/GET/${day_reports_id}`, { params: params });
    }

    create(request: Request): Observable<Request[]> {
        return this.http.post<Request[]>(`${environment.url}/API/REQUESTS/POST`, request);
    }

    update(id: number, request: Request): Observable<Request> {
        return this.http.patch<Request>(`${environment.url}/API/REQUESTS/PATCH/${id}`, request);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/REQUESTS/DELETE/${id}`);
    }

}

export interface RequestApi {
    count: number;
    rows: Request[];
}
