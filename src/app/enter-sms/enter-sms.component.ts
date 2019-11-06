import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AuthService } from '../core/services';
import { FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-enter-sms',
  templateUrl: './enter-sms.component.html',
  styleUrls: ['./enter-sms.component.scss']
})
export class EnterSmsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  user;
  userProfile;
  smsCode;

  smsInput = new FormControl(this.smsCode,
    {
      updateOn: 'change',
      validators: [
        Validators.required
      ]
    }
  );

  getErrorMessage() {
    return this.smsInput.hasError('required') ? 'You must enter a code.' :
    this.smsInput.hasError('minlength') ? 'Must be a 4 character code.' :
    this.smsInput.hasError('notConfirmed') ? 'Unable to confirm code.' :
            '';
  }

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

  submitForm(event) {
    if (event.keyCode === ENTER) {
      this.confirmClick();
    }
  }

  confirmClick() {
    if (!this.smsInput.invalid) {
      this.userService.confirmCode(this.user.email, this.user.phoneNumber, this.smsInput.value)
      .then(res => {
        if (!res.status.status) {
          const error: ValidationErrors = { notConfirmed: true };
          // this.smsInput.setErrors(error);
          this.getErrorMessage();
        } else {
          this.router.navigate(['confirm-email']);
        }
      });
    } else {
      this.getErrorMessage();
    }
  }

}
