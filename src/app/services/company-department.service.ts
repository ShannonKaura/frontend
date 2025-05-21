import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyDepartment } from '../models/company-department';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CompanyDepartmentService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllCompanyDepartments() {
        return this.http.get<CompanyDepartment[]>(this.baseurl + 'company-departments');
    }

    getCompanyDepartmentById(id: string) {
        return this.http.get<CompanyDepartment>(this.baseurl + 'company-departments' + '/' + id);
    }

    addCompanyDepartment(companyDepartment: CompanyDepartment) {
        return this.http.post(this.baseurl + 'company-departments', companyDepartment);
    }

    deleteCompanyDepartment(id: string) {
        return this.http.delete(this.baseurl + 'company-departments' + '/' + id);
    }

    updateCompanyDepartment(companyDepartment: CompanyDepartment): Observable<CompanyDepartment> {
        return this.http.put<CompanyDepartment>(this.baseurl + 'company-departments' + '/' + companyDepartment._id, companyDepartment);
    }

}
