$(function() {

var map = new google.maps.Map(document.getElementById('map'), {
  center: new google.maps.LatLng(20, 0),
  zoom: 3,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  mapTypeControl: false
});

var cartodb_gmapsv3 = new CartoDBLayer({
  map: map,
  user_name:'examples',
  table_name: 'earthquakes',
  query: "SELECT * FROM {{table_name}}",
  layer_order: "top",
  tile_style: "#{{table_name}}{marker-fill:red}",
  interactivity: "cartodb_id, magnitude",
  featureClick: function(feature, latlng, pos, data) {alert(feature)},
  featureOut: function() {},
  featureOver: function(feature, latlng, pos, data) {},
  auto_bound: true
});

});
