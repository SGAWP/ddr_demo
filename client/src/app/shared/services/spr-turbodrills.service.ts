import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Turbodrill, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprTurbodrillsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<TurbodrillApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TurbodrillApi>(`${environment.url}/API/DIRECTORY/TURBODRILLS/GET`, { params: params });
    }

    create(turbodrill: Turbodrill): Observable<Turbodrill[]> {
        return this.http.post<Turbodrill[]>(`${environment.url}/API/DIRECTORY/TURBODRILLS/POST`, turbodrill);
    }

    update(id: number, turbodrill: Turbodrill): Observable<Turbodrill> {
        return this.http.patch<Turbodrill>(`${environment.url}/API/DIRECTORY/TURBODRILLS/PATCH/${id}`, turbodrill);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/TURBODRILLS/DELETE/${id}`);
    }

}

export interface TurbodrillApi {
    count: number;
    rows: Turbodrill[];
}
