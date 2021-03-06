var cats = [];
var radius = "";
var stars = "";
var categoryToIcon = {}
var currentReviewLocation;
var latitude;
var longitude;
var currentPlaces = [];
var currentPlace;
var myLocationMarker;

//google.charts.load('current', { 'packages': ['corechart'] });
//google.charts.setOnLoadCallback(showChart);

// setting icons
categoryToIcon["myLocation"] = createIcon("https://icons-for-free.com/iconfiles/png/512/marker-131994967950423839.png")
categoryToIcon["default"] = createIcon("https://image.flaticon.com/icons/png/512/12/12403.png");
categoryToIcon["eat"] = createIcon("https://img.icons8.com/metro/26/000000/dining-room.png");
categoryToIcon["drink"] = createIcon("https://img.icons8.com/pastel-glyph/64/000000/drink-to-go--v1.png");
categoryToIcon["sleep"] = createIcon("https://img.icons8.com/ios-filled/50/000000/bed.png");
categoryToIcon["buy"] = createIcon("https://img.icons8.com/android/24/000000/buy.png");
categoryToIcon["learn"] = createIcon("https://img.icons8.com/material-rounded/24/000000/saving-book.png");
categoryToIcon["park"] = createIcon("https://img.icons8.com/android/24/000000/park-bench.png");


/*********************************************************************
 * Activates the signup form.
 * Adds the user to the database.
 *********************************************************************/
function activateSignupForm() {
    var fullname = document.forms["signupForm"]["fullname"].value;
    var username = document.forms["signupForm"]["username"].value;
    var password = document.forms["signupForm"]["password"].value;
    if (fullname.length < 3) {
        alert("Full Name must be at least 3 characters");
    } else if (username.length < 3) {
        alert("Username must be at least 3 characters");
    } else if (password.length < 3) {
        alert("Password must be at least 3 characters");
    } else {
        createUser(username, password, fullname, handleactivateSignupForm);
    }
}

function handleactivateSignupForm(result, username, password) {
    if (result) {
        alert("Successfuly signed up!")
        activateLogin(username, password);
    }
    else {
        alert("Username already exists. Please consider using another username");
    }
}

/*********************************************************************
 * Activates the login form.
 * Tries to login by calling the "activateLogin" function
 *********************************************************************/
function activateLoginForm() {
    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;
    activateLogin(username, password);
}

/*********************************************************************
 * Checks if the user exists, and if it is, log in as this username by
 * redirecting the user to his profile page. This will give him the
 * access to the full "find" page.
 * @param {any} username - the username given
 * @param {any} password - the password given
 *********************************************************************/
function activateLogin(username, password) {
    doesUserExist(username, password, handleUserLogin);
}
function handleUserLogin(myUser) {
    if (myUser) {
        localStorage.setItem("fullname", myUser.fullname);
        localStorage.setItem("username", myUser.username);
        location.replace("profile.html");
    }
    else {
        alert("Username or Password are incorrect!");
    }
}

/*********************************************************************
 * Activates the parameter form, adds the markers to the map within the
 * given range, saves these markers and the info about the places
 * in a global variables.
 *********************************************************************/
function activateParameterForm() {
    radius = document.forms["parameterForm"]["radius"].value;
    if (radius == "") {
        alert("You must enter a radius in order to search for locations");
        return;
    }
    if (latitude == null) {
        alert("You must choose a location first!")
        return;
    }
    radius = radius / 111;
    // getting all the categories from the forms
    stars = document.forms["parameterForm"]["stars"].value;
    var see = document.forms["parameterForm"]["see"];
    var sleep = document.forms["parameterForm"]["sleep"]; // added icon
    var buy = document.forms["parameterForm"]["buy"]; // added icon
    var eat = document.forms["parameterForm"]["eat"]; // added icon
    var drink = document.forms["parameterForm"]["drink"]; // added icon
    var do1 = document.forms["parameterForm"]["do"];
    var go = document.forms["parameterForm"]["go"];
    var dr = document.forms["parameterForm"]["diplomatic-representation"];
    var city = document.forms["parameterForm"]["city"];
    var learn = document.forms["parameterForm"]["learn"]; // added icon
    var silver = document.forms["parameterForm"]["silver"];
    var around = document.forms["parameterForm"]["around"];
    var listing = document.forms["parameterForm"]["listing"];
    var view = document.forms["parameterForm"]["view"];
    var vicinity = document.forms["parameterForm"]["vicinity"];
    var mq = document.forms["parameterForm"]["mediumaquamarine"];
    var island = document.forms["parameterForm"]["island"];
    var park = document.forms["parameterForm"]["park"]; // added icon
    var red = document.forms["parameterForm"]["red"];
    var other = document.forms["parameterForm"]["other"];
    // putting all the categories inside one variable
    var arr = new Array(see, sleep, buy, eat, drink, do1,
        go, dr, city, learn, silver, around, listing,
        view, vicinity, mq, island, park, red, other);
    var i;
    cats = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].checked == true) {
            cats.push(arr[i].value)
        }
    }

    if (cats.length == 0) {
        alert("You must choose at least 1 category in order to search for locations.")
        return;
    }

    if (latitude == null) {
        alert("First choose a location!")
    }
    getPlaces(longitude, latitude, radius, stars, cats, handlePlaces);
    //sets the view
    if (radius * 111 <= 1) {
        map.setView([latitude, longitude], (13))
    } else if (radius * 111 <= 5) {
        map.setView([latitude, longitude], (12))
    } else if (radius * 111 <= 10){
        map.setView([latitude, longitude], (11))
    } else if (radius * 111 <= 25) {
        map.setView([latitude, longitude], (10))
    } else if (radius * 111 <= 50) {
        map.setView([latitude, longitude], (9))
    } else if (radius * 111 <= 100) {
        map.setView([latitude, longitude], (8))
    } else if (radius * 111 <= 200) {
        map.setView([latitude, longitude], (7))
    } else if (radius * 111 > 200) {
        map.setView([latitude, longitude], (6))
    }
}

function setLocation(mode) {
    if (myLocationMarker != null) {
        deleteMarker(myLocationMarker, map);
    }
    // mode 1 is my location
    if (mode == 1) {
        mapClickOff()
        document.getElementById("mapid").onclick = () => {}
        // getting latitude and longitude from user, then activate changes on map
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        } else {
            alert("Geolocation is not supported by this browser");
        }
    } else {
        mapClickOn()
        document.getElementById("mapid").onclick = () => {
            if (curserMarker) {
                latitude = curserMarker.getLatLng().lat;
                longitude = curserMarker.getLatLng().lng;
            }
        }
    }
}

/*********************************************************************
 * Sets the position of the user by getting the latitude and longitude.
 * Calls getPlaces.
 * @param {any} position - the position of the user.
 *********************************************************************/
function setPosition(position) {
    // activates changes in the map by the parameters
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    myLocationMarker = addMarker([latitude, longitude],
        map, categoryToIcon["myLocation"], function a() { });
}

/*********************************************************************
 * Adds a marker to one location given and adds kilometers.
 * @param {any} place - a json object of a place.
 *********************************************************************/
function onePlace(place) {
    if (place.category && (place.category in categoryToIcon)) {
        place.marker = addMarker([place.latitude, place.longitude],
            map, categoryToIcon[place.category],
            () => whenClick(place));
    } else {
        place.marker = addMarker([place.latitude, place.longitude],
            map, categoryToIcon["default"],
            () => whenClick(place));
    }
    // adds kilometers to the places that reperesent the distance from the user in kilometers
    place.kilometers = getDistanceFromLatLonInKm(place.latitude, place.longitude, latitude, longitude)
    currentPlaces.push(place);
}

/*********************************************************************
 * Handle places - adds them to map, adds kilometers range,
 * places them on tables
 * @param {any} places - a list of place json objects
 *********************************************************************/
function handlePlaces(places) {
    deleteCurrentIcons();
    // place the places on the map
    for (var i in places) {
        // for each place, place on map
        place = places[i];
        onePlace(place)
    }
    // sorts the places by distance in kilometers
    currentPlaces.sort(function (a, b) {
        return (a.kilometers > b.kilometers) ? 1 : ((a.kilometers < b.kilometers) ? -1 : 0);
    });
    // place the places on the table
    var j = 0;
    document.getElementById("attractionsTable").innerHTML = "<tr><th>Name</th><th>Radius</th><th>Info</th><th>Rating</th><th>Rate</th></tr>"
    for (var i in currentPlaces) {
        if (j >= 50) {
            break;
        }
        // for each place, place on map
        place = currentPlaces[i];
        setPlacesTable(place, i);
        j++;
    }
}

/*********************************************************************
 * Returns the distance in kilometers between two locations given
 * in latitude and longitude.
 * @param {any} lat1 - latitude of location 1
 * @param {any} lon1 - longitude of location 1
 * @param {any} lat2 - latitude of location 2
 * @param {any} lon2 - longitude of location 2
 *********************************************************************/
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

/*********************************************************************
 * Changes degree to radians and returns it.
 * @param {any} deg - degree
 *********************************************************************/
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

/*********************************************************************
 * Adds the place to the places table.
 * @param {any} place - a json object of a place.
 *********************************************************************/
function setPlacesTable(place, index) {
    // get stars
    var rating;
    if (place.stars) {
        stars = ["", "", "", "", ""]
        for (var i = 0; i < 5; i++) {
            if (place.stars > i + 0.5) {
                stars[i] = " checked";
            }
        }
        rating = "<span class=\"fa fa-star" + stars[0] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[1] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[2] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[3] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[4] + "\"></span>";
    } else {
        rating = "No Rating";
    }
    // adding to table
    document.getElementById("attractionsTable").innerHTML +=
        "<tr><td>" + place.name +
        "</td><td>" + Number(place.kilometers).toFixed(1) + " km" +
        "</td><td>" + "<button onclick=\"fromIndexToPlaceClick("+ index +")\" style=\"width:auto;\">More Info</button>" +
        "</td><th>" +
            rating +
        "</th><td>" +
            "<button onclick=\"document.getElementById('id01').style.display='block'; fromIndexToPlaceRating("+ index +")\" style=\"width:auto;\">Rate</button>"
        "</td></tr>"
}

/*********************************************************************
 * Puts info about the place in the info section (below the map)
 * @param {any} place - a json object of a place.
 *********************************************************************/
function setInfo(place) {
    var info = ""
    // for every info that exists - add it.
    if (place.name) {
        info += "Name: " + place.name + "<br />";
    }
    if (place.city) {
        info += "City: " + place.city + "<br />";
    }
    if (place.category) {
        info += "Category: " + place.category + "<br />";
    }
    if (place.address) {
        info += "Address: " + place.address + "<br />";
    }
    if (place.phone) {
        info += "Phone: " + place.phone + "<br />";
    }
    if (place.url) {
        info += "URL: " + place.url + "<br />";
    }
    if (place.description) {
        info += "Description: " + place.description + "<br />";
    }
    if (place.hours) {
        info += "Hours: " + place.hours + "<br />";
    }
    if (place.directions) {
        info += "Directions: " + place.directions + "<br />";
    }
    if (place.stars) {
        var stars = ["", "", "", "", ""]
        for (var i = 0; i < 5; i++) {
            if (place.stars > i + 0.5) {
                stars[i] = " checked";
            }
        }
        var rating = "<span class=\"fa fa-star" + stars[0] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[1] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[2] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[3] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[4] + "\"></span>";
        info += "Stars: " + rating + "<br />";
    }
    info += "<button onclick=\"document.getElementById('id01').style.display='block'; fromIndexToPlaceRating(" + currentPlaces.indexOf(place) + ")\" style=\"width:auto;\">Rate</button>"
    // changes the attraction details text to be the info gathered.
    document.getElementById("AttractionDetailsText").innerHTML = info;
}

function setReviews(place) {
    getReviewsOfPlace(place.id, handleSetReviews);
}

function handleSetReviews(reviews) {
    document.getElementById("AttractionDetailsReviews").innerHTML = "";
    if (reviews) {
        for (var i in reviews) {
            var review = reviews[i];
            var info = "";
            info += "From User: " + review.username + "<br />";
            info += "Review: " + review.review + "<br />";
            var stars = ["", "", "", "", ""];
            for (var i = 0; i < 5; i++) {
                if (review.stars > i + 0.5) {
                    stars[i] = " checked";
                }
            }
            var rating = "<span class=\"fa fa-star" + stars[0] + "\"></span>" +
                "<span class=\"fa fa-star" + stars[1] + "\"></span>" +
                "<span class=\"fa fa-star" + stars[2] + "\"></span>" +
                "<span class=\"fa fa-star" + stars[3] + "\"></span>" +
                "<span class=\"fa fa-star" + stars[4] + "\"></span>";
            info += "Stars: " + rating + "<br />";
            info += "Date: " + (review.date).substring(0, 10) + "<br />" + "<br />" + "<br />";
     
            document.getElementById("AttractionDetailsReviews").innerHTML += info;
        }
    }
}

/*********************************************************************
 * When clicking 
 * @param {any} index - the index of the place.
 *********************************************************************/
function fromIndexToPlaceClick(index) {
    place = currentPlaces[index];
    whenClick(place)
}

/*********************************************************************
 * @param {any} index - the index of the place we want to save the
 *                      rating of.
 *********************************************************************/
function fromIndexToPlaceRating(index) {
    place = currentPlaces[index];
    saveLocationRating(place)
}

/*********************************************************************
 * When clicking 
 * @param {any} place - the index of the place.
 *********************************************************************/
function whenClick(place) {
    // decrease the last place
    if (currentPlace) {
        changeMarkerSize(currentPlace.marker, [20, 20], [10, 20]);
    }
    currentPlace = place;
    // increase the size
    changeMarkerSize(place.marker, [40, 40], [20, 40]);
    // adds info
    setInfo(place);
    setReviews(place);
    map.setView([place.latitude, place.longitude], (13))
}
/*********************************************************************
 * Deletes the icons that are currently on the map
 *********************************************************************/
function deleteCurrentIcons() {
    for (var i in currentPlaces) {
        deleteMarker(currentPlaces[i].marker, map);
    }
    currentPlaces = [];
    if (currentPlace) {
        changeMarkerSize(currentPlace.marker, [20, 20], [10, 20]);
    }
    currentPlace = null;
    document.getElementById("AttractionDetailsText").innerHTML = "";
    document.getElementById("AttractionDetailsReviews").innerHTML = "";
}

/*********************************************************************
 * Saves the location in case we submit a rating. This will be called
 * if we click on the "Rate" option, so that when we click submit we
 * will know the place we are currently rating.
 * @param {any} index - the index of the place we want to save the
 *                      rating of.
 *********************************************************************/
function saveLocationRating(place) {
    currentReviewLocation = place;
    document.getElementById("reviewHead").innerHTML = "Review - " + place.name;
    getAverageCategoryReview(localStorage.getItem("username"), place.category, handleAverageRating);
}

/*********************************************************************
 * Adds a rating to the place.
 * @param {any} place - a json object of a place.
 *********************************************************************/
function addRating() {
    var review = document.forms["reviewForm"]["review"].value;
    var stars = parseInt(document.forms["reviewForm"]["rating"].value);
    if (stars < 0 || stars > 5) {
        alert("Stars must be between 0 and 5")
        return;
    }
    addReview(currentReviewLocation.id, localStorage.getItem("username"), review, stars);
    resetRateForm();
}

function handleAverageRating(data) {
    // mode 1 is to update the rating update
    if (data == -1) {
        document.getElementById("ratingText").innerHTML = " You never rated this category (" +
            currentReviewLocation.category + ") before";
    }
    else {
        document.getElementById("ratingText").innerHTML = " Your average stars for this place's category (" +
            currentReviewLocation.category + ") is " + data;
    }
}

function setProfile() {
    document.getElementById("heyMessage").innerHTML = "<h3>Hey " + localStorage.getItem("fullname") + "!</h3>";
    getReviewsOfUser(localStorage.getItem("username"), handleSetProfile);
}

function handleSetProfile(reviews) {
    var info = "<h3>Your Reviews:</h3>" + "<br/>";
    var arr = new Array("see", "sleep", "buy", "eat", "drink", "do",
        "go", "diplomatic-representation", "city", "learn", "silver", "around", "listing",
        "view", "vicinity", "mediumaquamarine", "island", "park", "red", "other");
    var arrValues = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    for (var i in reviews) {
        var review = reviews[i].item1;
        var place = reviews[i].item2;
        arrValues[arr.indexOf(place.category)]++;
        info += "Location: " + place.name + "<br/>";
        info += "Review: " + review.review + "<br/>";
        var stars = ["", "", "", "", ""];
        for (var j = 0; j < 5; j++) {
            if (review.stars > j + 0.5) {
                stars[j] = " checked";
            }
        }
        var rating = "<span class=\"fa fa-star" + stars[0] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[1] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[2] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[3] + "\"></span>" +
            "<span class=\"fa fa-star" + stars[4] + "\"></span>";
        info += "Stars: " + rating + "<br />";
        info += "Date: " + (review.date).substring(0, 10) + "<br/>" + "<br/>";
    }
    document.getElementById("userRatings").innerHTML = info;
    //showChart(arr, arrValues);
}

function showChart(arr, arrValues) {
    var data = google.visualization.arrayToDataTable([
        ['Category', 'Amount of reviews'],
        [arr[0], arrValues[0]],
        [arr[1], arrValues[1]],
        [arr[2], arrValues[2]],
        [arr[3], arrValues[3]],
        [arr[4], arrValues[4]],
        [arr[5], arrValues[5]],
        [arr[6], arrValues[6]],
        [arr[7], arrValues[7]],
        [arr[8], arrValues[8]],
        [arr[9], arrValues[9]],
        [arr[10], arrValues[10]],
        [arr[11], arrValues[11]],
        [arr[12], arrValues[12]],
        [arr[13], arrValues[13]],
        [arr[14], arrValues[14]],
        [arr[15], arrValues[15]],
        [arr[16], arrValues[16]],
        [arr[17], arrValues[17]],
        [arr[18], arrValues[18]],
        [arr[19], arrValues[19]],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = { 'title': 'Your Reviews By Category', 'width': 550, 'height': 400 };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

function checkAll(changeTo) {
    document.getElementById("see").checked = changeTo;
    document.getElementById("sleep").checked = changeTo;
    document.getElementById("buy").checked = changeTo;
    document.getElementById("eat").checked = changeTo;
    document.getElementById("drink").checked = changeTo;
    document.getElementById("do").checked = changeTo;
    document.getElementById("go").checked = changeTo;
    document.getElementById("city").checked = changeTo;
    document.getElementById("dr").checked = changeTo;
    document.getElementById("learn").checked = changeTo;
    document.getElementById("silver").checked = changeTo;
    document.getElementById("around").checked = changeTo;
    document.getElementById("listing").checked = changeTo;
    document.getElementById("view").checked = changeTo;
    document.getElementById("vicinity").checked = changeTo;
    document.getElementById("mq").checked = changeTo;
    document.getElementById("island").checked = changeTo;
    document.getElementById("park").checked = changeTo;
    document.getElementById("red").checked = changeTo;
    document.getElementById("other").checked = changeTo;
}

function resetRateForm() {
    document.forms["reviewForm"]["review"].value = "";
    document.forms["reviewForm"]["rating"].value = null;
    document.getElementById('id01').style.display = 'none';
}

function showRecommended() {
    if (latitude == null) {
        alert("You must choose a location first!")
        return;
    }
    document.getElementById("recommendedButton").value = "Loading...";
    getRecommendedPlaces(localStorage.getItem("username"), handlePlaces);
}