/*********************************************************************
 * Adds a review to the database from a user on a specific place.
 * @param {any} idPlaces
 * @param {any} username
 * @param {any} review
 * @param {any} stars
 * @param {any} date
 *********************************************************************/
async function addReview(idPlaces, username, review, stars, date) {
    var obj = { idPlaces: idPlaces, username: username, review: review, stars: stars, date: date };
    var myJSON = JSON.stringify(obj);
    await $.ajax({
        type: "post", //send it through post method
        data: myJSON,
        contentType: "application/json",
        url: "api/Reviews",

        success: function (data) {
            return data;
        },
        error: function (xhr) {
            // does nothing
        }
    });
}

/*********************************************************************
 * Gets the reviews of a specific place.
 * @param {any} id
 *********************************************************************/
async function getReviews(id) {
    await $.ajax({
        url: "api/Reviews" + "?id=" + id,
        type: "get", //send it through get method

        success: function (data) {
            return data;
        },
        error: function (xhr) {
            // does nothing
        }
    });
}
