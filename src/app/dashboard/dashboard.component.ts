import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { AuthService, UserService } from '../core/services';
import { TabService } from '../core/services/tab.service';
import { AlertModalComponent } from '../shared/alert-modal';
import { TBBBOUTDialogComponent } from './tbbbout-dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private tabService: TabService,
        public dialog: MatDialog
    ) {}

    isLoaded = false;
    tabs;
    profile:any;
    myTabsColumns: string[] = ['createdAt', 'barName', 'bartender', 'status', 'total', 'closeOut'];

    ngOnInit() {
        if (this.authService.userProfile) {
            this.getAndValidateUser();
        } else {
            this.authService.getProfile(() => this.getAndValidateUser());
        }
    }

    getAndValidateUser() {
        this.userService.getUserByEmail(this.authService.userProfile.email).then(result => {
            const user = result[0];
            if (!user || !user.phoneVerified) {
                this.router.navigate(['enter-phone']);
            } else if (!user.emailConsent) {
                this.router.navigate(['confirm-email']);
            } else if (!user.acceptedTermsOfService) {
                this.router.navigate(['terms-service']);
            } else {
                this.tabs = user.customerTabs;
                this.isLoaded = true;
            }
        });
    }

    humanizeDate(date) {
        return moment(date).format('LLL');
    }

    getTotalText(info) {
        if (info.status === 'Open') {
            return 'CLOSE OUT TO SEE TOTAL';
        }
        if (info.status === 'Closed') {
            return info.total ? `$${info.total}` : '';
        }
        return `Paid $${info.total}`;
    }

    onCloseOut(info) {
        this.dialog
            .open(AlertModalComponent, {
                width: '320px',
                data: {
                    title: 'Are you sure you want to close out your tab?',
                    okButtonText: 'Close Out',
                    cancelButtonText: 'Cancel'
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result === true) {
                    this.tabService.updateStatus(info.id, 'Closed', location.href).then(res => {
                      this.getAndValidateUser();
                    });
                }
            });
    }

    onTBBBOUT(info) {
        this.dialog
            .open(TBBBOUTDialogComponent, {
                width: '500px',
                data: {
                    amount: info.total
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result === true) {
                    this.tabService.updateStatus(info.id, 'TBBBOUT', location.href).then(res => {
                        this.getAndValidateUser();
                      });
                }
            });
    }
}
