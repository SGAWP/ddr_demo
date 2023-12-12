import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Type, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprTypesService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<TypeApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TypeApi>(`${environment.url}/API/DIRECTORY/TYPES/GET`, { params: params });
    }

    getAllIsActive(): Observable<Type[]> {
        return this.http.get<Type[]>(`${environment.url}/API/DIRECTORY/TYPES/GET/IS_ACTIVE`);
    }

    create(type: Type): Observable<Type[]> {
        return this.http.post<Type[]>(`${environment.url}/API/DIRECTORY/TYPES/POST`, type);
    }

    update(id: number, type: Type): Observable<Type> {
        return this.http.patch<Type>(`${environment.url}/API/DIRECTORY/TYPES/PATCH/${id}`, type);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/TYPES/DELETE/${id}`);
    }

}

export interface TypeApi {
    count: number;
    rows: Type[];
}
