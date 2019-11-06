import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDialogModule,
  MatDialog,
} from '@angular/material';

import { CustomButtonComponent } from './buttons';
import { PhoneInputComponent } from './phone-input';
import { AlertModalComponent } from './alert-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
  ],
  declarations: [
    CustomButtonComponent,
    PhoneInputComponent,
    AlertModalComponent,
  ],
  exports: [
    CommonModule,

    CustomButtonComponent,
    PhoneInputComponent,
    AlertModalComponent,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
  ],
  entryComponents: [
    AlertModalComponent,
  ],
})
export class SharedModule {}
