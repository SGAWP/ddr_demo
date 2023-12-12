import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Bit, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprBitsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<BitApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<BitApi>(`${environment.url}/API/DIRECTORY/BITS/GET`, { params: params });
    }

    create(diameter: Bit): Observable<Bit[]> {
        return this.http.post<Bit[]>(`${environment.url}/API/DIRECTORY/BITS/POST`, diameter);
    }

    update(id: number, diameter: Bit): Observable<Bit> {
        return this.http.patch<Bit>(`${environment.url}/API/DIRECTORY/BITS/PATCH/${id}`, diameter);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/BITS/DELETE/${id}`);
    }

}

export interface BitApi {
    count: number;
    rows: Bit[];
}
