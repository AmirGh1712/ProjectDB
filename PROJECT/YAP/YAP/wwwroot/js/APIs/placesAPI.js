﻿/*********************************************************************
 * Gets a list of places according to the input.
 * We must get longitude, latitude and radius, the rest is optional.
 * @param {any} longitude
 * @param {any} latitude
 * @param {any} radius
 * @param {any} stars
 * @param {any} cats
 *********************************************************************/
async function getPlaces(longitude, latitude, radius, stars, cats) {
    var starStr = ""
    var catStr = ""
    // if stars were given
    if (stars == null) {
        starStr = "&stars=" + stars;
    }
    // if categories were given,
    if (cats == null) {
        for (cat in cats) {
            catStr += "&cats=" + cat;
        }
    }
    await $.ajax({
        url: "api/Places" + "?longitude=" + longitude + "&latitude=" + latitude + "&radius=" + radius + starStr + catStr,
        type: "get", //send it through get method

        success: function (data) {
            return data;
        },
        error: function (xhr) {
            // does nothing
        }
    });
}