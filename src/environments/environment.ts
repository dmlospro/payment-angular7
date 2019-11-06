// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:3000',
  ui_url: 'http://localhost:4200',
  auth0_domain: 'auth.tbbbout.com',
  auth0_client_id: '9GExPh6GdNvxmobbXvIA7x0nolO8GaFd',
  auth0_audience: 'https://app.tbbbout.com/api',
  auth0_callback: 'http://localhost:4200/callback',
  auth0_silentCallbackURL: '',
  plaid_key: 'fca78bd54adaf53a670cfafdb25435',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
