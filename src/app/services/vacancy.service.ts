import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  //server host api link
  private baseurl = 'https://youprocareers.co.uk/app/api/';

  constructor(private http: HttpClient) { }

  getAllVacancies() {
    return this.http.get<Vacancy[]>(this.baseurl + 'vacancies');
  }

  getVacancyById(id: any) {
    return this.http.get<Vacancy>(this.baseurl + 'vacancies' + '/' + id);
  }

  addVacancy(vacancy: Vacancy) {
    return this.http.post(this.baseurl + 'vacancies', vacancy);
  }

  deleteVacancy(id: string) {
    return this.http.delete(this.baseurl + 'vacancies' + '/' + id);
  }

  updateVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.put<Vacancy>(this.baseurl + 'vacancies' + '/' + vacancy._id, vacancy);
  }

}
