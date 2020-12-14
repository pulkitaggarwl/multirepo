// This is a generated file
//
// If you would like to make any changes, please edit the source file (src/wings/struct/day.wings)
// and run the following command:
// plz build //src/wings/...

import { parseArray } from 'wings-ts-util';
import Place from './Place';
import { IWingsStruct } from 'wings-ts-util';

// A day of a trip.
export default class Day implements IWingsStruct {
  [key: string]: any;
  public ID: Number = -1;
  public tripID: Number = 0;
  public dayOf: Number = 0;
  public places: Place[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : -1;
      this.tripID = obj.trip_id !== undefined && obj.trip_id !== null ? obj.trip_id : 0;
      this.dayOf = obj.day_of !== undefined && obj.day_of !== null ? obj.day_of : 0;
      this.places = obj.places !== undefined && obj.places !== null ? parseArray<Place>(Place, obj.places) : [];
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'ID': {
        return 'id';
      }
      case 'tripID': {
        return 'trip_id';
      }
      case 'dayOf': {
        return 'day_of';
      }
      case 'places': {
        return 'places';
      }
      default: {
        return key;
      }
    }
  }
}
