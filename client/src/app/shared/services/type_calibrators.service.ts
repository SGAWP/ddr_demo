import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { TypeCalibrator, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class TypeCalibratorsService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<TypeCalibratorApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<TypeCalibratorApi>(`${environment.url}/API/DIRECTORY/TYPE_CALIBRATORS/GET`, { params: params });
    }

    getSelect(): Observable<TypeCalibrator[]> {
        return this.http.get<TypeCalibrator[]>(`${environment.url}/API/DIRECTORY/TYPE_CALIBRATORS/GET/SELECT`);
    }

    create(typeCalibrator: TypeCalibrator): Observable<TypeCalibrator[]> {
        return this.http.post<TypeCalibrator[]>(`${environment.url}/API/DIRECTORY/TYPE_CALIBRATORS/POST`, typeCalibrator);
    }

    update(id: number, typeCalibrator: TypeCalibrator): Observable<TypeCalibrator> {
        return this.http.patch<TypeCalibrator>(`${environment.url}/API/DIRECTORY/TYPE_CALIBRATORS/PATCH/${id}`, typeCalibrator);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/TYPE_CALIBRATORS/DELETE/${id}`);
    }

}

export interface TypeCalibratorApi {
    count: number;
    rows: TypeCalibrator[];
}
