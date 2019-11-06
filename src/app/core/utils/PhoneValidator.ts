import { ValidatorFn, AbstractControl } from '@angular/forms';

export class PhoneValidator {
    static validNumber = (): ValidatorFn => {
        return (phoneControl: AbstractControl): {[key: string]: boolean} => {
            let regexp: RegExp = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
            if(regexp.test(phoneControl.value)){
                return undefined;
            }
            else{
                return {isPhoneNumber: true};
            }
        }
    }
}