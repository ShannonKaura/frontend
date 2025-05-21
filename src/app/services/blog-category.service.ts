import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogCategory } from '../models/blog-category';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class BlogCategoryService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllBlogCategorys() {
        return this.http.get<BlogCategory[]>(this.baseurl + 'blog-categories');
    }

    getBlogCategoryById(id: string) {
        return this.http.get<BlogCategory>(this.baseurl + 'blog-categories' + '/' + id);
    }

    addBlogCategory(blogCategory: BlogCategory) {
        return this.http.post(this.baseurl + 'blog-categories', blogCategory);
    }

    deleteBlogCategory(id: string) {
        return this.http.delete(this.baseurl + 'blog-categories' + '/' + id);
    }

    updateBlogCategory(blogCategory: BlogCategory): Observable<BlogCategory> {
        return this.http.put<BlogCategory>(this.baseurl + 'blog-categories' + '/' + blogCategory._id, blogCategory);
    }

}
