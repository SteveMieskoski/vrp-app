var https = require("https");
var geocodeAPI = "4f03af1a1ea4428891dd006b61a9b4be";

originalVersion = function(search, callback) {
    try{
	    var searchResult = search;
	    var url =
		    "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchResult;
	    https.get(url, res => {
		    res.setEncoding("utf8");
		    let body = "";
		    res.on("data", data => {
			    body += data;
		    });
		    res.on("end", () => {
				body = JSON.parse(body);
				
			    let lat = body.results[0].geometry.location.lat;
			    let lng = body.results[0].geometry.location.lng;
			    let location = body.results[0].formatted_address;
				console.log('ov', {lat: lat, lng: lng, address: location})
			    callback(null, {lat: lat, lng: lng, address: location});
		    });
	    });
    } catch (err){
        callback(err);
    }
};

newVersion = function(search, callback) {
    try{
	    var searchResult = search;
	    var url = "https://api.opencagedata.com/geocode/v1/json?query=" + search + "&pretty=1&key=" + geocodeAPI;
	    https.get(url, res => {
		    res.setEncoding("utf8");
		    let body = "";
		    res.on("data", data => {
				body += data;
				
		    });
		    res.on("end", () => {
				body = JSON.parse(body); 
				
				var sorted = body.results.sort(function(a,b) {
					return a.formatted.length < b.formatted.length;
				})
								if(sorted.length == 0) {
									callback("no results", null);
								}

			    let lat = sorted[0].geometry.lat;
			    let lng = sorted[0].geometry.lng;
			    let location = sorted[0].formatted;
				console.log('nv', {lat: lat, lng: lng, address: location})
			    callback(null, {lat: lat, lng: lng, address: location});
		    });
	    });
    } catch (err){
        callback(err);
    }
}

module.exports.getCoordsAndAddress = function(search, callback) {
	//originalVersion(search, callback);
	newVersion(search, callback);
};

