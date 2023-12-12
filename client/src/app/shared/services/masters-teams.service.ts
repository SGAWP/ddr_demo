import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MasterTeam, Message } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MastersTeamsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<MasterTeamApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<MasterTeamApi>(`${environment.url}/API/MT/GET`, { params: params });
    }

    create(mt: MasterTeam): Observable<MasterTeam[]> {
        return this.http.post<MasterTeam[]>(`${environment.url}/API/MT/POST`, mt);
    }

    update(id: number, mt: MasterTeam): Observable<MasterTeam> {
        return this.http.patch<MasterTeam>(`${environment.url}/API/MT/PATCH/${id}`, mt);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/MT/DELETE/${id}`);
    }

}

export interface MasterTeamApi {
    count: number;
    rows: MasterTeam[];
}
