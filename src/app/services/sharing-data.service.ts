import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharingDataService {
    public applicationInfo = new BehaviorSubject({});
    public currentApplicationInfo = this.applicationInfo.asObservable();

    constructor() {

    }

    changeApplicationInfo(data: {}) {
        this.applicationInfo.next(data);
    }
}