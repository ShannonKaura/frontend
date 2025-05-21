import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class BlogService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllBlogs() {
        return this.http.get<Blog[]>(this.baseurl + 'blogs');
    }

    getBlogById(id: string) {
        return this.http.get<Blog>(this.baseurl + 'blogs' + '/' + id);
    }

    addBlog(blog: Blog) {
        return this.http.post(this.baseurl + 'blogs', blog, { reportProgress: true, observe: 'events' });
    }

    deleteBlog(id: string) {
        return this.http.delete(this.baseurl + 'blogs' + '/' + id);
    }

    updateBlog(blog: Blog): Observable<any> {
        return this.http.put<Blog>(this.baseurl + 'blogs' + '/' + blog._id, blog, { reportProgress: true, observe: 'events' });
    }

}
