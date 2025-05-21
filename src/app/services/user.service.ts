import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class UserService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/auth/';

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        return this.http.post(this.baseurl + 'signin', {
            email: credentials.email,
            password: credentials.password
        }, httpOptions);
    }

    getAllUsers() {
        return this.http.get<User[]>(this.baseurl + 'users');
    }

    getUserById(id: string) {
        return this.http.get<User>(this.baseurl + 'users' + '/' + id);
    }

    addUser(user: User) {
        return this.http.post(this.baseurl + 'users', user);
    }

    deleteUser(id: string) {
        return this.http.delete(this.baseurl + 'users' + '/' + id);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.baseurl + 'users' + '/' + user._id, user);
    }

    updateUserPassword(user: User): Observable<User> {
        return this.http.put<User>(this.baseurl + 'user-password' + '/' + user._id, user);
    }

}
