$(document).ready(function() {
	'use strict';
	let kelvin;
	let value;
	let latitude;
	let longitude;

	if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(

	    (position) => {
	    	latitude = position.coords.latitude;
	    	longitude = position.coords.longitude;
	    },

	    () => {
	    	console.log('An error occurred.');
	    }
   	);
	} else {
	    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
	}

	if (!latitude && !longitude) {
  	// default: San Francisco
		latitude = 37.7749;
		longitude = -122.4195;
	}

  (function() {
	  let weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=f3c88f256f6c50f2d846420ba91664f0";
	  $.getJSON(weatherAPI, {
	    tagmode: "any",
	    format: "json"
	  })
    .done(function(data) { console.log(data)
    	$('#location').html(data.name);
    	let desc = data.weather[0].description;
    	$('#description').html(desc);
    	kelvin = data.main.temp;
    	// Convert default Kelvin to Fahrenheit.
    	value = Math.floor(kelvin * 9/5 - 459.67);
    	$('#degree').html(value);
    });
	})();

	let px = 30;
	let moveCloud = function() {
		let $cloud = $('.moving-cloud');
		if (px > -33) {
			$cloud.css('margin-left', px-- + 'px');
			if (px === -18) {
				$cloud.fadeTo('slow', 0);
			}
			if (px === -28) {
				px = 30;
				$cloud.css('margin-left', px + 'px');
				$cloud.fadeTo('slow', 1);
			}
		}
	};

	setInterval(moveCloud, 100);

	let degree = 0;
	// 0 === Fahrenheit, 1 === Celcius
	$('#switch').on('click', function() {
		value = $('#degree').html();
		if (degree === 0) {
			// Switch from Fahrenheit to Celcius.
			value = Math.floor(kelvin - 273.15);
			$('#degree').html(value);
			$(this).html('&#x2103;');
			degree = 1;
		} else {
			value = Math.floor(kelvin * 9/5 - 459.67);
			$('#degree').html(value);
			$(this).html('&#x2109;');
			degree = 0;
		}
	});

});