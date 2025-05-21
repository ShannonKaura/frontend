import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { PushNotificationSubscription } from '../models/push-notification-subscription';
import { PushNotificationSubscriptionService } from './push-notification-subscription.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {

    //server host api link
    private baseurl = 'https://youprocareers.co.uk/app/api/';
    public pushNotificationSubscription: PushNotificationSubscription = {
        _id: "",
        user_id: "",
        subscription: [],
        created_date: new Date(Date.now()).getTime(), //timestamp
        modified_date: "",
    };

    constructor(
        private http: HttpClient,
        private _swPush: SwPush,
        private pushNotificationSubscriptionService: PushNotificationSubscriptionService
    ) { }

    MakePushNotificationSubscription() {
        this._swPush.requestSubscription({
            serverPublicKey: 'BOF3IznWk8_70TRuAMYx7Qt9khx-MMK78norWYPhnRs2fjXLHtlSysBDJEjJmm6wp0xiA9eE50CXVBR3orpfxG8'
        }).then((subscription) => {
            this.pushNotificationSubscription.subscription.push(JSON.stringify(subscription));

            // add subscription to the db
            this.pushNotificationSubscriptionService.addPushNotificationSubscription(this.pushNotificationSubscription).subscribe(() => {
            })
        }).catch((_) => console.log);
    }

    requestSubscription = (user_id: any) => {

        this.pushNotificationSubscription.user_id = user_id;

        if (!this._swPush.isEnabled) {
            console.log("Notification is not enabled.");
            return;
        } else {
            // check if user has already subscribed
            this.pushNotificationSubscriptionService.getPushNotificationSubscriptionByUserId(user_id).subscribe((returned: any) => {
                if (returned.subscription_availability === false) {
                    this.MakePushNotificationSubscription();
                } else {
                    this._swPush.requestSubscription({
                        serverPublicKey: 'BOF3IznWk8_70TRuAMYx7Qt9khx-MMK78norWYPhnRs2fjXLHtlSysBDJEjJmm6wp0xiA9eE50CXVBR3orpfxG8'
                    }).then((subscription) => {
                        // check if subscription already exits
                        if (returned.subscription.includes(JSON.stringify(subscription))) {
                            console.log('push notification subscription already exists')
                        } else {
                            returned.subscription.push(JSON.stringify(subscription));

                            this.pushNotificationSubscriptionService.updatePushNotificationSubscription(returned).subscribe(() => {
                                console.log("push notification subscription updated")
                            })
                        }
                    }).catch((_) => console.log);
                }
            })
        }
    };

}
