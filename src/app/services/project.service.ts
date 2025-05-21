import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllProjects() {
        return this.http.get<Project[]>(this.baseurl + 'projects');
    }

    getProjectById(id: string) {
        return this.http.get<Project>(this.baseurl + 'projects' + '/' + id);
    }

    addProject(project: Project) {
        return this.http.post(this.baseurl + 'projects', project);
    }

    deleteProject(id: string) {
        return this.http.delete(this.baseurl + 'projects' + '/' + id);
    }

    updateProject(project: Project): Observable<Project> {
        return this.http.put<Project>(this.baseurl + 'projects' + '/' + project._id, project);
    }

}
