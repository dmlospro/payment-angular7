/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Tab } from '../../models/Tab';
import { Business } from '../../models/Business';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Tab: Tab,
    Business: Business,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
