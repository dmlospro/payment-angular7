/* tslint:disable */
import {
  User,
  Business
} from '../index';

declare var Object: any;
export interface TabInterface {
  "status": string;
  "total"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "id"?: number;
  "customerId"?: number;
  "employeeId"?: number;
  "businessId"?: number;
  customer?: User;
  employee?: User;
  business?: Business;
}

export class Tab implements TabInterface {
  "status": string;
  "total": number;
  "createdAt": Date;
  "updatedAt": Date;
  "id": number;
  "customerId": number;
  "employeeId": number;
  "businessId": number;
  customer: User;
  employee: User;
  business: Business;
  constructor(data?: TabInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Tab`.
   */
  public static getModelName() {
    return "Tab";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Tab for dynamic purposes.
  **/
  public static factory(data: TabInterface): Tab{
    return new Tab(data);
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
      name: 'Tab',
      plural: 'Tabs',
      path: 'Tabs',
      idName: 'id',
      properties: {
        "status": {
          name: 'status',
          type: 'string'
        },
        "total": {
          name: 'total',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date',
          default: new Date(0)
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "customerId": {
          name: 'customerId',
          type: 'number'
        },
        "employeeId": {
          name: 'employeeId',
          type: 'number'
        },
        "businessId": {
          name: 'businessId',
          type: 'number'
        },
      },
      relations: {
        customer: {
          name: 'customer',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'customerId',
          keyTo: 'id'
        },
        employee: {
          name: 'employee',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'employeeId',
          keyTo: 'id'
        },
        business: {
          name: 'business',
          type: 'Business',
          model: 'Business',
          relationType: 'belongsTo',
                  keyFrom: 'businessId',
          keyTo: 'id'
        },
      }
    }
  }
}
