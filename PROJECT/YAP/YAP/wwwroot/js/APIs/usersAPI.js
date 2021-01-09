/*********************************************************************
 * Checks if the user exists.
 * If exists, returns a json object of a user.
 * If doesn't exists, returns an empty json object.
 * @param {any} username
 * @param {any} password
 *********************************************************************/
async function doesUserExist(username, password, todo) {
    var obj = { username: username, password: password };
    var myJSON = JSON.stringify(obj);
    await $.ajax({
        type: "post", //send it through post method
        data: myJSON,
        contentType: "application/json",
        url: "api/User/check",

        success: function (data) {
            todo(data);
        },
        error: function (xhr) {
            // does nothing
        }
    });
}

/*********************************************************************
 * Creates a user.
 * Sends the parameters to the database for it to create the new user.
 * @param {any} username
 * @param {any} password
 * @param {any} fullname
 *********************************************************************/
async function createUser(username, password, fullname, todo) {
    var obj = { username: username, password: password, fullname: fullname };
    var myJSON = JSON.stringify(obj);
    await $.ajax({
        type: "post", //send it through post method
        data: myJSON,
        contentType: "application/json",
        url: "api/User",

        success: function (data) {
            todo(data, username, password);
        },
        error: function (xhr) {
            alert(xhr.responseText)
        }
    });
}

/*********************************************************************
 * Gets the average review of a user given a category.
 * @param {any} username
 * @param {any} category
 *********************************************************************/
async function getAverageCategoryReview(username, category, todo) {
    await $.ajax({
        url: "api/User" + "?username=" + username + "&category=" + category,
        type: "get", //send it through get method

        success: function (data) {
            todo(data);
        },
        error: function (xhr) {
            // does nothing
        }
    });
}

/*********************************************************************
 * Gets the recommended places for a user.
 * @param {any} username
 *********************************************************************/
async function getRecommendedPlaces(username, todo) {
    await $.ajax({
        url: "api/User/recommendation" + "?username=" + username,
        type: "get", //send it through get method

        success: function (data) {
            if (data.length != 0) {
                todo(data);
                map.setView([latitude, longitude], (0));
            } else {
                alert("You first need to add some reviews for us to know what you like :)");
            };
            document.getElementById("recommendedButton").value = "Show Recommended Locations";
        },
        error: function (xhr) {
            // does nothing
        }
    });
}