import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '@env/environment.prod';
import { Customer, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class SprCustomersService {
    constructor(private http: HttpClient) { }

    fetch(search: string, sort: string, order: string, pageSize: number, page: number): Observable<CustomerApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this.http.get<CustomerApi>(`${environment.url}/API/DIRECTORY/CUSTOMERS/GET`, { params: params });
    }

    getAllIsActive(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${environment.url}/API/DIRECTORY/CUSTOMERS/GET/IS_ACTIVE`);
    }

    create(customer: Customer): Observable<Customer[]> {
        return this.http.post<Customer[]>(`${environment.url}/API/DIRECTORY/CUSTOMERS/POST`, customer);
    }

    update(id: number, customer: Customer): Observable<Customer> {
        return this.http.patch<Customer>(`${environment.url}/API/DIRECTORY/CUSTOMERS/PATCH/${id}`, customer);
    }

    delete(id: number): Observable<Message> {
        return this.http.delete<Message>(`${environment.url}/API/DIRECTORY/CUSTOMERS/DELETE/${id}`);
    }

}

export interface CustomerApi {
    count: number;
    rows: Customer[];
}
