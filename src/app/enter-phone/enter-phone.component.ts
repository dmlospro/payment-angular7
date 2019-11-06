import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AuthService } from '../core/services';
import { FormControl, Validators } from '@angular/forms';
import { PhoneValidator } from '../core/utils/PhoneValidator';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-enter-phone',
  templateUrl: './enter-phone.component.html',
  styleUrls: ['./enter-phone.component.scss'],
})
export class EnterPhoneComponent implements OnInit {

  user;
  phoneNumber;
  error: string = '';
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);

  phoneNumberInput = new FormControl(this.phoneNumber,
    {
      updateOn: 'change',
      validators: [
        Validators.required,
        PhoneValidator.validNumber()
      ]
    }
  );

  getErrorMessage() {
    return this.phoneNumberInput.hasError('required') ? 'You must enter a phone number.' :
    this.phoneNumberInput.hasError('isPhoneNumber') ? 'Must be a 10 digit phone number.' :
            '';
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.authService.userProfile) {
      this.user = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.user = profile;
      });
    }

    this.userService.getUserByEmail(this.authService.userProfile.email).then(
      result => {
          this.user = result[0];
          console.log(this.user.firstName);
      },
      err => {
          console.error(err);
      }
      
  );

  }

  submitForm(event) {
    if (event.keyCode === ENTER) {
      this.nextClick();
    }
  }

  nextClick() {
    this.error = '';
    if (!this.phoneNumberInput.invalid) {
      this.userService.verifyPhone(this.user.email, this.phoneNumberInput.value)
      .then(res => {
        if (!res.status.status) {
          this.error = res.status.message;
        } else {
          this.router.navigate(['enter-sms']);
        }
      });
    } else {
      this.phoneNumberInput.markAsTouched();
    }
  }
}
