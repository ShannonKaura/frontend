import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Staff } from '../models/staff';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class StaffService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllStaff() {
        return this.http.get<Staff[]>(this.baseurl + 'staff');
    }

    getStaffById(id: string) {
        return this.http.get<Staff>(this.baseurl + 'staff' + '/' + id);
    }

    addStaff(staff: Staff) {
        return this.http.post(this.baseurl + 'staff', staff);
    }

    deleteStaff(id: string) {
        return this.http.delete(this.baseurl + 'staff' + '/' + id);
    }

    updateStaff(staff: Staff): Observable<Staff> {
        return this.http.put<Staff>(this.baseurl + 'staff' + '/' + staff._id, staff);
    }

}
