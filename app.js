console.log("test");
$(document).ready(function() {
});

$('button').click(e => {
  e.preventDefault();
  initMap();
})

var map;
var service;
var infowindow;

function initMap() {
  let userInput = document.getElementById('state').value;
  let userInput2 = document.getElementById('city').value;
  console.log(userInput);
  console.log(userInput2);

  $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInput2}+${userInput}&key=AIzaSyBu39EW2ha5zCYSHB6GefXJklnw4-9RdSs`, function(data) {
    console.log(data);

    var lat = data.results["0"].geometry.location.lat;
    console.log(lat);
    var lng = data.results["0"].geometry.location.lng;
    console.log(lng);

    var pyrmont = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    var request = {
      location: pyrmont,
      radius: '10000',
      query: 'bike'
    };
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results)
  }
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
   //var placesList = document.getElementById('places');

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
    console.log(place.name);
    var content = place.name;
    marker.addListener('click', function() {
             infowindow.setContent(content);
             infowindow.open(map, this);
           });
     //placesList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
  }

  map.fitBounds(bounds);
}
