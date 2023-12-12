import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { WellPurpose, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprWellPurposesService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<WellPurposeApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<WellPurposeApi>(`${environment.url}/API/DIRECTORY/WELL_PURPOSES/GET`, { params: params });
    }

    getAllIsActive(): Observable<WellPurpose[]> {
        return this.http.get<WellPurpose[]>(`${environment.url}/API/DIRECTORY/WELL_PURPOSES/GET/IS_ACTIVE`);
    }

    create(wellPurpose: WellPurpose): Observable<WellPurpose[]> {
        return this.http.post<WellPurpose[]>(`${environment.url}/API/DIRECTORY/WELL_PURPOSES/POST`, wellPurpose);
    }

    update(id: number, wellPurpose: WellPurpose): Observable<WellPurpose> {
        return this.http.patch<WellPurpose>(`${environment.url}/API/DIRECTORY/WELL_PURPOSES/PATCH/${id}`, wellPurpose);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/WELL_PURPOSES/DELETE/${id}`);
    }

}

export interface WellPurposeApi {
    count: number;
    rows: WellPurpose[];
}
