import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Technology, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprTechnologiesService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<TechnologyApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TechnologyApi>(`${environment.url}/API/DIRECTORY/TECHNOLOGIES/GET`, { params: params });
    }

    getAllIsActive(): Observable<Technology[]> {
        return this.http.get<Technology[]>(`${environment.url}/API/DIRECTORY/TECHNOLOGIES/GET/IS_ACTIVE`);
    }

    create(technology: Technology): Observable<Technology[]> {
        return this.http.post<Technology[]>(`${environment.url}/API/DIRECTORY/TECHNOLOGIES/POST`, technology);
    }

    update(id: number, technology: Technology): Observable<Technology> {
        return this.http.patch<Technology>(`${environment.url}/API/DIRECTORY/TECHNOLOGIES/PATCH/${id}`, technology);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/TECHNOLOGIES/DELETE/${id}`);
    }

}

export interface TechnologyApi {
    count: number;
    rows: Technology[];
}
