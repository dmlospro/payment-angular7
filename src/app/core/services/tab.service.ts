import { Injectable } from '@angular/core';
import { TabApi, Tab, LoopBackFilter } from 'sdk';

@Injectable({
  providedIn: 'root',
})
export class TabService {
    constructor(
        private tabApi: TabApi,
    ) {
    }

    getCustomerTabs(user) {
        const filter: LoopBackFilter = {
            where: {
                customerId: user.id
            }
        };
        return this.tabApi.find<Tab>(filter)
            .toPromise();
    }

    updateTab(data) {
        return this.tabApi.updateAttributes<Tab>(data.id, data)
            .toPromise();
    }

    deleteTag(data) {
        return this.tabApi.deleteById<Tab>(data.id)
            .toPromise();
    }

    updateStatus(id, status, url) {
        return this.tabApi.updateStatus(id, status, url).toPromise();
    }
}