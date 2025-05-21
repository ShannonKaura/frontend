import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tool } from '../models/tool';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class ToolService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllTools() {
        return this.http.get<Tool[]>(this.baseurl + 'tools');
    }

    getToolById(id: string) {
        return this.http.get<Tool>(this.baseurl + 'tools' + '/' + id);
    }

    addTool(tool: Tool) {
        return this.http.post(this.baseurl + 'tools', tool);
    }

    deleteTool(id: string) {
        return this.http.delete(this.baseurl + 'tools' + '/' + id);
    }

    updateTool(tool: Tool): Observable<Tool> {
        return this.http.put<Tool>(this.baseurl + 'tools' + '/' + tool._id, tool);
    }

}
