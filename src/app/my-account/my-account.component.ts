import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserService, AuthService } from '../core';
import { AlertModalComponent } from '../shared/alert-modal';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
    isLoaded: boolean;
    loading: boolean;

    user;
    pin;
    firstName = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    phoneNumber;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.userService.getUserByEmail(this.authService.userProfile.email).then(
            result => {
                this.isLoaded = true;
                this.user = result[0];
                this.firstName.setValue(this.user.firstName);
                this.lastName.setValue(this.user.lastName);
                this.email.setValue(this.user.email);
                this.phoneNumber = this.user.phoneNumber;
                this.pin = this.user.pin;
            },
            err => {
                console.error(err);
            }
        );
    }

    onSave() {
        this.loading = true;
        this.user.firstName = this.firstName.value.trim();
        this.user.lastName = this.lastName.value.trim();
        this.user.email = this.email.value;
        this.userService.updateUser(this.user).then(
            result => {
                this.pin = result.pin;
                this.loading = false;
            },
            err => {
                console.error(err);
            }
        );
    }

    onRemove() {
        this.dialog
            .open(AlertModalComponent, {
                width: '320px',
                data: {
                    title: 'Do you really want to delete your account?',
                    okButtonText: 'Delete',
                    okButtonColor: 'warn',
                    cancelButtonText: 'Cancel'
                }
            })
            .afterClosed()
            .subscribe(result => {
                if (result === true) {
                    this.loading = true;
                    this.userService.deleteUser(this.user).then(
                        result => {
                            this.authService.logout();
                            this.router.navigate(['login']);
                        },
                        err => {
                            console.error(err);
                        }
                    );
                }
            });
    }
}
