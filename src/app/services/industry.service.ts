import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Industry } from '../models/industry';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class IndustryService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllIndustries() {
        return this.http.get<Industry[]>(this.baseurl + 'industries');
    }

    getIndustryById(id: string) {
        return this.http.get<Industry>(this.baseurl + 'industries' + '/' + id);
    }

    addIndustry(industry: Industry) {
        return this.http.post(this.baseurl + 'industries', industry);
    }

    deleteIndustry(id: string) {
        return this.http.delete(this.baseurl + 'industries' + '/' + id);
    }

    updateIndustry(industry: Industry): Observable<Industry> {
        return this.http.put<Industry>(this.baseurl + 'industries' + '/' + industry._id, industry);
    }

}
