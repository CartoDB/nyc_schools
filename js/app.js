var map, infowindow;
var pathStyle = {"strokeColor": "#FFFF00", "strokeWeight": 7, "strokeOpacity": 0.75 }

function addMarker(map, type, lat, lng) {

  var icon = null;

  if (type == "hosting") {
    icon = { path: google.maps.SymbolPath.CIRCLE, fillColor: "green", fillOpacity: 0.8, scale: 3, strokeColor: "green", strokeWeight: 2 };
  } else {
    icon = { path: google.maps.SymbolPath.CIRCLE, fillColor: "red", fillOpacity: 0.7, scale: 3, strokeColor: "red", strokeWeight: 2 };
  }

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    icon: icon,
    map: map,
    type: type
  });


  google.maps.event.addListener(marker, 'click', onMarkerClick);

}

function onMarkerClick(event) {
  console.log(this, event);

  // Set infowindow content
  infowindow.setContent("<p>"+this.type+"</p>");

  // Set infowindow latlng
  infowindow.setPosition(event.latLng);

  // Show it!
  infowindow.open();
}

function getRelocatingSchools() {

  var url = "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,%20ST_Y(the_geom)%20as%20latitude,%20address_of_relocating_school,borough,grade_levels_that_are_relocating,host_bldg_id%20FROM%20relocating_schools";
  $.ajax({ url: url, success: function(data) {

    _.each(data.rows, function(d) {
      addMarker(map, "relocating", d.latitude, d.longitude);
    });


  }});

}

function getHostingSchools() {

  var url = "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,ST_Y(the_geom)%20as%20latitude,host_bldg_address,host_bldg_id,host_bldg_name,host_boro%20FROM%20host_schools";
  $.ajax({ url: url, success: function(data) {
    _.each(data.rows, function(d) {
      addMarker(map, "hosting", d.latitude, d.longitude);
    });
  }});

}

function getLines() {

}


function draw() {

  var geo = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "st_astext": "MULTILINESTRING((-71.160281 42.258729,-71.160837 42.259113,-71.161144 42.25932))"
      },
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [
            [-71.160281, 42.258729],
            [-71.160837, 42.259113],
            [-71.161144, 42.25932]
          ]
        ]
      }
    }]
  }

  var path = new GeoJSON(geo, pathStyle);

  path[0][0].setMap(map);
}


function init() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(40.7143528, -74.0059731),
    disableDefaultUI: false,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  });

  getRelocatingSchools();
  getHostingSchools();

  draw();
  infowindow = new CartoDBInfowindow(map);


}


