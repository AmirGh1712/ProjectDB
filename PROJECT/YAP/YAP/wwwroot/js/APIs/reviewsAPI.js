/*********************************************************************
 * Adds a review to the database from a user on a specific place.
 * @param {any} idPlaces
 * @param {any} username
 * @param {any} review
 * @param {any} stars
 * @param {any} date
 *********************************************************************/
async function addReview(idPlaces, username, review, stars) {
    var obj = { idPlaces: idPlaces, username: username, review: review, stars: stars};
    var myJSON = JSON.stringify(obj);
    await $.ajax({
        type: "post", //send it through post method
        data: myJSON,
        contentType: "application/json",
        url: "api/Reviews",

        success: function (data) {
            alert("Rating was added! Thank you.");
        },
        error: function (xhr) {
            if (xhr.status == 500)
                alert("Server is not responding, please try again later.");
            else
                alert(xhr.responseText)
        }
    });
}

/*********************************************************************
 * Gets the reviews of a specific place.
 * @param {any} id - the place id
 *********************************************************************/
async function getReviewsOfPlace(id, todo) {
    await $.ajax({
        url: "api/Reviews" + "?id=" + id,
        type: "get", //send it through get method

        success: function (data) {
            todo(data);
        },
        error: function (xhr) {
            alert("Server is not responding, please try again later.");
        }
    });
}

/*********************************************************************
 * Gets the reviews that a user wrote.
 * @param {any} username - the username.
 *********************************************************************/
async function getReviewsOfUser(username, todo) {
    await $.ajax({
        url: "api/Reviews/user" + "?uname=" + username,
        type: "get", //send it through get method

        success: function (data) {
            todo(data);
        },
        error: function (xhr) {
            alert("Server is not responding, please try again later.");
        }
    });
}
