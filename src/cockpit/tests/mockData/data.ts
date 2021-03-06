import City from "@/wings/City";
import Day from "@/wings/Day";
import Place from "@/wings/Place";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";
import UserBasic from "@/wings/UserBasic";
import UserObj from "@/wings/UserObj";

export class mockUserBasic {
  public readonly ID: number;
  public readonly name: string;
  public readonly email: string;
  public readonly bio: string;
  public readonly raw: Record<string, unknown>;
  public readonly userBasic: UserBasic;

  constructor() {
    this.ID = 73426598;
    this.name = "New guy";
    this.email = "somenewguy@email.com";
    this.bio = "Hi, I'm a new guy lurking on here";
    this.raw = {
      id: this.ID,
      name: this.name,
      email: this.email,
      bio: this.bio,
      confirmed: true,
    };
    this.userBasic = new UserBasic(this.raw);
  }
}

export class mockUserObj {
  public readonly ID: number;
  public readonly timeCreated: Date;
  public readonly lastUpdated: Date;
  public readonly user: UserObj;

  constructor() {
    this.ID = 73426598;
    this.timeCreated = new Date();
    this.lastUpdated = new Date();
    this.user = new UserObj({
      id: this.ID,
      details: new mockUserBasic().raw,
      trips: [new mockTripBasic().raw],
      time_created: this.timeCreated,
      last_updated: this.lastUpdated,
    });
  }
}

export class mockPlace {
  public readonly ID: number;
  public readonly label: string;
  public readonly URL: string;
  public readonly description: string;
  public readonly raw: Record<string, unknown>;
  public readonly place: Place;

  constructor() {
    this.ID = 9999;
    this.label = "LabelString";
    this.URL = "PlaceURL";
    this.description = "some words";
    this.raw = {
      id: this.ID,
      label: this.label,
      url: this.URL,
      description: this.description,
    };
    this.place = new Place(this.raw);
  }
}

export class mockDay {
  public readonly ID: number;
  public readonly tripID: number;
  public readonly dayOf: number;
  public readonly places: Place[];
  public readonly raw: Record<string, unknown>;
  public readonly day: Day;

  constructor() {
    this.ID = 23489723;
    this.tripID = 845357023;
    this.dayOf = 1;
    this.places = [new mockPlace().place];
    this.raw = {
      id: this.ID,
      trip_id: this.tripID,
      day_of: this.dayOf,
      places: [new mockPlace().raw],
    };
    this.day = new Day();
  }
}

export class mockTripBasic {
  public readonly ID: number;
  public readonly name: string;
  public readonly cities: City[];
  public readonly days: Day[];
  public readonly description: string;
  public readonly raw: Record<string, unknown>;
  public readonly tripBasic: TripBasic;

  constructor() {
    this.ID = 99999;
    this.name = "The magical journey";
    this.cities = [City.SanJoseCAUS];
    this.days = [new mockDay().day];
    this.description = "??\\_(???)_/??";
    this.raw = {
      id: this.ID,
      name: this.name,
      cities: this.cities,
      days: [new mockDay().raw],
      description: this.description,
    };
    this.tripBasic = new TripBasic(this.raw);
  }
}

export class mockTripObj {
  public readonly ID: number;
  public readonly timeCreated: Date;
  public readonly lastUpdated: Date;
  public readonly raw: Record<string, unknown>;
  public readonly trip: TripObj;

  constructor() {
    this.ID = 99999;
    this.timeCreated = new Date();
    this.lastUpdated = new Date();
    this.raw = {
      id: this.ID,
      user: new mockUserBasic().raw,
      details: new mockTripBasic().raw,
      time_created: this.timeCreated,
      last_updated: this.lastUpdated,
    };
    this.trip = new TripObj(this.raw);
  }
}
