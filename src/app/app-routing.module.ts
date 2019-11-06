import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterPhoneComponent } from './enter-phone/enter-phone.component';
import { EnterSmsComponent } from './enter-sms/enter-sms.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConvenienceFeeComponent } from './convenience-fee/convenience-fee.component';
import { BankInfoComponent } from './bank-info/bank-info.component';
import { TermsServiceComponent } from './terms-service/terms-service.component';
import { CongratsComponent } from './congrats/congrats.component';
import { CallbackComponent } from './callback/callback.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'enter-phone',
    component: EnterPhoneComponent,
  },
  {
    path: 'enter-sms',
    component: EnterSmsComponent,
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'convenience-fee',
    component: ConvenienceFeeComponent,
  },
  {
    path: 'bank-info',
    component: BankInfoComponent,
  },
  {
    path: 'terms-service',
    component: TermsServiceComponent,
  },
  {
    path: 'congrats',
    component: CongratsComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'my-tabs',
    component: DashboardComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: false
      }
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
