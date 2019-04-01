var div = document.getElementById("map");
var map = plugin.google.maps.Map.getMap(div);
var mapjs = true;
var lastValidCenter = map.getCameraTarget();
var polyLineJSON = { "points" : [] };
var circlesArray = [];
var isPinningEnabled = false;

map.on(plugin.google.maps.event.MAP_CLICK, function(latLng) {
	//console.log(latLng);

	if(isPinningEnabled && isLoggedOn) {
		circlesArray[Object.keys(polyLineJSON.points).length] = map.addCircle({
			'center': latLng,
			'radius': 2,
			'strokeWidth': 1,
			'fillColor': '#F36077',
			'strokeColor': '#EE1133'
		});

		polyLineJSON.points.push({
			"lat" : latLng.lat,
			"lng" : latLng.lng
		});
	}
});

map.on(plugin.google.maps.event.CAMERA_MOVE, function(){
	if (latLngBounds.contains(map.getCameraTarget())) {
		lastValidCenter = map.getCameraTarget();
		return; 
	}

	map.setCameraTarget(lastValidCenter);
});

//var mapDiv = document.getElementById("map");
//var map = plugin.google.maps.Map.getMap(mapDiv);
//var isRunning = false;
//var inputField = mapDiv.getElementsByTagName("input")[0];
//var button = mapDiv.getElementsByTagName("button")[0];
//button.addEventListener("click", function() {
//  if (isRunning) {
//    return;
//  }
//  isRunning = true;

  // Address -> latitude,longitude
//  plugin.google.maps.Geocoder.geocode({
//    "address": inputField.value
//  }, function(results) {

//    if (results.length) {

      // Add a marker
//     	var marker = map.addMarker({
//        	'position': results[0].position,
//        	'title':  JSON.stringify(results[0].position)
//      	});

      	// Move to the position
//      	map.animateCamera({
//        	'target': results[0].position,
//        	'zoom': 17
//      	}, function() {
//        	marker.showInfoWindow();
//        	isRunning = false;
//      	});
//    } else {
//      	isRunning = false;
//    }
//  });
//});