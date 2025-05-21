import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../models/country';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CountryService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllCountries() {
        return this.http.get<Country[]>(this.baseurl + 'countries');
    }

    getCountryById(id: string) {
        return this.http.get<Country>(this.baseurl + 'countries' + '/' + id);
    }

    addCountry(country: Country) {
        return this.http.post(this.baseurl + 'countries', country);
    }

    deleteCountry(id: string) {
        return this.http.delete(this.baseurl + 'countries' + '/' + id);
    }

    updateCountry(country: Country): Observable<Country> {
        return this.http.put<Country>(this.baseurl + 'countries' + '/' + country._id, country);
    }

}
