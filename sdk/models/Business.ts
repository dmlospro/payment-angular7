/* tslint:disable */
import {
  User,
  Tab
} from '../index';

declare var Object: any;
export interface BusinessInterface {
  "businessName": string;
  "streetAddress": string;
  "city": string;
  "state": string;
  "zipCode": string;
  "taxId": string;
  "businessPhone"?: string;
  "acceptedConsent"?: boolean;
  "id"?: number;
  "ownerId"?: number;
  owner?: User;
  employees?: User[];
  tabs?: Tab[];
}

export class Business implements BusinessInterface {
  "businessName": string;
  "streetAddress": string;
  "city": string;
  "state": string;
  "zipCode": string;
  "taxId": string;
  "businessPhone": string;
  "acceptedConsent": boolean;
  "id": number;
  "ownerId": number;
  owner: User;
  employees: User[];
  tabs: Tab[];
  constructor(data?: BusinessInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Business`.
   */
  public static getModelName() {
    return "Business";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Business for dynamic purposes.
  **/
  public static factory(data: BusinessInterface): Business{
    return new Business(data);
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
      name: 'Business',
      plural: 'Businesses',
      path: 'Businesses',
      idName: 'id',
      properties: {
        "businessName": {
          name: 'businessName',
          type: 'string'
        },
        "streetAddress": {
          name: 'streetAddress',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "zipCode": {
          name: 'zipCode',
          type: 'string'
        },
        "taxId": {
          name: 'taxId',
          type: 'string'
        },
        "businessPhone": {
          name: 'businessPhone',
          type: 'string'
        },
        "acceptedConsent": {
          name: 'acceptedConsent',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'number'
        },
      },
      relations: {
        owner: {
          name: 'owner',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
          keyTo: 'id'
        },
        employees: {
          name: 'employees',
          type: 'User[]',
          model: 'User',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'employeeBusinessId'
        },
        tabs: {
          name: 'tabs',
          type: 'Tab[]',
          model: 'Tab',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'businessId'
        },
      }
    }
  }
}
