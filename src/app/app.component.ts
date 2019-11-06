import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService, TabService } from './core/services';
import { environment } from '../environments/environment';
import { LoopBackConfig } from 'sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tbbbout';
  loading = true;
  isLogged = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public userService: UserService,
    public tabService: TabService
  ) {
    LoopBackConfig.setBaseURL(environment.api_url);
    authService.handleAuthentication();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.renewToken();
      this.authService.getProfile((err, profile) => {
        if (!err) {
          this.userService.getUserByEmail(profile.email).then(result => {
            const user = result[0];
            if (!user || !user.phoneVerified) {
              this.router.navigate(['enter-phone']);
            } else if (!user.emailConsent) {
              this.router.navigate(['confirm-email']);
            } else if (!user.acceptedTermsOfService) {
              this.router.navigate(['terms-service']);
            } else if (!user.paymentConfirmed) {
              this.router.navigate(['convenience-fee']);
            } else {
              this.isLogged = true;
            }
            this.loading = false;
          });
        } else {
          this.loading = false;
          this.logout();
        }
      });
    } else {
      this.loading = false;
      this.router.navigate(['login']);
    }
    
    window.addEventListener('updatedUser', () => {
      this.userService.getUserByEmail(this.authService.userProfile.email).then(result => {
        const user = result[0];
        this.isLogged = user.acceptedTermsOfService;
      });
    });
  }

  logout() {
    this.authService.logout();
    this.authService.lock.logout({
      returnTo: environment.ui_url + '/login'
    });
  }
}
