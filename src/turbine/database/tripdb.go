/*
 * DO NOT CALL ANY OF THESE FUNCTIONS DIRECTLY.
 * They should only be used by handlers or inside the database class.
 *
 * TODO: Add additional wrapper around these functions for additional layer of vetting
 */

package database

import (
	"database/sql"
	"strconv"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	"github.com/lib/pq"
)

// AddTripDB - Adding new trip into the database.
func AddTripDB(newTrip structs.IStructs) int {
	trip, ok := newTrip.(*wings.Trip)
	if !ok {
		logger.Print(
			logger.Database,
			"Trip add failed since interface passed in is not a trip.",
		)
		return -1
	}

	newTripID := addTrip(*trip)
	user := getUserWithID(trip.UserID)
	if user.ID == -1 {
		logger.Print(
			logger.Database,
			"User adding the new trip is not found.",
		)
		return failAddingTripToUser(newTripID)
	}

	user.Trips = append(user.Trips, newTripID)
	if ok = updateUser(user); !ok {
		logger.Print(
			logger.Database,
			"Fail to add trip id to new user.",
		)
		return failAddingTripToUser(newTripID)
	}

	return newTripID
}

// GetTripDB - Retrieve trip information from database with ID.
func GetTripDB(id int) structs.IStructs {
	var trip wings.Trip = fetchTrip(id)
	return &trip
}

// UpdateTripDB - Update trip information back into the database.
func UpdateTripDB(updatedTrip structs.IStructs) bool {
	trip, ok := updatedTrip.(*wings.Trip)
	if !ok {
		logger.Print(
			logger.Database,
			"Trip update failed since interface passed in is not a trip.",
		)
		return false
	}

	existingTrip, _ := GetTripDB(updatedTrip.GetID()).(*wings.Trip)
	if existingTrip.UserID != trip.UserID {
		logger.Print(
			logger.Database,
			"Update request comes from a different user than the original trip owner",
		)
		return false
	}

	return updateTrip(*trip)
}

// DeleteTripDB - Delete trip from the database.
func DeleteTripDB(existingTrip structs.IStructs) bool {
	trip, ok := existingTrip.(*wings.Trip)
	if !ok {
		logger.Print(
			logger.Database,
			"Trip deletion failed since interface passed in is not a trip.",
		)
		return false
	}

	existingTrip = GetTripDB(trip.GetID())

	if existingTrip.GetID() == -1 {
		return false
	}

	//TODO: More testing to make sure this is the same trip
	return deleteTripWithID(
		trip.GetID(),
	) && deleteTripFromUserDB(
		trip.GetID(),
		trip.UserID,
	)
}

func addTrip(newTrip wings.Trip) int {
	for index, day := range newTrip.Days {
		dayID := addDay(day)
		newTrip.Days[index].ID = dayID
	}
	sqlStatement := `
		INSERT INTO trips (userid, name, cities, description, days, time_created, last_updated)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id`
	id := 0
	err := db.QueryRow(
		sqlStatement,
		newTrip.UserID,
		newTrip.Name,
		pq.Array(cityEnumArrayToIDs(newTrip.Cities)),
		newTrip.Description,
		pq.Array(daysToIDArray(newTrip.Days)),
		newTrip.TimeCreated,
		newTrip.LastUpdated,
	).Scan(&id)

	if err != nil {
		logger.Err(logger.Database, err, "")
		return -1
	}
	logger.Print(
		logger.Database,
		"New trip ID is: "+strconv.Itoa(id),
	)
	return id
}

func addDay(newDay wings.Day) int {
	for index, place := range newDay.Places {
		placeID := addPlace(place)
		newDay.Places[index].ID = placeID
	}
	sqlStatement := `
		INSERT INTO days (trip_id, day_of, places)
		VALUES($1, $2, $3)
		RETURNING id`
	id := 0
	err := db.QueryRow(
		sqlStatement,
		newDay.TripID,
		newDay.DayOf,
		pq.Array(placesToIDArray(newDay.Places)),
	).Scan(&id)

	if err != nil {
		logger.Failure(logger.Database, "Failed to add new day.")
		return -1
	}
	logger.Print(
		logger.Database,
		"New day ID is: "+strconv.Itoa(id),
	)
	return id
}

func addPlace(newPlace wings.Place) int {
	sqlStatement := `
		INSERT INTO places (label, url, description)
		VALUES($1, $2, $3)
		RETURNING id`
	id := 0
	err := db.QueryRow(
		sqlStatement,
		newPlace.Label,
		newPlace.URL,
		newPlace.Description,
	).Scan(&id)

	if err != nil {
		logger.Failure(logger.Database, "Failed to add new day.")
		return -1
	}
	logger.Print(
		logger.Database,
		"New place ID is: "+strconv.Itoa(id),
	)
	return id
}

func fetchTrip(id int) wings.Trip {
	var trip wings.Trip
	var days []int64
	var cities []int64
	sqlStatement := `
		SELECT id, userid, name, cities, description, days, time_created, last_updated
		FROM trips WHERE id=$1;`
	row := db.QueryRow(sqlStatement, id)
	switch err := row.Scan(
		&trip.ID,
		&trip.UserID,
		&trip.Name,
		pq.Array(&cities),
		&trip.Description,
		pq.Array(&days),
		&trip.TimeCreated,
		&trip.LastUpdated,
	); err {
	case sql.ErrNoRows:
		logger.Print(logger.Database, "Trip not found.")
		trip.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	trip.Cities = cityIDsToEnumArray(cities)
	trip.Days = fetchDays(days)
	return trip
}

func fetchDays(ids []int64) wings.Days {
	var days wings.Days = make([]wings.Day, len(ids))
	for index, id := range ids {
		days[index] = fetchDay(id)
	}
	return days
}

func fetchDay(id int64) wings.Day {
	var day wings.Day
	var places []int64
	sqlStatement := `
		SELECT id, trip_id, day_of, places
		FROM days WHERE id=$1;`
	row := db.QueryRow(sqlStatement, id)
	switch err := row.Scan(
		&day.ID,
		&day.TripID,
		&day.DayOf,
		pq.Array(&places),
	); err {
	case sql.ErrNoRows:
		logger.Print(
			logger.Database,
			"Day "+strconv.FormatInt(id, 10)+" not found.",
		)
		day.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}
	day.Places = fetchPlaces(places)
	return day
}

func fetchPlaces(ids []int64) wings.Places {
	var places wings.Places = make([]wings.Place, len(ids))
	for index, id := range ids {
		places[index] = fetchPlace(id)
	}
	return places
}

func fetchPlace(id int64) wings.Place {
	var place wings.Place
	sqlStatement := `
		SELECT id, label, url, description
		FROM places WHERE id=$1;`
	row := db.QueryRow(sqlStatement, id)
	switch err := row.Scan(
		&place.ID,
		&place.Label,
		&place.URL,
		&place.Description,
	); err {
	case sql.ErrNoRows:
		logger.Print(
			logger.Database,
			"Place "+strconv.FormatInt(id, 10)+" not found.",
		)
		place.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}
	return place
}

func updateTrip(updatedTrip wings.Trip) bool {
	existingTrip := GetTripDB(updatedTrip.GetID())
	if existingTrip.GetID() != updatedTrip.GetID() {
		logger.Print(
			logger.Database,
			"Existing Trip is not found. Aborting update.",
		)
		logger.Print(
			logger.Database,
			"Given ID is "+strconv.Itoa(updatedTrip.GetID())+
				" but found ID is "+strconv.Itoa(existingTrip.GetID())+
				" instead.")
		return false
	}

	for index, day := range updatedTrip.Days {
		if updateDay(&day, true) {
			updatedTrip.Days[index] = day
		} else {
			logger.Failure(
				logger.Database,
				"Failed to update a day in trip "+strconv.Itoa(updatedTrip.ID),
			)
			return false
		}
	}

	sqlStatement := `
		UPDATE trips
		SET name = $2,
		description = $3,
		cities = $4,
		days = $5,
		last_updated = $6
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedTrip.ID,
		updatedTrip.Name,
		updatedTrip.Description,
		pq.Array(cityEnumArrayToIDs(updatedTrip.Cities)),
		pq.Array(daysToIDArray(updatedTrip.Days)),
		updatedTrip.LastUpdated,
	)

	if err != nil {
		logger.Err(
			logger.Database,
			err,
			"Failed to update trip.",
		)
		return false
	}

	return true
}

func updateDay(
	updatedDay *wings.Day, createOnNonExist bool,
) bool {
	existingDay := fetchDay(int64(updatedDay.ID))

	if existingDay.ID != updatedDay.ID {
		logger.Print(logger.Database, "Existing Day not found.")

		if createOnNonExist {
			updatedDay.ID = addDay(*updatedDay)
			return updatedDay.ID != -1
		} else {
			return false
		}
	}

	for index, place := range updatedDay.Places {
		if updatePlace(&place) {
			updatedDay.Places[index] = place
		} else {
			return false
		}
	}

	sqlStatement := `
		UPDATE days
		SET trip_id = $2,
		day_of = $3,
		places = $4
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedDay.ID,
		updatedDay.TripID,
		updatedDay.DayOf,
		pq.Array(placesToIDArray(updatedDay.Places)),
	)

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to update day"+strconv.Itoa(updatedDay.ID),
		)
		return false
	}

	return true
}

func updatePlace(updatedPlace *wings.Place) bool {
	existingPlace := fetchPlace(int64(updatedPlace.ID))

	if existingPlace.ID != updatedPlace.ID {
		logger.Print(
			logger.Database,
			"Existing Place not found. Creating...",
		)
		updatedPlace.ID = addPlace(*updatedPlace)
		return updatedPlace.ID != -1
	}

	sqlStatement := `
		UPDATE places
		SET label = $2,
		url = $3,
		description = $4
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedPlace.ID,
		updatedPlace.Label,
		updatedPlace.URL,
		updatedPlace.Description,
	)

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to update place"+strconv.Itoa(updatedPlace.ID),
		)
		return false
	}

	return true
}

func deleteTripWithID(id int) bool {
	sqlStatement := `
		DELETE FROM trips
		WHERE id = $1;`
	if _, err := db.Exec(sqlStatement, id); err != nil {
		logger.Err(logger.Database, err, "")
		return false
	}
	logger.Print(
		logger.Database,
		"Trip ID "+strconv.Itoa(id)+" deleted",
	)
	return true
}

func failAddingTripToUser(id int) int {
	deleteTripWithID(id)
	return -1
}
