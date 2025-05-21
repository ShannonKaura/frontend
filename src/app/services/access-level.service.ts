import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessLevel } from '../models/access-level';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class AccessLevelService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllAccessLevels() {
        return this.http.get<AccessLevel[]>(this.baseurl + 'access-levels');
    }

    getAccessLevelById(id: string) {
        return this.http.get<AccessLevel>(this.baseurl + 'access-levels' + '/' + id);
    }

    addAccessLevel(accessLevel: AccessLevel) {
        return this.http.post(this.baseurl + 'access-levels', accessLevel);
    }

    deleteAccessLevel(id: string) {
        return this.http.delete(this.baseurl + 'access-levels' + '/' + id);
    }

    updateAccessLevel(accessLevel: AccessLevel): Observable<AccessLevel> {
        return this.http.put<AccessLevel>(this.baseurl + 'access-levels' + '/' + accessLevel._id, accessLevel);
    }

}
