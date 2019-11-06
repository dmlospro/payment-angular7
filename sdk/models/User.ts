/* tslint:disable */
import {
  Tab,
  Business
} from '../index';

declare var Object: any;
export interface UserInterface {
  "firstName"?: string;
  "lastName"?: string;
  "email": string;
  "phoneNumber"?: string;
  "phoneVerified"?: boolean;
  "paymentConfirmed"?: boolean;
  "emailConsent"?: boolean;
  "enteredBusinessInfo"?: boolean;
  "usersInvited"?: boolean;
  "paymentDisclaimerAccepted"?: boolean;
  "acceptedTermsOfService"?: boolean;
  "pin"?: string;
  "bankAccountToken"?: string;
  "role"?: string;
  "id"?: number;
  "employeeBusinessId"?: number;
  customerTabs?: Tab[];
  employeeTabs?: Tab[];
  business?: Business;
  employeeBusiness?: Business;
}

export class User implements UserInterface {
  "firstName": string;
  "lastName": string;
  "email": string;
  "phoneNumber": string;
  "phoneVerified": boolean;
  "paymentConfirmed": boolean;
  "emailConsent": boolean;
  "enteredBusinessInfo": boolean;
  "usersInvited": boolean;
  "paymentDisclaimerAccepted": boolean;
  "acceptedTermsOfService": boolean;
  "pin": string;
  "bankAccountToken": string;
  "role": string;
  "id": number;
  "employeeBusinessId": number;
  customerTabs: Tab[];
  employeeTabs: Tab[];
  business: Business;
  employeeBusiness: Business;
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'User',
      plural: 'users',
      path: 'users',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "phoneNumber": {
          name: 'phoneNumber',
          type: 'string'
        },
        "phoneVerified": {
          name: 'phoneVerified',
          type: 'boolean',
          default: false
        },
        "paymentConfirmed": {
          name: 'paymentConfirmed',
          type: 'boolean',
          default: false
        },
        "emailConsent": {
          name: 'emailConsent',
          type: 'boolean',
          default: false
        },
        "enteredBusinessInfo": {
          name: 'enteredBusinessInfo',
          type: 'boolean',
          default: false
        },
        "usersInvited": {
          name: 'usersInvited',
          type: 'boolean',
          default: false
        },
        "paymentDisclaimerAccepted": {
          name: 'paymentDisclaimerAccepted',
          type: 'boolean',
          default: false
        },
        "acceptedTermsOfService": {
          name: 'acceptedTermsOfService',
          type: 'boolean',
          default: false
        },
        "pin": {
          name: 'pin',
          type: 'string'
        },
        "bankAccountToken": {
          name: 'bankAccountToken',
          type: 'string'
        },
        "role": {
          name: 'role',
          type: 'string',
          default: 'customer'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "employeeBusinessId": {
          name: 'employeeBusinessId',
          type: 'number'
        },
      },
      relations: {
        customerTabs: {
          name: 'customerTabs',
          type: 'Tab[]',
          model: 'Tab',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'customerId'
        },
        employeeTabs: {
          name: 'employeeTabs',
          type: 'Tab[]',
          model: 'Tab',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'employeeId'
        },
        business: {
          name: 'business',
          type: 'Business',
          model: 'Business',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'ownerId'
        },
        employeeBusiness: {
          name: 'employeeBusiness',
          type: 'Business',
          model: 'Business',
          relationType: 'belongsTo',
                  keyFrom: 'employeeBusinessId',
          keyTo: 'id'
        },
      }
    }
  }
}
