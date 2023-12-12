import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { TypeSpindle, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class TypeSpindlesService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<TypeSpindleApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TypeSpindleApi>(`${environment.url}/API/DIRECTORY/TYPE_SPINDLES/GET`, { params: params });
    }

    getSelect(): Observable<TypeSpindle[]> {
        return this.http.get<TypeSpindle[]>(`${environment.url}/API/DIRECTORY/TYPE_SPINDLES/GET/SELECT`);
    }

    create(typeSpindle: TypeSpindle): Observable<TypeSpindle[]> {
        return this.http.post<TypeSpindle[]>(`${environment.url}/API/DIRECTORY/TYPE_SPINDLES/POST`, typeSpindle);
    }

    update(id: number, typeSpindle: TypeSpindle): Observable<TypeSpindle> {
        return this.http.patch<TypeSpindle>(`${environment.url}/API/DIRECTORY/TYPE_SPINDLES/PATCH/${id}`, typeSpindle);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/TYPE_SPINDLES/DELETE/${id}`);
    }

}

export interface TypeSpindleApi {
    count: number;
    rows: TypeSpindle[];
}
