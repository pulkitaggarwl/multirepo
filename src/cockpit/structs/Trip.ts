/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/trip.struct
 */

import { IWingsStruct } from 'wings-ts-util';
import Place from './Place';
import City from '../enums/City';

export default class Trip implements IWingsStruct {
    [key: string]: any;
    public id: number = -1;
    public userId: number = -1;
    public name: string = '';
    public location: City = City.UNKNOWN;
    public places: Place[] = [];
    public description: string = '';
    public timeCreated: Date = new Date();
    public lastUpdated: Date = new Date();

    public init(data: any): boolean {
        try {
            this.id = data.id;
            this.userId = data.user_id;
            this.name = data.name;
            this.location = data.location;

            if (data.places !== null) {
                this.places = data.places;
            }
            this.description = data.description;
            this.timeCreated = new Date(data.time_created);
            this.lastUpdated = new Date(data.last_updated);
        } catch (e) {
            return false;
        }
        return true;
    }

    public toJsonKey(key: string): string {
        switch (key) {
            case 'id': {
                return 'id';
            }
            case 'userId': {
                return 'user_id';
            }
            case 'name': {
                return 'name';
            }
            case 'location': {
                return 'location';
            }
            case 'places': {
                return 'places';
            }
            case 'description': {
                return 'description';
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

    public parse(data: any): void {
        this.userId = data.user_id;
        this.location = data.location;
    }
}
