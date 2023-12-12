import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { PlannedSinking, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class PlannedSinkingService {
    constructor(private http: HttpClient) { }

    fetch(months_id: number, year: number, search: string, sort: string, order: string, pageSize: number, page: number): Observable<PlannedSinkingApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<PlannedSinkingApi>(`${environment.url}/API/PLANNED/SINKINGS/GET/${months_id}/${year}`, { params: params });
    }

    create(planned_sinking: PlannedSinking): Observable<PlannedSinking[]> {
        return this.http.post<PlannedSinking[]>(`${environment.url}/API/PLANNED/SINKINGS/POST`, planned_sinking);
    }

    update(id: number, planned_sinking: PlannedSinking): Observable<PlannedSinking> {
        return this.http.patch<PlannedSinking>(`${environment.url}/API/PLANNED/SINKINGS/PATCH/${id}`, planned_sinking)
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/PLANNED/SINKINGS/DELETE/${id}`)
    }

}

export interface PlannedSinkingApi {
    count: number;
    rows: PlannedSinking[];
}
