import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogImage } from '../models/blog-image';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class BlogImageService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllBlogImages() {
        return this.http.get<BlogImage[]>(this.baseurl + 'blog-images');
    }

    getBlogImageById(id: string) {
        return this.http.get<BlogImage>(this.baseurl + 'blog-images' + '/' + id);
    }

    addBlogImage(blogImage: BlogImage) {
        return this.http.post(this.baseurl + 'blog-images', blogImage, { reportProgress: true, observe: 'events' });
    }

    deleteBlogImage(id: string) {
        return this.http.delete(this.baseurl + 'blog-images' + '/' + id);
    }

    updateBlogImage(blogImage: BlogImage): Observable<any> {
        return this.http.put<BlogImage>(this.baseurl + 'blog-images' + '/' + blogImage._id, blogImage, { reportProgress: true, observe: 'events' });
    }

}
