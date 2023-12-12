import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Oilfield, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprOilfieldsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<OilfieldApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<OilfieldApi>(`${environment.url}/API/DIRECTORY/OILFIELDS/GET`, { params: params });
    }
    
    getAllIsActive(search: string, sort: string, order: string, pageSize: number, page: number): Observable<OilfieldApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<OilfieldApi>(`${environment.url}/API/DIRECTORY/OILFIELDS/GET/IS_ACTIVE`, { params: params });
    }

    create(oilfield: Oilfield): Observable<Oilfield[]> {
        return this.http.post<Oilfield[]>(`${environment.url}/API/DIRECTORY/OILFIELDS/POST`, oilfield);
    }

    update(id: number, oilfield: Oilfield): Observable<Oilfield> {
        return this.http.patch<Oilfield>(`${environment.url}/API/DIRECTORY/OILFIELDS/PATCH/${id}`, oilfield);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/OILFIELDS/DELETE/${id}`);
    }

}

export interface OilfieldApi {
    count: number;
    rows: Oilfield[];
}
