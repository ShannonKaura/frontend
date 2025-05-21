import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidateNoProfile } from '../models/canidate-no-profile';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CandidateNoProfileService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllCandidateNoProfiles() {
        return this.http.get<CandidateNoProfile[]>(this.baseurl + 'candidateNoProfiles');
    }

    getCandidateNoProfileById(id: string) {
        return this.http.get<CandidateNoProfile>(this.baseurl + 'candidateNoProfiles' + '/' + id);
    }

    addCandidateNoProfile(candidateNoProfile: CandidateNoProfile) {
        return this.http.post(this.baseurl + 'candidateNoProfiles', candidateNoProfile);
    }

    deleteCandidateNoProfile(id: string) {
        return this.http.delete(this.baseurl + 'candidateNoProfiles' + '/' + id);
    }

    updateCandidateNoProfile(candidateNoProfile: CandidateNoProfile): Observable<CandidateNoProfile> {
        return this.http.put<CandidateNoProfile>(this.baseurl + 'candidateNoProfiles' + '/' + candidateNoProfile._id, candidateNoProfile);
    }

}
