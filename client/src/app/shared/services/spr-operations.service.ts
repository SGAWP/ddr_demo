import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Operation, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprOperationsService {
    constructor(private http: HttpClient) { }

    fetch(): Observable<Operation[]> {
        return this.http.get<Operation[]>(`${environment.url}/API/DIRECTORY/OPERATIONS/GET`);
    }

    unique(): Observable<Operation[]> {
        return this.http.get<Operation[]>(`${environment.url}/API/DIRECTORY/OPERATIONS/GET/UNIQUE`)
    }

    create(operation: Operation): Observable<Operation[]> {
        return this.http.post<Operation[]>(`${environment.url}/API/DIRECTORY/OPERATIONS/POST`, operation);
    }

    update(id: number, operation: Operation): Observable<Operation> {
        return this.http.patch<Operation>(`${environment.url}/API/DIRECTORY/OPERATIONS/PATCH/${id}`, operation);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/OPERATIONS/DELETE/${id}`);
    }

}

export interface OperationApi {
    count: number;
    rows: Operation[];
}
