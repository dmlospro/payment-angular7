import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import * as auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userProfile: any;
  refreshSubscription: any;
  requestedScopes: string = 'openid profile';

  auth0 = new auth0.WebAuth({
    clientID: environment.auth0_client_id,
    domain: environment.auth0_domain,
    responseType: 'token id_token',
    audience: environment.auth0_audience,
    redirectUri: environment.auth0_callback,
    scope: this.requestedScopes,
    leeway: 30
  });
  
  lock = new Auth0Lock(
    environment.auth0_client_id,
    environment.auth0_domain,
    {
      configurationBaseUrl: 'https://cdn.auth0.com',
    }
  );

  constructor(
    public router: Router,
    private userService: UserService,
  ) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    const self = this;
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.userService
          .getUserByEmail(authResult.idTokenPayload.email)
          .then(user => {
            if (user.length === 0) {
              this.userService.createUser({
                email: authResult.idTokenPayload.email,
              })
              .then(() => {
                self.setSession(authResult);
                self.router.navigate(['my-tabs']);
              }, err => {});
            } else {
              self.setSession(authResult);
              self.router.navigate(['my-tabs']);
            }
          });
      } else if (err) {
        self.router.navigate(['my-tabs']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    } 

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public renewToken() {
    this.auth0.renewAuth({
      audience: environment.auth0_audience,
      redirectUri: environment.auth0_silentCallbackURL,
      usePostMessage: true
    }, (err, result) => {
      if (err) {
        // alert(`Could not get a new token using silent authentication (${err.error}).`);
      } else {
        // alert(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) {
      return;
    }

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = of(expiresAt).pipe(mergeMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        const refreshAt = expiresAt - (1000 * 30); // Refresh 30 seconds before expiry
        return timer(Math.max(1, refreshAt - now));
      }));

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) {
      return;
    }
    this.refreshSubscription.unsubscribe();
  }
}
