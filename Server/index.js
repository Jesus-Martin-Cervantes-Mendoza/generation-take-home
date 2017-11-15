var express=require("express");
var app=express();
var loc;
var geoLocations=[];
var isRetrieving;
var tamaño;
var count=0;
var i=0;
var googleMapsClient=require("@google/maps").createClient({
	key: "AIzaSyDJp3hpJjzZXl6rcohe7MSdxlV6VZAMGgA"
});
var fs=require("fs");
var routes=require("./routes");

var Location=function(_locations) {
	console.log("algo");
	var finish=0;
	/*if (!_locations.length) {
		fs.writeFile("locations.json",JSON.stringify(geoLocations),"utf8",
		function(err) {
			if (err)
				console.log(err);
			else console.log("Finished");
		}
		);
		return;
	}*/for (var i = 0; i < _locations.length; i++) {
		(function(ind) {
			setTimeout(function(){
				console.log(ind);
				googleMapsClient.geocode({ address: _locations[ind].Address }, (err, response) => {
					console.log(err,ind);
					ind=ind;
						geoLocations.push({
							name: _locations[ind].Name,
							address: _locations[ind].Address,
							location: response.json.results[0].geometry.location
						});
					console.log(err);
					finish=Percent(_locations, response.json.results);
					if (finish==100) {
						fs.writeFile("locations.json",JSON.stringify(geoLocations),"utf8",
							function(err) {
								if (err)
									console.log(err);
								else console.log("Finished");
							}
						);
						return;
					}
				}); 
			},  10000 * (ind+1) );
		})(i);
	}
	/*fs.writeFile("locations.json",JSON.stringify(geoLocations),"utf8",
		function(err) {
			if (err)
				console.log(err);
			else console.log("Finished");
		}
	);
	return;
	/*googleMapsClient.geocode({ address: _locations[0].Address }, (err, response) => {
		if (!err) {
			if (response.json.results[0]) {
				geoLocations.push({
					name: _locations[0].Name,
					address: _locations[0].Address,
					location: response.json.results[0].geometry.location
				});
			}
			Percent(_locations, response.json.results);
			_locations.shift();
			Location(_locations);
		} else {
			Percent(_locations, response.json.results);
			_locations.shift();
			Location(_locations);
		}
	});*/
};
var plus=function(i){
	return i+1;
};
var Percent=function(_locations, obj) {
	count++;
	var percent=count / tamaño * 100;
	console.log( percent + "% ");
	return percent;
};
routes(app);

app.listen('8010', () => {
    console.log('Listening on port 8010');
});

try {
	require("./locations.json");
} catch (e) {
	try {
		loc=require("./store_directory.json");
		if (loc.length > 0) {
			tamaño=loc.length;
			Location(loc);
		} else {
		}
	} catch (e) {
		console.log(e);
	}
}
