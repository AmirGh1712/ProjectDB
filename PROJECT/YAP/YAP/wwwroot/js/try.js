async function getReviews(placeid) {


    await $.ajax({
        url: "api/Reviews/" + "?id=" + placeid,
        type: "get", //send it through get method
        //dataType: 'json',

        success: function (data) {
            //parse the json to this variable.
            console.log(data)
        },
        error: function (xhr) {
            console.log(xhr);//TODO
            //ErrorHandler.showError("Couldn't get flights from the server");
        }

    });
    //for (let flight of flightsArray) {
    //    const planeIcon = this.getPlaneIcon(flight.flight_id);
    //    flightWrappersArray.push(new FlightWrapper(flight, planeIcon));
    //}
    //this.setNewFlightsDict(flightWrappersArray);
    //return flightWrappersArray;

}