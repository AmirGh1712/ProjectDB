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