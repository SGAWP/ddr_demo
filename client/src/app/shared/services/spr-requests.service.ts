import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { SprRequests, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprRequestsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<RequestApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<RequestApi>(`${environment.url}/API/DIRECTORY/REQUESTS/GET`, { params: params });
    }

    getAllIsActive(search: string, sort: string, order: string, pageSize: number, page: number): Observable<RequestApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<RequestApi>(`${environment.url}/API/DIRECTORY/REQUESTS/GET/IS_ACTIVE`, { params: params });
    }

    create(request: SprRequests): Observable<SprRequests[]> {
        return this.http.post<SprRequests[]>(`${environment.url}/API/DIRECTORY/REQUESTS/POST`, request);
    }

    update(id: number, request: SprRequests): Observable<SprRequests> {
        return this.http.patch<SprRequests>(`${environment.url}/API/DIRECTORY/REQUESTS/PATCH/${id}`, request);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/REQUESTS/DELETE/${id}`);
    }

}

export interface RequestApi {
    count: number;
    rows: SprRequests[];
}
