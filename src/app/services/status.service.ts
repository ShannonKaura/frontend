import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class StatusService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllStatuses() {
        return this.http.get<Status[]>(this.baseurl + 'statuses');
    }

    getStatusById(id: string) {
        return this.http.get<Status>(this.baseurl + 'statuses' + '/' + id);
    }

    // Create Status
    addStatus(status: any): Observable<any> {
        var formData = new FormData();

        formData.append("status", status.status);
        formData.append('candidate_id', status.candidate_id);
        formData.append('created_by', status.created_by);
        formData.append('modified_by', status.modified_by);
        formData.append('created_date', status.created_date);
        formData.append('modified_date', status.modified_date);

        return this.http.post<Status>(this.baseurl + 'statuses', formData, {
            reportProgress: true,
            observe: 'events'
        })
    }


    deleteStatus(id: string) {
        return this.http.delete(this.baseurl + 'statuses' + '/' + id);
    }

    updateStatus(status: Status, status_id: string): Observable<any> {
        var formData = new FormData();

        formData.append("status", status.status);
        formData.append('candidate_id', status.candidate_id);
        formData.append('created_by', status.created_by);
        formData.append('modified_by', status.modified_by);
        formData.append('created_date', status.created_date);
        formData.append('modified_date', status.modified_date);

        return this.http.put<Status>(this.baseurl + 'statuses' + '/' + status_id, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

}
