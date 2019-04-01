/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
        
        //start();
        goToGuest();
        //goToRegisteredUser();
        M.toast({html: "Welcome to Road2Go"});
    }
};

function start() {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + 'config.json', function() {
          $.getJSON(cordova.file.externalDataDirectory + 'config.json', function(data){
                if(data.account.username && data.account.password) {
                    goToRegisteredUser();
                }
                else {
                    goToGuest();
                }
            });
        }, function() {
            $.getJSON('data/config.json', function(data){
                saveJSON(data, 'Welcome to Road2Go', function(){
                    goToGuest();
                });
            });
    });
}

function saveJSON(data, toast, callback) {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
        dir.getFile('config.json', {create:true}, function(file) {
            file.createWriter(function(fileWriter) {
                fileWriter.write(data);
                M.toast({html: toast});
                callback();
            }, function(){
                console.log('Unable to save file in path '+ cordova.file.externalDataDirectory);
            });
        });
    });
}

function goToGuest() {
    showNavbar();
    showTabsGuest();
    showContentsGuest();
    showSearch();
    showMap();
    showLogin();
}
function showTabsGuest() {
    $.get('components/tabs_guest/tabs_guest.html', function(data){ 
        $('header').append(data);
    });
}
function showContentsGuest() {
    $.get('components/contents_guest/contents_guest.html', function(data){ 
        $('main').html(data);
        $('.tabs').tabs();
    });
}

function goToRegisteredUser() {
    showNavbar();
    showTabsRegistered();
    showContentsRegistered();
    showSearch();
    showMap();
    showPinning();
    showProfile();
    isLoggedOn = true;
}
function showTabsRegistered() {
    $.get('components/tabs_registered/tabs_registered.html', function(data){ 
        $('header').append(data);

        if(typeof window.tabsregisteredjs == 'undefined') {
            $.getScript('components/tabs_registered/tabs_registered.js');
        }
    });
}
function showContentsRegistered() {
    $.get('components/contents_registered/contents_registered.html', function(data){ 
        $('main').html(data);

        $.getJSON(cordova.file.externalDataDirectory + 'config.json', function(data){
            $('#user_name').text(data.account.username);
        });

        $('.tabs').tabs();

        if(typeof window.contentsregisteredjs == 'undefined') {
            $.getScript('components/contents_registered/contents_registered.js');
        }
    });
}

function goToAdmin() {
    showNavbar();
    showTabsAdmin();
    showContentsAdmin();
    showSearch();
    showMap();
    showPinning();
    showProfile();
    //showAdminSite();
    isLoggedOn = true;
}
function showTabsAdmin() {
    $.get('components/tabs_admin/tabs_admin.html', function(data){ 
        $('header').append(data);

        if(typeof window.tabsadminjs == 'undefined') {
            $.getScript('components/tabs_admin/tabs_admin.js');
        }
    });
}
function showContentsAdmin() {
    $.get('components/contents_admin/contents_admin.html', function(data){ 
        $('main').html(data);
        $.getJSON(cordova.file.externalDataDirectory + 'config.json', function(data){
            $('#user_name').text(data.account.username);
        });

        $('.tabs').tabs();

        if(typeof window.contentsadminjs == 'undefined') {
            $.getScript('components/contents_admin/contents_admin.js');
        }
    });
}
function showAdminSite(){
    $.get('components/admin/admin.html', function(data){ 
        $('main').html(data);
        $('#posTable tbody tr').remove();
        
        $.ajax({
            type: 'POST',
            //url: 'https://zbenedictjhon88.000webhostapp.com/accounts.php',
            url: '../database/action.php',
            async: false,
            success: function (data) {
                var result = JSON.parse(data);
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    $('#posTable tbody').prepend(
                            "<tr>" +
                            " <td style='color: black'>\n" + result[i].name + "</td>\n" +
                            " <td style='color: black'>\n" + result[i].username + "</td>\n" +
                            " <td style='color: black'>\n" + result[i].type + "</td>\n" +
                            //" <td style='color: black'>\n\ <button type='button' class='close'>  <span id='deleteSpan" + result[i].id + "' aria-hidden='true' onclick='deleteInventory($(this), " + result[i].id + ", " + result[i].is_saved + ")' >×</span> </button></td>\n" +
                            "</tr>\n"
                            ).fadeIn(3000);
                }
            }
        });
    });
}

// All Access
function showPinning() {
    $.get('components/pinning/pinning.html', function(data){ 
        $('#home').append(data);

        if(typeof window.pinningjs == 'undefined') {
            $.getScript('components/pinning/pinning.js')
        }
    });
}
function showNavbar() {
    $.get('components/navbar/navbar.html', function(data){ 
        $('header').html(data);
    });
}
function showSearch() {
    $.get('components/search/search.html', function(data){ 
        $('#home').html(data);

        $('select').formSelect();

        $('#dest-evac-search div.select-wrapper').addClass('hide');
        $('.select-wrapper input.select-dropdown').addClass('mb-0');

        if(typeof window.searchjs == 'undefined') {
            $.getScript('components/search/search.js');
        }
    });
}
function showMap() {
    $.get('components/map/map.html', function(data){ 
        $('#home').append(data);

        var div = document.getElementById("map");
        var map = plugin.google.maps.Map.getMap(div, {
            'camera': {
                target: {lat: 17.6029987, lng: 121.76294440000001},
                zoom: 5
            },
            'preferences': {
                'zoom': {
                    'minZoom': 10,
                    'maxZoom': 20
                }
            }
        });
        map.one(plugin.google.maps.event.MAP_READY, function(map){ 
            console.log("Ready"); 

            $.getJSON('data/data.json', function(data){
                    latLngBounds = new plugin.google.maps.LatLngBounds(data.points);
                    var bounds = {
                        north : latLngBounds.northeast.lat,
                        south : latLngBounds.southwest.lat,
                        east : latLngBounds.northeast.lng,
                        west : latLngBounds.southwest.lng
                    };
                    var expand = 0.30;
                    var rectangle = [
                    { "lat": bounds.north + expand, "lng": bounds.west - expand },
                    { "lat": bounds.south - expand, "lng": bounds.west - expand },
                    { "lat": bounds.south - expand, "lng": bounds.east + expand },
                    { "lat": bounds.north + expand, "lng": bounds.east + expand },
                    ];
                    map.addPolygon({
                        points: rectangle,
                        holes: data.points,
                        strokeColor: "#00C853",
                        strokeWidth: 3,
                        fillColor: "#BDBDBD"
                    });
                    map.animateCamera({
                        target : latLngBounds.getCenter(),
                        zoom : 13
                    });
                });
        });

        $.getScript('components/map/map.js');
    });
}
function showLogin() {
    $.get('components/login/login.html', function(data){ 
        $('#users').html(data);

        if(typeof window.loginjs == 'undefined') {
            $.getScript('components/login/login.js');
        }
    });
}
function showRegister() {
    $.get('components/register/register.html', function(data){ 
        $('#users').html(data);

        if(typeof window.registerjs == 'undefined') {
            $.getScript('components/register/register.js')
        }
    });
}
function showProfile() {
    $.get('components/profile/profile.html', function(data){ 
        $('body').append(data);

        $.getJSON(cordova.file.externalDataDirectory + 'config.json', function(data){
            $('#form_profile #account_id').val(data.account.id);
            $('#form_profile #firstname').val(data.account.firstname);
            $('#form_profile #lastname').val(data.account.lastname);
            $('#form_profile #username').val(data.account.username);
            $('#form_profile #password').val(data.account.password);
            $('#form_profile #confirm_password').val(data.account.password);
            M.updateTextFields();
        });

        if(typeof window.profilejs == 'undefined') {
            $.getScript('components/profile/profile.js')
        }
    });
}

function calculateAndDisplayRoute(from, to, callback) {

    var directionsService = new google.maps.DirectionsService;

    directionsService.route({
        origin: from,
        destination: to,
        travelMode: 'DRIVING'
    }, function(response, status) {
            console.log(status);
        if (status === 'OK') {
            callback(response.routes[0].overview_polyline);
        } else {
            console.log('Directions request failed due to ' + status);
        }
    });
}
function calculateDistanceMatrix(origin, destination, callback) {
    var service = new google.maps.DistanceMatrixService;

    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            var results = response.rows[0].elements;
            callback(results[0].distance.text, results[0].duration.text);
        }
    });
}
function decode(encoded, callback) {
    var points = [];
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;
    while (index < len) {
        var b, shift = 0, result = 0;
        do {
            b = encoded.charAt(index++).charCodeAt(0) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
        lat += dlat;
        shift = 0;
        result = 0;
        do {
            b = encoded.charAt(index++).charCodeAt(0) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        points.push({"lat":( lat / 1E5), "lng":( lng / 1E5)})  
    }
    callback(points);
}
function searchDestination(destination) {
    var div = document.getElementById("map");
    var plug = plugin.google.maps.Map.getMap(div);

    var option = {
        enableHighAccuracy: true
    };

    if(destinationPolyLine) {   
        destinationPolyLine.remove();
        routePoints[0].remove();
        routePoints[1].remove();
    }

    //var currentLocation = new google.maps.LatLng(17.6029987, 121.76294440000001);
    plug.getMyLocation(option, function(location){
       // alert('asd');
        var currentLocation = {lat: location.latLng.lat, lng: location.latLng.lng};
        calculateAndDisplayRoute(currentLocation, destination, function(data){

            decode(data, function(decodedPolyLine){

                var destinationPolyLine = plug.addPolyline({
                    points: decodedPolyLine,
                    color: '#2196f3',
                    width: 10,
                    geodesic: true
                });

                calculateDistanceMatrix(currentLocation, destination, function(distance, duration){
                    var pin = '../img/logo.png';

                    routePoints0 = plug.addMarker({
                        position: decodedPolyLine[0],
                        title: "You are here!",
                        icon: 'red',
                    }, function(routePoints0) {
                        routePoints0.showInfoWindow();
                    });

                    routePoints1 = plug.addMarker({
                        position: decodedPolyLine[decodedPolyLine.length - 1],
                        title: destination + "\nDistance: " + distance + "\nDuration: " + duration,
                        icon: 'red',
                    }, function(routePoints1) {
                        routePoints1.showInfoWindow();

                    });

                    //var x = routePoints[0];
                    //var y = routePoints[1];
                    //x.showInfoWindow();
                    //y.showInfoWindow();
                    console.log(decodedPolyLine);
                    map.animateCamera({
                        target : decodedPolyLine,
                    });
                    
                });
            });
        });

    }, 

    function(msg){
        console.log('bsg' + JSON.stringify(msg));
    }
    );
}

app.initialize();

