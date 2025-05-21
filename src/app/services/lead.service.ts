import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lead } from '../models/lead';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class LeadService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllLeads() {
        return this.http.get<Lead[]>(this.baseurl + 'leads');
    }

    getLeadById(id: string) {
        return this.http.get<Lead>(this.baseurl + 'leads' + '/' + id);
    }

    addLead(lead: Lead) {
        return this.http.post(this.baseurl + 'leads', lead);
    }

    deleteLead(id: string) {
        return this.http.delete(this.baseurl + 'leads' + '/' + id);
    }

    updateLead(lead: Lead): Observable<Lead> {
        return this.http.put<Lead>(this.baseurl + 'leads' + '/' + lead._id, lead);
    }

}
