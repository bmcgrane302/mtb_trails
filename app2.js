
$('button').click(e => {
  e.preventDefault();
  initMap();
})

var map;

function initMap() {
  var center = new google.maps.LatLng(32.7766642,-96.79698789999999);
  map = new google.maps.Map(document.getElementById('map'),{
    center: center,
    zoom: 13
  });

  var request = {
    location: center,
    radius: 10000,
    types: 'bike'
  };

  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for(var i = 0; i < results.length; i ++){
      createMarker(results[i]);
    }
  }
}
function createMarker(place){
  var placeLoc = place.geometry.location;
  var marker = google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
}
