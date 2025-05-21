import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class JobService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllJobs() {
        return this.http.get<Job[]>(this.baseurl + 'jobs');
    }

    getJobById(id: string) {
        return this.http.get<Job>(this.baseurl + 'jobs' + '/' + id);
    }

    addJob(job: Job) {
        return this.http.post(this.baseurl + 'jobs', job);
    }

    deleteJob(id: string) {
        return this.http.delete(this.baseurl + 'jobs' + '/' + id);
    }

    updateJob(job: Job): Observable<Job> {
        return this.http.put<Job>(this.baseurl + 'jobs' + '/' + job._id, job);
    }

}
