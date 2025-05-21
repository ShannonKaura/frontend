import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from '../models/document';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllDocuments() {
        return this.http.get<Document[]>(this.baseurl + 'documents');
    }

    getDocumentById(id: string) {
        return this.http.get<Document>(this.baseurl + 'documents' + '/' + id);
    }

    getDocumentByCandidateId(id: string) {
        return this.http.get<Document>(this.baseurl + 'document-no-profile' + '/' + id);
    }

    addDocument(document: Document) {
        return this.http.post(this.baseurl + 'documents', document, { reportProgress: true, observe: 'events' });
    }

    deleteDocument(id: string) {
        return this.http.delete(this.baseurl + 'documents' + '/' + id);
    }

    updateDocument(document: Document): Observable<any> {
        return this.http.put<Document>(this.baseurl + 'documents' + '/' + document._id, document, { reportProgress: true, observe: 'events' });
    }

}
