import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService, AuthService } from '../core';

export class NameErrorStateMatcher implements ErrorStateMatcher {
    public isError: boolean = false;
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return this.isError;
    }
}

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})

export class ConfirmEmailComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

    firstName = new FormControl('', []);
    lastName = new FormControl('', []);
    isCheckPolicy = false;

    displayConsentError = false;
    firstNameMatcher = new NameErrorStateMatcher();
    lastNameMatcher = new NameErrorStateMatcher();

    userProfile;
    user;

    ngOnInit() {
        if (this.authService.userProfile) {
            this.userProfile = this.authService.userProfile;
            this.userService.getUserByEmail(this.userProfile.email).then(
                result => {
                    this.user = result[0];
                },
                err => {
                    console.error(err);
                }
            );
        } else {
            this.authService.getProfile((err, profile) => {
                this.userProfile = profile;
                this.userService.getUserByEmail(this.userProfile.email).then(
                    result => {
                        this.user = result[0];
                    },
                    err => {
                        console.error(err);
                    }
                );
            });
        }
    }

    checkPolicy() {
        this.isCheckPolicy = !this.isCheckPolicy;
    }

    onFirstNameChange(value: string) {
      if (value.trim() !== '') {
        this.firstNameMatcher.isError = false;
      }
    }

    onLastNameChange(value: string) {
      if (value.trim() !== '') {
        this.lastNameMatcher.isError = false;
      }
    }

    confirmClick() {
        // Only check if the user consented to receiving info
        if (!this.isCheckPolicy) {
            this.displayConsentError = true;
            return;
        }
        this.displayConsentError = false;
        this.firstNameMatcher.isError = this.firstName.value.trim() === '';
        this.lastNameMatcher.isError = this.lastName.value.trim() === '';

        if (!this.firstNameMatcher.isError && !this.lastNameMatcher.isError) {
          this.displayConsentError = false;
          this.user.firstName = this.firstName.value.trim();
          this.user.lastName = this.lastName.value.trim();
          this.user.emailConsent = true;
          this.userService.addInfoToMailChimp(this.authService.userProfile.email, this.user.firstName, this.user.lastName)
          .then(res => {
              console.log(res);
          });
  
          this.userService.updateUser(this.user).then(
            result => {
              this.router.navigate(['convenience-fee']);
            },
            err => {
                console.error(err);
            }
          );
        }
    }
}
