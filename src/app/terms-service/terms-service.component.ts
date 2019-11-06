import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertModalComponent } from '../shared/alert-modal';
import { UserService, AuthService } from '../core';

@Component({
    selector: 'app-terms-service',
    templateUrl: './terms-service.component.html',
    styleUrls: ['./terms-service.component.scss']
})
export class TermsServiceComponent implements OnInit {
    constructor(
        private router: Router,
        public dialog: MatDialog,
        private userService: UserService,
        private authService: AuthService
    ) {}

    userProfile;
    user;
    ngOnInit() {
        this.userProfile = this.authService.userProfile;
        this.userService.getUserByEmail(this.userProfile.email).then(
            result => {
                this.user = result[0];
            },
            err => {
                console.error(err);
            }
        );
    }

    acceptClick() {
        const dialogRef = this.dialog.open(AlertModalComponent, {
            width: '320px',
            data: {
                title: 'Confirmed!',
                imageUrl: '../../assets/images/confirmed_icon-150w-min.jpg',
                okButtonText: 'Next >'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.user.acceptedTermsOfService = true;
                this.userService.updateUser(this.user).then(
                    result => {
                        window.dispatchEvent(new Event('updatedUser'));
                        this.router.navigate(['congrats']);
                    },
                    err => {}
                );
            }
        });
    }

    rejectClick() {
        const dialogRef = this.dialog.open(AlertModalComponent, {
            width: '320px',
            data: {
                title: 'Sorry! You must accept our Terms of Use to use Tbbbout.',
                imageUrl: '../../assets/images/failed_icon-150w-min.jpg',
                okButtonText: 'Reconsider?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {});
    }
}
