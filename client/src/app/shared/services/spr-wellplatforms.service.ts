import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Wellplatform, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprWellplatformsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<WellplatformApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<WellplatformApi>(`${environment.url}/API/DIRECTORY/WELLPLATFORMS/GET`, { params: params });
    }

    getAllIsActive(search: string, sort: string, order: string, pageSize: number, page: number): Observable<WellplatformApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<WellplatformApi>(`${environment.url}/API/DIRECTORY/WELLPLATFORMS/GET/IS_ACTIVE`, { params: params });
    }

    create(wellplatform: Wellplatform): Observable<Wellplatform[]> {
        return this.http.post<Wellplatform[]>(`${environment.url}/API/DIRECTORY/WELLPLATFORMS/POST`, wellplatform);
    }

    update(id: number, wellplatform: Wellplatform): Observable<Wellplatform> {
        return this.http.patch<Wellplatform>(`${environment.url}/API/DIRECTORY/WELLPLATFORMS/PATCH/${id}`, wellplatform);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/WELLPLATFORMS/DELETE/${id}`);
    }

}

export interface WellplatformApi {
    count: number;
    rows: Wellplatform[];
}
