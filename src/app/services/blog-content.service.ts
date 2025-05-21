import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogContent } from '../models/blog-content';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class BlogContentService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllBlogContents() {
        return this.http.get<BlogContent[]>(this.baseurl + 'blogContents');
    }

    getBlogContentById(id: string) {
        return this.http.get<BlogContent>(this.baseurl + 'blogContents' + '/' + id);
    }

    addBlogContent(blogContent: BlogContent) {
        return this.http.post(this.baseurl + 'blogContents', blogContent);
    }

    deleteBlogContent(id: string) {
        return this.http.delete(this.baseurl + 'blogContents' + '/' + id);
    }

    updateBlogContent(blogContent: BlogContent): Observable<BlogContent> {
        return this.http.put<BlogContent>(this.baseurl + 'blogContents' + '/' + blogContent._id, blogContent);
    }

}
