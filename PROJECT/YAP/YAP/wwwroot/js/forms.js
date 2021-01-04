var cats = [];
var radius = "";
var stars = "";
function activateSignupForm() {
    location.replace();
    alert("logged in Successfuly!");
    var fullname = document.forms["signupForm"]["fullname"].value;
    var username = document.forms["signupForm"]["username"].value;
    var password = document.forms["signupForm"]["password"].value;
    //var result = createUser(fullname, username, password);
/*    if (result == 1) {
        alert("Successfuly signed up!")
        activateLogin(username, password);
    }
    else {
        alert("Username already exists. Please consider using another username");
    }*/
}

function activateLoginForm() {
    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;
    activateLogin(username, password);
}

function activateLogin(username, password) {
    var result = doesUserExist(username, password);
    if (result == 1) {
        location.replace("profile.html");
        alert("logged in Successfuly!");
    }
    else {
        alert("Username or Password incorrect!");
    }
}

function activateParameterForm() {
    radius = document.forms["parameterForm"]["radius"].value;
    if (radius == "") {
        alert("You must enter a radius in order to search for locations");
        return;
    }
    // getting all the categories from the forms
    stars = document.forms["parameterForm"]["stars"].value;
    var see = document.forms["parameterForm"]["see"];
    var sleep = document.forms["parameterForm"]["sleep"];
    var buy = document.forms["parameterForm"]["buy"];
    var eat = document.forms["parameterForm"]["eat"];
    var drink = document.forms["parameterForm"]["drink"];
    var do1 = document.forms["parameterForm"]["do"];
    var go = document.forms["parameterForm"]["go"];
    var dr = document.forms["parameterForm"]["diplomatic-representation"];
    var city = document.forms["parameterForm"]["city"];
    var learn = document.forms["parameterForm"]["learn"];
    var silver = document.forms["parameterForm"]["silver"];
    var around = document.forms["parameterForm"]["around"];
    var listing = document.forms["parameterForm"]["listing"];
    var view = document.forms["parameterForm"]["view"];
    var vicinity = document.forms["parameterForm"]["vicinity"];
    var mq = document.forms["parameterForm"]["mediumaquamarine"];
    var island = document.forms["parameterForm"]["island"];
    var park = document.forms["parameterForm"]["park"];
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
    alert(position.coords.latitude)
}

function setPosition(position) {
    // activates changes in the map by the parameters
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var places = getPlaces(longitude, latitude, radius, stars, cats);
    var iconLoc = createIcon("https://image.flaticon.com/icons/png/512/12/12403.png");
    for (place in places) {
        addMarker([latitude, longitude], map, iconLoc, () => changeMarkerSize(m, [80, 80], [40, 80]));
    }
}