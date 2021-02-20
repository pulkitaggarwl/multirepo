// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/trip_obj.wings)
// and run the following command:
// plz build //src/wings/...

import TripBasic from './TripBasic';
import UserBasic from './UserBasic';
import UserAccessLevel from './UserAccessLevel';
import { IWingsStruct } from 'wings-ts-util';

// All information of a single trip.
export default class TripObj implements IWingsStruct {
  [key: string]: any;
  public ID: Number = -1;
  public details: TripBasic = new TripBasic();
  public user: UserBasic = new UserBasic();
  public timeCreated: Date = new Date();
  public lastUpdated: Date = new Date();

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : -1;
      this.details = obj.details !== undefined && obj.details !== null ? new TripBasic(obj.details) : new TripBasic();
      this.user = obj.user !== undefined && obj.user !== null ? new UserBasic(obj.user) : new UserBasic();
      this.timeCreated = obj.time_created !== undefined && obj.time_created !== null ? new Date(obj.time_created) : new Date();
      this.lastUpdated = obj.last_updated !== undefined && obj.last_updated !== null ? new Date(obj.last_updated) : new Date();
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
      case 'user': {
        return 'user';
      }
      case 'timeCreated': {
        return 'time_created';
      }
      case 'lastUpdated': {
        return 'last_updated';
      }
      default: {
        return key;
      }
    }
  }
}
