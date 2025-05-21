import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class ClientService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        return this.http.post(this.baseurl + 'signin', {
            email: credentials.email,
            password: credentials.password
        }, httpOptions);
    }

    getAllClients() {
        return this.http.get<Client[]>(this.baseurl + 'clients');
    }

    getClientById(id: string) {
        return this.http.get<Client>(this.baseurl + 'clients' + '/' + id);
    }

    addClient(client: Client) {
        return this.http.post(this.baseurl + 'clients', client);
    }

    deleteClient(id: string) {
        return this.http.delete(this.baseurl + 'clients' + '/' + id);
    }

    updateClient(client: Client): Observable<Client> {
        return this.http.put<Client>(this.baseurl + 'clients' + '/' + client._id, client);
    }

    updateClientPassword(client: Client): Observable<Client> {
        return this.http.put<Client>(this.baseurl + 'client-password' + '/' + client._id, client);
    }

}
