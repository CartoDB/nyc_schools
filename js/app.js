map        = null,
paths      = [],
infowindow = null;

CONFIG = {
  dataURL:         "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(rs.the_geom)%20as%20rs_longitude,%20ST_Y(rs.the_geom)%20as%20rs_latitude,ST_X(hs.the_geom)%20as%20hs_longitude,%20ST_Y(hs.the_geom)%20as%20hs_latitude,ST_AsGeoJSON(sd.the_geom,4)%20as%20route,rs.relocating_school_bn,rs.host_bldg_id,directions_time,address_of_relocating_school,%20hs.host_bldg_name,rs.name_of_relocating_school%20FROM%20schools_directions%20as%20sd%20INNER%20JOIN%20relocating_schools%20as%20rs%20ON%20sd.relocating_school_bn=rs.relocating_school_bn%20INNER%20JOIN%20host_schools%20as%20hs%20ON%20hs.host_bldg_id=rs.host_bldg_id",
  relocatingURL:   "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,%20ST_Y(the_geom)%20as%20latitude,%20address_of_relocating_school,borough,grade_levels_that_are_relocating,host_bldg_id%20FROM%20relocating_schools",
  hostingURL:      "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,ST_Y(the_geom)%20as%20latitude,host_bldg_address,host_bldg_id,host_bldg_name,host_boro%20FROM%20host_schools",
  pathURL:         "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_AsGeoJSON(the_geom),relocating_school_bn,host_bldg_id,directions_time%20FROM%20schools_directions",
  pathStyle:       {"strokeColor": "#333", "strokeWeight": 2, "strokeOpacity": .8 },
  hostingIcon:     { path: google.maps.SymbolPath.CIRCLE, fillColor: "black", fillOpacity: 0.8, scale: 5, strokeColor: "black", strokeWeight: 0 },
  relocatingIcon:  { path: google.maps.SymbolPath.CIRCLE, fillColor: "red",   fillOpacity: 0.8, scale: 5, strokeColor: "red",   strokeWeight: 0 },
};

window.paths = paths;

function addMarker(map, type, coordinates, data) {

  var icon = null;

  if (type == "hosting") {
    icon = CONFIG.hostingIcon
  } else {
    icon = CONFIG.relocatingIcon
  }

  return new google.maps.Marker({
    position: new google.maps.LatLng(coordinates[0], coordinates[1]),
    icon: icon,
    map: map,
    type: type,
    data: data
  });
}


function drawPath(route) {
  var geo  = JSON.parse(route);
  var path = new GeoJSON(geo, CONFIG.pathStyle);
  path[0].setMap(map);
  return path[0];
}

function selectPath(e) {
  var that = this;

  _.each(paths, function(p) {
    if (p.data.host_bldg_id != that.data.host_bldg_id) p.path.setMap(null);
    else p.path.setMap(map);
  });


  if (this.type != "hosting") {
    if (this.data.address_of_relocating_school) {
      var content = "<p><strong>address of relocating school</strong><br />" +
        this.data.address_of_relocating_school+"</p>";
    }
  }

  infowindow.setContent(content);
  infowindow.setPosition(e.latLng);
  infowindow.open();


}

function draw() {

  $.ajax({ url: CONFIG.dataURL, success: function(data) {

    var results = data.rows;
    _.each(results, function(p) {

      var hosting    = addMarker( map, "hosting",    [p.hs_latitude, p.hs_longitude], p );
      var relocating = addMarker( map, "relocating", [p.rs_latitude, p.rs_longitude], p );

      paths.push({ data: p, hosting: hosting, relocating: relocating, path: drawPath(p.route) });

      google.maps.event.addListener(relocating, 'click', selectPath);
      google.maps.event.addListener(hosting,    'click', selectPath);

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

  draw();

  infowindow = new CartoDBInfowindow(map);
}


