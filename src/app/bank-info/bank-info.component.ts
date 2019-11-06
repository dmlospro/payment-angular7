import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  accountName = new FormControl('', [Validators.required]);
  accountNumber = new FormControl('', [Validators.required]);
  routingNumber = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  confirmClick() {
    if (!this.accountName.invalid && !this.accountNumber.invalid && !this.routingNumber.invalid) {
      this.router.navigate(['terms-service']);
    }
  }

  getErrorMessage(value) {
    return this[value].hasError('required') ? 'You must enter a value' : '';
  }

}
