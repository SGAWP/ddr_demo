import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { State, StateTime, Message } from "../interfaces";
import { environment } from '@env/environment.prod';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class StateService {
    constructor(private http: HttpClient) { }

    fetch(day_reports_id: number, search: string, sort: string, order: string, pageSize: number, page: number): Observable<StateApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<StateApi>(`${environment.url}/API/STATE/GET/${day_reports_id}`, { params: params });
    }

    // getCharts(day_reports_id: number): Observable<State[]> {
    //     return this.http.get<State[]>(`${environment.url}/API/STATE/GET/CHART/${day_reports_id}`)
    // }

    getStateTime(): Observable<StateTime[]> {
        return this.http.get<StateTime[]>(`${environment.url}/API/DIRECTORY/STATE_TIME/GET`);
    }

    create(state: State): Observable<State[]> {
        return this.http.post<State[]>(`${environment.url}/API/STATE/POST`, state);
    }

    update(id: number, state: State): Observable<State> {
        return this.http.patch<State>(`${environment.url}/API/STATE/PATCH/${id}`, state);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/STATE/DELETE/${id}`);
    }

}

export interface StateApi {
    count: number;
    rows: State[];
}
