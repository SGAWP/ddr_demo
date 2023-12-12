import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Master, Message } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MastersService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<MasterApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<MasterApi>(`${environment.url}/API/DIRECTORY/MASTERS/GET`, { params: params });
    }

    getMTAll(search: string, sort: string, order: string, pageSize: number, page: number): Observable<MasterApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<MasterApi>(`${environment.url}/API/DIRECTORY/MASTERS/GET_MT_ALL`, { params: params });
    }

    create(master: Master): Observable<Master[]> {
        return this.http.post<Master[]>(`${environment.url}/API/DIRECTORY/MASTERS/POST`, master);
    }

    update(id: number, master: Master): Observable<Master> {
        return this.http.patch<Master>(`${environment.url}/API/DIRECTORY/MASTERS/PATCH/${id}`, master);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/MASTERS/DELETE/${id}`);
    }
}

export interface MasterApi {
    count: number;
    rows: Master[];
}
