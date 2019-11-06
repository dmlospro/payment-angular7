import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AuthService } from '../core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  userProfile;
  user;
  pin;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.userProfile = this.authService.userProfile;
      this.userService.getUserByEmail(this.userProfile.email).then(
        result => {
          this.user = result[0];
          this.pin = this.user.pin;
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
            this.pin = this.user.pin;
          },
          err => {
            console.error(err);
          }
        );
      });
    }
  }

  nextClick() {
    this.router.navigate(['my-tabs']);
  }
}
