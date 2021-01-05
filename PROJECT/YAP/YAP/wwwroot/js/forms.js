var cats = [];
var radius = "";
var stars = "";
var placeToMarker = {}
var categoryToIcon = {}
var user;

// setting icons
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
    location.replace();
    alert("logged in Successfuly!");
    var fullname = document.forms["signupForm"]["fullname"].value;
    var username = document.forms["signupForm"]["username"].value;
    var password = document.forms["signupForm"]["password"].value;
    var result = createUser(fullname, username, password);
    if (result == 1) {
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
    user = doesUserExist(username, password);
    if (user) {
        location.replace("profile.html");
        alert("logged in Successfuly!");
    }
    else {
        alert("Username or Password incorrect!");
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
    for (i = 0; i < arr.length; i++) {
        if (arr[i].checked == true) {
            cats.push(arr[i].value)
        }
    }

    // getting latitude and longitude from user, then activate changes on map
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        alert("Geolocation is not supported by this browser")
    }
}

/*********************************************************************
 * Sets the position of the user by getting the latitude and longitude.
 * Calls getPlaces.
 * @param {any} position - the position of the user.
 *********************************************************************/
function setPosition(position) {
    // activates changes in the map by the parameters
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    radius = getDistanceFromLatLonInKm(latitude, longitude, latitude + radius, longitude)
    getPlaces(longitude, latitude, radius, stars, cats, handlePlaces);
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
        if (place.category && (place.category in categoryToIcon)) {
            placeToMarker[place] = addMarker([place.latitude, place.longitude],
                map, categoryToIcon[place.category],
                () => whenClick(place));
        } else {
            placeToMarker[place] = addMarker([place.latitude, place.longitude],
                map, categoryToIcon["default"],
                () => whenClick(place));
        }
        placeToMarker[place] = addMarker([place.latitude, place.longitude], map, iconDefault,
            () => whenClick(place));
        // adds kilometers to the places that reperesent the distance from the user in kilometers
        place.kilometers = getDistanceFromLatLonInKm(place.latitude, place.longitude, latitude, longitude)
    }
    // sorts the places by distance in kilometers
    places.sort(function (a, b) {
        return (a.kilometers < b.kilometers) ? 1 : ((a.kilometers > b.kilometers) ? -1 : 0);
    });
    // place the places on the table
    var j = 0;
    for (var i in places) {
        if (j >= 50) {
            break;
        }
        // for each place, place on map
        place = places[i];
        setPlacesTable(place);
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
function setPlacesTables(place) {
    document.getElementById("attractions-body").innerHTML = ""
    // get stars
    stars = ["", "", "", "", ""]
    if (place.stars) {
        for (var i = 0; i < 5; i++) {
            if (place.stars > i + 0.5) {
                stars[i] = "checked";
            }
        }
    }
    // adding to table
    document.getElementById("attractions-body").innerHTML +=
        "<tr><td>" + place.name +
        "</td><td>" + place.kilometers + " km" +
    "</td><td>" + "<button onclick=\"whenClick("+place+")\" style=\"width:auto;\">More Info</button>" +
        "</td><th>" +
            "<span class=\"fa fa - star " + stars[0] + " \"></span>" +
            "<span class=\"fa fa - star " + stars[1] + " \"></span>" +
            "<span class=\"fa fa - star " + stars[2] + " \"></span>" +
            "<span class=\"fa fa - star " + stars[3] + " \"></span>" +
            "<span class=\"fa fa - star " + stars[4] + " \"></span>" +
        "</th></td>" +
            "<button onclick=\"document.getElementById('id01').style.display='block'\" style=\"width:auto;\">Rate</button>"
        "</td></tr>"
}

/*********************************************************************
 * Puts info about the place in the info section (below the map)
 * @param {any} place - a json object of a place.
 *********************************************************************/
function setInfo(place) {
    info = ""
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
        info += "Stars: " + place.stars + "<br />";
    }
    // changes the attraction details text to be the info gathered.
    document.getElementById("AttractionDetailsText").innerHTML = info;
}

/*********************************************************************
 * When clicking 
 * @param {any} place - a json object of a place.
 *********************************************************************/
function whenClick(place) {
    // increase the size
    changeMarkerSize(placeToMarker[place], [80, 80], [40, 80]);
    // adds info
    setInfo(place);
}
/*********************************************************************
 * Deletes the icons that are currently on the map
 *********************************************************************/
function deleteCurrentIcons() {
    for (var key in placeToMarker) {
        deleteMarker(placeToMarker[key], map);
    }
    placeToMarker = {}
}

/*********************************************************************
 * Adds a rating to the place.
 * @param {any} place - a json object of a place.
 *********************************************************************/
function addRating(place) {

}
