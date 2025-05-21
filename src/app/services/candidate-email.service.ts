import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from '../models/email';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CandidateEmailService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllEmails() {
        return this.http.get<Email[]>(this.baseurl + 'emails');
    }

    getEmailById(id: string) {
        return this.http.get<Email>(this.baseurl + 'emails' + '/' + id);
    }

    addEmail(email: Email) {
        return this.http.post(this.baseurl + 'emails', email);
    }

    deleteEmail(id: string) {
        return this.http.delete(this.baseurl + 'emails' + '/' + id);
    }

    updateEmail(email: Email): Observable<Email> {
        return this.http.put<Email>(this.baseurl + 'emails' + '/' + email._id, email);
    }

}
