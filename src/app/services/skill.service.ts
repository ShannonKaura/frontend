import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from '../models/skill';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class SkillService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllSkills() {
        return this.http.get<Skill[]>(this.baseurl + 'skills');
    }

    getSkillById(id: string) {
        return this.http.get<Skill>(this.baseurl + 'skills' + '/' + id);
    }

    addSkill(skill: Skill) {
        return this.http.post(this.baseurl + 'skills', skill);
    }

    deleteSkill(id: string) {
        return this.http.delete(this.baseurl + 'skills' + '/' + id);
    }

    updateSkill(skill: Skill): Observable<Skill> {
        return this.http.put<Skill>(this.baseurl + 'skills' + '/' + skill._id, skill);
    }

}
