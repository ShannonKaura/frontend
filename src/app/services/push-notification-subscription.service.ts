import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PushNotificationSubscription } from '../models/push-notification-subscription';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class PushNotificationSubscriptionService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';

    constructor(private http: HttpClient) { }

    getAllPushNotificationSubscriptions() {
        return this.http.get<PushNotificationSubscription[]>(this.baseurl + 'push-notification-subscriptions');
    }

    getPushNotificationSubscriptionById(id: string) {
        return this.http.get<PushNotificationSubscription>(this.baseurl + 'push-notification-subscriptions' + '/' + id);
    }

    getPushNotificationSubscriptionByUserId(id: string) {
        return this.http.get<PushNotificationSubscription>(this.baseurl + 'push-notification-subscriptions-user-id' + '/' + id);
    }

    addPushNotificationSubscription(pushNotification: PushNotificationSubscription) {
        return this.http.post(this.baseurl + 'push-notification-subscriptions', pushNotification);
    }

    deletePushNotificationSubscription(id: string) {
        return this.http.delete(this.baseurl + 'push-notification-subscriptions' + '/' + id);
    }

    updatePushNotificationSubscription(pushNotification: PushNotificationSubscription): Observable<PushNotificationSubscription> {
        return this.http.put<PushNotificationSubscription>(this.baseurl + 'push-notification-subscriptions' + '/' + pushNotification._id, pushNotification);
    }

}
