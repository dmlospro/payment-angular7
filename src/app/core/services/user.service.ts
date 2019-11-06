import { Injectable } from '@angular/core';
import { UserApi, User, LoopBackFilter } from 'sdk';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(
        private userApi: UserApi,
    ) {
    }

    user;

    createUser(user) {
        return this.userApi.create<User>(user)
            .toPromise();
    }

    getUsers() {
        return this.userApi.find()
            .toPromise();
    }

    deleteUser(user) {
        return this.userApi.deleteById<User>(user.id)
            .toPromise();
    }

    updateUser(user) {
        return this.userApi.updateAttributes<User>(user.id, user)
            .toPromise();
    }

    getUserByEmail(userEmail) {
        const filter: LoopBackFilter = {
            where: {
                email: userEmail
            },
            include: 'customerTabs'
        };

        return this.userApi.find<User>(filter)
            .toPromise();
    }

    getUserById(userId) {
        return this.userApi.findById(userId)
            .toPromise();
    }

    verifyPhone(userEmail, phoneNumber) {
      return this.userApi.verifyPhone(userEmail, phoneNumber).toPromise();
    }

    addInfoToMailChimp(userEmail, firstName, lastName) {
        return this.userApi.addInfoToMailChimp(userEmail, firstName, lastName).toPromise();
    }
    confirmCode(userEmail, phoneNumber, code) {
      return this.userApi.confirmCode(userEmail, phoneNumber, code).toPromise();
    }

    payment(email, token, amount) {
      return this.userApi.payment(email, token, amount).toPromise();
    }
}
