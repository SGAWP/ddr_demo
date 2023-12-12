import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { User, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<UserApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<UserApi>(`${environment.url}/API/USERS/GET`, { params: params });
    }

    create(user: User): Observable<User[]> {
        return this.http.post<User[]>(`${environment.url}/API/USERS/POST`, user);
    }

    update(id: number, user: User): Observable<User> {
        return this.http.patch<User>(`${environment.url}/API/USERS/PATCH/${id}`, user);
    }

    updatePassword(id: number, user: User): Observable<User> {
        return this.http.patch<User>(`${environment.url}/API/USERS/UPDATE/PASSWORD/${id}`, user);
    }

    reset(user: User): Observable<User> {
        return this.http.patch<User>(`${environment.url}/API/USERS/RESET/PASSWORD`, user);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/USERS/DELETE/${id}`);
    }

}

export interface UserApi {
    count: number;
    rows: User[];
}
