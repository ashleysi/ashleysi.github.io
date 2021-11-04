//set an environment for jquery which is $   (aka this is a jquery item)
//when this dociment is ready (loaded) i want you to do this...
$(document).ready(function () {
    
    // Get Location 
	//we can have a success or error when getting out location using geolocation
    navigator.geolocation.getCurrentPosition(success, error);

	//if we have a success
    function success(pos) {
		//get position latitude
        var lat = pos.coords.latitude;
		 //get position longitude
        var long = pos.coords.longitude;
		
		//send lat and long to weather function 
        weather(lat, long);
    }

	//if we have an error
    function error() {
        console.log('There was an error');
    }

    // Call Weather
	//function will send this request
    function weather(lat, long) {
        var URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

		//method takes 2 parameters
        $.getJSON(URL, function(data) {
			//when we run also update the DOM with the info passed into it
            updateDOM(data);
        });
    }

    // Update Dom
    function updateDOM(data) {
		//go into data object by finding the city and replace the html with what we have here
        var city = data.name;
		//round this 
        var temp = Math.round(data.main.temp_max);
		////description. array at position 0
        var desc = data.weather[0].description;
		//update icon at position 0
        var icon = data.weather[0].icon;

		//select our cirty with jquery and change html with the city name 
        $('#city').html(city);
        $('#temp').html(temp);
        $('#desc').html(desc);
		//need to change source attribite of the element. NOT the html this time 
    //change source (src) with the icon
        $('#icon').attr('src', icon);
    }
});

