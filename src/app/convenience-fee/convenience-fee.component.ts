import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../core';

@Component({
    selector: 'app-convenience-fee',
    templateUrl: './convenience-fee.component.html',
    styleUrls: ['./convenience-fee.component.scss']
})
export class ConvenienceFeeComponent {
    loading = true;

    constructor(private router: Router, private authService: AuthService, private userService: UserService) {}
    ngOnInit() {
        if (this.authService.isAuthenticated()) {
        this.authService.getProfile((err, profile) => {
            if (!err) {
            this.userService.getUserByEmail(profile.email).then(result => {
                const user = result[0];
                if (user.paymentConfirmed) {
                this.router.navigate(['my-tabs']);
                } else {
                this.loading = false;
                console.log("Payment Not Verified");
                }
            });
            } else {
            this.loading = false;
            }
        });
        } else {
        this.router.navigate(['login'])
        }
    }

    onResult(suceess) {
        if (suceess) {
            this.router.navigate(['terms-service']);
        }
    }
}
