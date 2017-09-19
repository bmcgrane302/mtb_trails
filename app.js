console.log("test");
$(document).ready(function() {

   $.get('https://maps.googleapis.com/maps/api/geocode/json?address=Denver&key=AIzaSyBu39EW2ha5zCYSHB6GefXJklnw4-9RdSs', function(data) {
      console.log(data);
    });








});


var map;
var service;
var infowindow;

function initMap() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    query: 'bike shops'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results)
  }
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  // var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    // placesList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
