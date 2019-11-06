import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthService,
  UserService,
  TabService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    UserService,
    TabService
  ],
  declarations: []
})
export class CoreModule { }
