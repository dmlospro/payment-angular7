import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, AuthService } from '../../core/services';

// const STRIPE_KEY = 'pk_live_sgS1RlkHPrXFwsrGCulyv6X2';
const STRIPE_KEY = 'pk_test_ZwyEwurhx7lzGlwtBljnYOoP';

declare var Stripe;
@Component({
    selector: 'payment-checkout',
    templateUrl: './payment-checkout.component.html',
    styleUrls: ['./payment-checkout.component.scss']
})
export class PaymentCheckoutComponent implements OnInit {
    userProfile: any;
    stripe: any;
    cardNumber: any;
    submitting: boolean;
    errors: string;

    @Input() amount: number;
    @Input() description: string;

    @Output() onBeforePayment = new EventEmitter();
    @Output() onAfterPayment = new EventEmitter();

    constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

    ngOnInit() {
        if (this.authService.userProfile) {
            this.userProfile = this.authService.userProfile;
        } else {
            this.authService.getProfile((err, profile) => {
                this.userProfile = profile;
            });
        }

        this.stripe = Stripe(STRIPE_KEY);
        const elements = this.stripe.elements();
        const options = {
            style: {
                base: {
                    fontSize: '18px',
                    '::placeholder': {
                        color: 'rgba(0, 0, 0, 0.4)',
                        fontSmoothing: 'antialiased'
                    }
                },
                invalid: {
                    color: '#f44336'
                }
            },
            classes: {
                focus: 'focused',
                empty: 'empty',
                invalid: 'invalid'
            }
        };

        this.cardNumber = elements.create('cardNumber', options);
        this.cardNumber.mount('#card-number');
        this.cardNumber.addEventListener('change', this.onChange);

        const cardExpiry = elements.create('cardExpiry', options);
        cardExpiry.mount('#card-expiry');
        cardExpiry.addEventListener('change', this.onChange);

        const cardCvc = elements.create('cardCvc', options);
        cardCvc.mount('#card-cvc');
        cardCvc.addEventListener('change', this.onChange);
    }

    onChange = (event: any) => {
        if (event.error) {
            // this.errors[event.elementType] = event.error.message;
        } else {
            // this.errors[event.elementType] = undefined;
        }
    };

    async onSubmit(form: NgForm) {
        this.onBeforePayment.emit();

        const additionalData = {
            address_city: form['city'],
            address_state: form['state'],
            address_zip: form['zip']
        };

        this.submitting = true;
        const { token, error } = await this.stripe.createToken(this.cardNumber, additionalData);

        if (error) {
            this.submitting = false;
            this.errors = 'Something is wrong';
            this.onAfterPayment.emit();
            return;
        }

        this.userService.payment(this.userProfile.email, token.id, this.amount).then(res => {
            this.submitting = false;
            if (res.status.status) {
                this.onAfterPayment.emit(true);
            } else {
                this.errors = res.status.message;
                this.onAfterPayment.emit();
            }
        });
    }
}
