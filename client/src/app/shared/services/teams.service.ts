import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Team, Message } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TeamsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<TeamApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TeamApi>(`${environment.url}/API/DIRECTORY/TEAMS/GET`, { params: params });
    }

    getAllIsActive(search: string, sort: string, order: string, pageSize: number, page: number): Observable<TeamApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TeamApi>(`${environment.url}/API/DIRECTORY/TEAMS/GET/IS_ACTIVE`, { params: params });
    }

    create(team: Team): Observable<Team[]> {
        return this.http.post<Team[]>(`${environment.url}/API/DIRECTORY/TEAMS/POST`, team)
    }

    update(id: number, team: Team): Observable<Team> {
        return this.http.patch<Team>(`${environment.url}/API/DIRECTORY/TEAMS/PATCH/${id}`, team)
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/TEAMS/DELETE/${id}`)
    }

}

export interface TeamApi {
    count: number;
    rows: Team[];
}
