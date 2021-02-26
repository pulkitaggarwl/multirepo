// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/trip_obj.wings)
// and run the following command:
// plz build //src/wings/...

package trip

import (
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"time"
)

// TripObj - All information of a single trip.
type TripObj struct {
	ID          int             `json:"id"`
	Details     wings.TripBasic `json:"details"`
	User        wings.UserBasic `json:"user"`
	TimeCreated time.Time       `json:"time_created"`
	LastUpdated time.Time       `json:"last_updated"`
}

// GetID (istruct) - Returns the trip ID.
func (trip TripObj) GetID() int {
	return trip.ID
}

// SetID (istruct) - Sets the trip ID.
func (trip *TripObj) SetID(id int) {
	trip.ID = id
}

// TripObjs - An array of TripObj
type TripObjs []TripObj