import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllNotifications() {
        return this.http.get<Notification[]>(this.baseurl + 'notifications');
    }

    getNotificationById(id: string) {
        return this.http.get<Notification>(this.baseurl + 'notifications' + '/' + id);
    }

    addNotification(notification: Notification) {
        return this.http.post(this.baseurl + 'notifications', notification);
    }

    deleteNotification(id: string) {
        return this.http.delete(this.baseurl + 'notifications' + '/' + id);
    }

    updateNotification(notification: Notification): Observable<Notification> {
        return this.http.put<Notification>(this.baseurl + 'notifications' + '/' + notification._id, notification);
    }

}
