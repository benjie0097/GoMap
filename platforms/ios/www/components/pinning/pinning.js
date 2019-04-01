var pinningjs = true;
var lastSavedZoom = null;
var polyLine = null;
var pinColor = null;
var div = document.getElementById("map");
var map = plugin.google.maps.Map.getMap(div);
var mapjs = true;
var lastValidCenter = map.getCameraTarget();
var polyLineJSON = { "points" : [] };
var circlesArray = [];
var isPinningEnabled = false;

$(document).on('click', '#add_pin', function(e) {
	e.preventDefault();
	isPinningEnabled = true;
	lastSavedZoom = map.getCameraZoom();
	map.setCameraZoom(10);
	map.setOptions({
		'gestures': {
			'zoom': false
		}
	});

	$('#add_pin').addClass('hide');
	$('#already_added_pin').addClass('hide');
	$('.pinning-panel>.container>.row').removeClass('hide');
});


map.one(plugin.google.maps.event.MAP_READY, function() {
	$(document).on('click', '#already_added_pin', function(e) {
	e.preventDefault();
		var locatonList = [
                    {lat : 17.617714580464046 , long : 121.75203885246685},
                    {lat : 17.628679058804135 , long : 121.75983237838614},
                   // {lat : 42 , long : 2.69, title : 'Title C' ,snippet : 'Snippet C'}
             ];

		map.addMarker({
			'postion': {
				lat: 0,
				lng: 0
			},
			'title': 'Click Me!'
		}, function(marker) {
			marker.showInfoWindow();
			marker.on(plugin.google.maps.event.INFO_CLICK, function() {
				marker.setPosition({
					//lat: 17.617714580464046,
					//lng: 121.75203885246685,
					//lat: 17.628679058804135,
					//lng: 121.75983237838614,
					target: locatonList
				})
			})
		})
	});
})
	
map.on(plugin.google.maps.event.MAP_CLICK, function(latLng) {
	//console.log('pinning' + latLng);
	$(document).on('click', '#submit_pin', function(e) {
		e.preventDefault();
		if(pinColor) {
			pinColor = null;
			polyLine = null;	
		}

		console.log('lat: ' + latLng.lat);
		console.log('lng: ' + latLng.lng);

		var lat = latLng.lat;
		var lng = latLng.lng
		$.ajax({
			type: "POST",
			url: "https://zbenedictjhon88.000webhostapp.com/locations.php",
			data: 'lat=' + lat + '&lng=' + lng,
			success: function(result) {
				resetPinning();	
				M.toast({html: "You're successfully Add Road!"});				
			},
			error: function (data) { // if error occured
               	M.toast({html: "Something Went Wrong! Try Again."});
                $('.loading-overlay').addClass('hide');
            },         
        });	
	});

	//if(isPinningEnabled && isLoggedOn) {
	//	circlesArray[Object.keys(polyLineJSON.points).length] = map.addCircle({
	//		'center': latLng,
	//		'radius': 2,
	//		'strokeWidth': 1,
	//		'fillColor': '#F36077',
	//		'strokeColor': '#EE1133'
	//	});
 	//	polyLineJSON.points.push({
	//		"lat" : latLng.lat,
	//		"lng" : latLng.lng
	//	});
	//}
});

//map.on(plugin.google.maps.event.CAMERA_MOVE, function(){
	//	if (latLngBounds.contains(map.getCameraTarget())) {
	//		lastValidCenter = map.getCameraTarget();
	//		return; 
	//	}

	//map.setCameraTarget(lastValidCenter);
//});


$(document).on('click', '#ok_pin', function(e) {
	e.preventDefault();
	if(Object.keys(polyLineJSON.points).length > 1) {
		$('#ok_pin').addClass('hide');
		$('#submit_pin').removeClass('hide');
		$('.pinning-color-panel').removeClass('hide');

		for(var i=0;i<Object.keys(polyLineJSON.points).length;i++) {
			circlesArray[i].setVisible(false);
		}

		polyLine = map.addPolyline({
			'points': polyLineJSON.points,
			'color' : '#fff',
			'width': 13,
			'geodesic': true
		});
	}
});

$(document).on('click', '#undo_pin', function(e) {
	e.preventDefault();
	resetPinningStatus();

	if(Object.keys(polyLineJSON.points).length) {
		if(polyLine) {
			polyLine.remove();
			for(var i=0;i<Object.keys(polyLineJSON.points).length;i++) {
				circlesArray[i].setVisible(true);
			}	
			polyLine = null;
		}	
		else {	
			circlesArray[Object.keys(polyLineJSON.points).length - 1].remove();
			circlesArray.pop();
			polyLineJSON.points.pop();
		}
	}
});

$(document).on('click', '#cancel_pinning', function(e) {
	e.preventDefault();
	if(polyLine) {
		polyLine.remove();	
		polyLine = null;
	}
	resetPinning();
});

$(document).on('click', '.pin-label', function(e) {
	e.preventDefault();
	var id = this.id;
	console.log(id);
	switch(id) {
		case 'pin-heavy':
		pinColor = '#F44336';
		break;
		case 'pin-moderate':
		pinColor = '#FFEB3B';
		break;
		case 'pin-light':
		pinColor = '#4CAF50';
		break;
		case 'pin-passable':
		pinColor = '#2196F3';
		break;
		case 'pin-flooding':
		pinColor = '#795548';
		break;
		case 'pin-under-construction':
		pinColor = '#FF5722';
		break;
		case 'pin-road-crash':
		pinColor = '#9e9e9e';
		break;
	}

	polyLine.setStrokeColor(pinColor);
});

function resetPinningStatus() {
	if($('#ok_pin').hasClass('hide')) {	
		$('#submit_pin').addClass('hide');
		$('#ok_pin').removeClass('hide');
		$('.pinning-color-panel').addClass('hide');
	}
}

function resetPinning() {
	isPinningEnabled = false;
	resetPinningStatus();
	$('.pinning-panel>.container>.row').addClass('hide');
	$('#add_pin').removeClass('hide');
	$('#already_added_pin').removeClass('hide');

	for(var i=0;i<Object.keys(polyLineJSON.points).length;i++) {
		circlesArray[i].remove();
	}
	circlesArray = [];
	polyLineJSON.points = [];
	map.setCameraZoom(lastSavedZoom);
	map.setOptions({
		'gestures': {
			'zoom': true
		}
	});
}