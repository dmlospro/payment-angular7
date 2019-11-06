import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatIconModule,
  MatBadgeModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TBBBOUTDialogComponent } from './dashboard/tbbbout-dialog.component';
import { EnterPhoneComponent } from './enter-phone/enter-phone.component';
import { EnterSmsComponent } from './enter-sms/enter-sms.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConvenienceFeeComponent } from './convenience-fee/convenience-fee.component';
import { BankInfoComponent } from './bank-info/bank-info.component';
import { TermsServiceComponent } from './terms-service/terms-service.component';
import { CongratsComponent } from './congrats/congrats.component';
import { CallbackComponent } from './callback/callback.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { PaymentCheckoutComponent } from './components/payment-checkout/payment-checkout.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import { UserService } from './core';
import { SDKBrowserModule } from 'sdk';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EnterPhoneComponent,
    EnterSmsComponent,
    ConfirmEmailComponent,
    ConvenienceFeeComponent,
    BankInfoComponent,
    TermsServiceComponent,
    CongratsComponent,
    CallbackComponent,
    MyAccountComponent,
    PaymentCheckoutComponent,
    LoadingSpinnerComponent,
    TBBBOUTDialogComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SDKBrowserModule.forRoot()
  ],
  exports: [

  ],
  providers: [
    UserService
  ],
  entryComponents: [
    TBBBOUTDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
