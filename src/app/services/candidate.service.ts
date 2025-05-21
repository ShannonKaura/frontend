import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidate } from '../models/candidate';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/auth/';

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        return this.http.post(this.baseurl + 'signin', {
            email: credentials.email,
            password: credentials.password
        }, httpOptions);
    }

    getAllCandidates() {
        return this.http.get<Candidate[]>(this.baseurl + 'candidates');
    }

    getCandidateById(id: any) {
        return this.http.get<Candidate>(this.baseurl + 'candidates' + '/' + id);
    }

    getCandidateByEmail(email: any) {
        return this.http.get<Candidate>(this.baseurl + 'candidate-email' + '/' + email);
    }

    addCandidate(candidate: Candidate) {
        return this.http.post(this.baseurl + 'candidates', candidate);
    }

    deleteCandidate(id: string) {
        return this.http.delete(this.baseurl + 'candidates' + '/' + id);
    }

    updateCandidate(candidate: Candidate): Observable<Candidate> {
        return this.http.put<Candidate>(this.baseurl + 'candidates' + '/' + candidate._id, candidate);
    }

    updateCandidatePassword(candidate: Candidate): Observable<Candidate> {
        return this.http.put<Candidate>(this.baseurl + 'candidate-password' + '/' + candidate._id, candidate);
    }

}
