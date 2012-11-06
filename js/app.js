var map, infowindow;


CONFIG = {
  relocatingURL: "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,%20ST_Y(the_geom)%20as%20latitude,%20address_of_relocating_school,borough,grade_levels_that_are_relocating,host_bldg_id%20FROM%20relocating_schools",
  hostingURL:    "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,ST_Y(the_geom)%20as%20latitude,host_bldg_address,host_bldg_id,host_bldg_name,host_boro%20FROM%20host_schools",
  pathURL:       "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_AsGeoJSON(the_geom),relocating_school_bn,host_bldg_id,directions_time%20FROM%20schools_directions",
  pathStyle:     {"strokeColor": "red", "strokeWeight": 7, "strokeOpacity": 1 }
};

function addMarker(map, type, data) {

  var icon = null;

  if (type == "hosting") {
    icon = { path: google.maps.SymbolPath.CIRCLE, fillColor: "green", fillOpacity: 0.8, scale: 3, strokeColor: "green", strokeWeight: 2 };
  } else {
    icon = { path: google.maps.SymbolPath.CIRCLE, fillColor: "red", fillOpacity: 0.7, scale: 3, strokeColor: "red", strokeWeight: 2 };
  }

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.latitude, data.longitude),
    icon: icon,
    map: map,
    type: type,
    data: data
  });


  google.maps.event.addListener(marker, 'click', onMarkerClick);

}

function onMarkerClick(event) {
  //console.log(this, event);

  if (this.type != "hosting") {
    if (this.data.address_of_relocating_school) {
      var content = "<p><strong>address of relocating school</strong><br />" +
        this.data.address_of_relocating_school+"</p>";
    }
  }

  infowindow.setContent(content);
  infowindow.setPosition(event.latLng);
  infowindow.open();
}

function addPoints(url, type) {

  $.ajax({ url: url, success: function(data) {

    _.each(data.rows, function(d) {
      addMarker(map, type, d);
    });

  }});

}


function draw() {


  $.ajax({ url: CONFIG.pathURL, success: function(data) {

    var results = data.rows;

    _.each(results, function(p) {
      var geo = JSON.parse(p.st_asgeojson);
      var path = new GeoJSON(geo, CONFIG.pathStyle);
      path[0].setMap(map);
    });

  }});

}


function init() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(40.7143528, -74.0059731),
    disableDefaultUI: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoom: 11,
  });

  addPoints(CONFIG.relocatingURL, "relocating");
  addPoints(CONFIG.hostingURL,    "hosting");

  draw();
  infowindow = new CartoDBInfowindow(map);
}


