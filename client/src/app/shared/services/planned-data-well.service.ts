import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { PlannedDataWell, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class PlannedDataWellService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<PlannedDataWellApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<PlannedDataWellApi>(`${environment.url}/API/PLANNED_DATA/WELL/GET`, { params: params });
    }

    create(planned_data_well: PlannedDataWell): Observable<PlannedDataWell[]> {
        return this.http.post<PlannedDataWell[]>(`${environment.url}/API/PLANNED_DATA/WELL/POST`, planned_data_well);
    }

    update(id: number, planned_data_well: PlannedDataWell): Observable<PlannedDataWell> {
        return this.http.patch<PlannedDataWell>(`${environment.url}/API/PLANNED_DATA/WELL/PATCH/${id}`, planned_data_well)
    }

    delete(id: number, well: string): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/PLANNED_DATA/WELL/DELETE/${id}/${well}`)
    }

}

export interface PlannedDataWellApi {
    count: number;
    rows: PlannedDataWell[];
}
