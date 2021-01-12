/*********************************************************************
 * Gets a list of places according to the input.
 * We must get longitude, latitude and radius, the rest is optional.
 * @param {any} longitude
 * @param {any} latitude
 * @param {any} radius
 * @param {any} stars
 * @param {any} cats
 *********************************************************************/
async function getPlaces(longitude, latitude, radius, stars, cats, todo) {
    var starStr = ""
    var catStr = ""
    // if stars were given
    if (stars != "") {
        starStr = "&stars=" + stars;
    }
    // if categories were given,
    if (cats != []) {
        for (var i in cats) {
            catStr += "&cats=" + cats[i];
        }
    }
    await $.ajax({
        url: "api/Places" + "?longitude=" + longitude + "&latitude=" + latitude + "&radius=" + radius + starStr + catStr,
        type: "get", //send it through get method

        success: function (data) {
            todo(data);
            //return data;
        },
        error: function (xhr) {
            alert("Server is not responding, please try again later.");
        }
    });
}