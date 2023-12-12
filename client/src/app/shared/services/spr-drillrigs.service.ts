import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Drillrig, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprDrillrigsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<DrillrigApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<DrillrigApi>(`${environment.url}/API/DIRECTORY/DRILLRIGS/GET`, { params: params });
    }

    getAllIsActive(): Observable<Drillrig[]> {
        return this.http.get<Drillrig[]>(`${environment.url}/API/DIRECTORY/DRILLRIGS/GET/IS_ACTIVE`);
    }

    create(drillrig: Drillrig): Observable<Drillrig[]> {
        return this.http.post<Drillrig[]>(`${environment.url}/API/DIRECTORY/DRILLRIGS/POST`, drillrig);
    }

    update(id: number, drillrig: Drillrig): Observable<Drillrig> {
        return this.http.patch<Drillrig>(`${environment.url}/API/DIRECTORY/DRILLRIGS/PATCH/${id}`, drillrig);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/DRILLRIGS/DELETE/${id}`);
    }

}

export interface DrillrigApi {
    count: number;
    rows: Drillrig[];
}
