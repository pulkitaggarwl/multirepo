// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user_obj.wings)
// and run the following command:
// plz build //src/wings/...

import TripBasic from './TripBasic';
import { parseArray } from 'wings-ts-util';
import UserBasic from './UserBasic';
import { IWingsStruct } from 'wings-ts-util';

// All information of a single user.
export default class UserObj implements IWingsStruct {
  [key: string]: any;
  public ID: Number = -1;
  public details: UserBasic = new UserBasic();
  public trips: TripBasic[] = [];
  public timeCreated: Date = new Date();

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : -1;
      this.details = obj.details !== undefined && obj.details !== null ? new UserBasic(obj.details) : new UserBasic();
      this.trips = obj.trips !== undefined && obj.trips !== null ? parseArray<TripBasic>(TripBasic, obj.trips) : [];
      this.timeCreated = obj.time_created !== undefined && obj.time_created !== null ? new Date(obj.time_created) : new Date();
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'ID': {
        return 'id';
      }
      case 'details': {
        return 'details';
      }
      case 'trips': {
        return 'trips';
      }
      case 'timeCreated': {
        return 'time_created';
      }
      default: {
        return key;
      }
    }
  }
}