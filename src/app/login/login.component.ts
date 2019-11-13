import { Component, ChangeDetectorRef, OnInit, NgZone } from '@angular/core';
import { AuthService, UserService } from '../core/services';
import { Router } from '@angular/router';
import { Auth0Lock } from 'auth0-lock';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  title = 'app';
  user;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['my-tabs']);
    } else {
      this.showLoginUI();
    }
  }

  showLoginUI() {
    const self = this;
    const lock = new Auth0Lock(
      environment.auth0_client_id,
      environment.auth0_domain,
      {
        configurationBaseUrl: 'https://cdn.auth0.com',
        container: 'hiw-login-container',
        auth: {
          redirectUrl: environment.auth0_callback,
          responseType: 'token id_token'
        },
        additionalSignUpFields: [
          {
            name: 'firstName',
            placeholder: 'Enter your first name',
            validator: (firstName) => {
              console.log(firstName);
              localStorage.setItem("firstName", firstName);
              console.log(localStorage.getItem("firstName"))
              return {
                valid: firstName.length > 0,
                hint: 'First name cannot be empty!' // optional
              };
            }
          },
          {
            name: 'lastName',
            placeholder: 'Enter your last name',
            validator: (lastName) => {
              return {
                valid: lastName.length > 0,
                hint: 'Last name cannot be empty!' // optional
              };
            }
          }
        ],
        theme: {
          logo: 'https://www.vandalssmile.com/wp-content/uploads/2019/03/tbbbout-vertical-logo-400px-X-400px.png',
          primaryColor: '#028b08'
        },
        // socialButtonStyle: 'small',
        languageDictionary: {
          title: 'Log In'
        },
        // allowShowPassword: true,
        // allowForgotPassword: true,
        // allowSignUp: false,
        // allowLogin: false,
        // closable: true,
      }
    );
    lock.on('authenticated', (authResult) => {
      this.authService.setSession(authResult);
      self.router.navigate(['my-tabs']);
    });
    // lock.show();
  }

}
