
var map, infowindow, cartodb_gmaps1, cartodb_gmaps2;

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
  //console.log(this);
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

  //infowindow = new CartoDBInfowindow(map);

  /*cartodb_gmaps2 = new CartoDBLayer({
    map: map,
    user_name:"wsjgraphics",
    table_name: 'relocating_schools',
    query: "SELECT the_geom_webmercator, ST_X(the_geom) as longitude, ST_Y(the_geom) as latitude, address_of_relocating_school,borough,grade_levels_that_are_relocating,host_bldg_id FROM {{table_name}}",
    //tile_style: "#{{table_name}}{marker-fill:#E25B5B}",
    //interactivity: "cartodb_id",
    opacity:1,
    featureOver: function(ev, latlng, pos, data) {
    map.setOptions({draggableCursor: 'pointer'});
    },
    featureOut: function() {
    map.setOptions({draggableCursor: 'default'});
    },
    featureClick: function(ev, latlng, pos, data) {
    //ev.stopPropagation ? ev.stopPropagation() : window.event.cancelBubble = true;

    // Set infowindow content
    infowindow.setContent(data);

    // Set infowindow latlng
    infowindow.setPosition(latlng);

    // Show it!
    infowindow.open();
    },
    auto_bound: false,
    debug: true
    });*/





    /*google.maps.event.addListener(cartodb_gmaps2,"removed",function(){
      if ('console' in self && 'log' in console) console.log("removed")
      });

      google.maps.event.addListener(cartodb_gmaps2,"added",function(){
      if ('console' in self && 'log' in console) console.log("added")
      });

      google.maps.event.addListener(cartodb_gmaps2,"updated",function(){
      if ('console' in self && 'log' in console) console.log("updated")
      });

      google.maps.event.addListener(cartodb_gmaps2,"shown",function(){
      if ('console' in self && 'log' in console) console.log("shown")
      });

      google.maps.event.addListener(cartodb_gmaps2,"hidden",function(){
      if ('console' in self && 'log' in console) console.log("hidden")
      });

      google.maps.event.addListener(cartodb_gmaps2,"tileerror",function(){
      if ('console' in self && 'log' in console) console.log("tile - error")
      });

      google.maps.event.addListener(cartodb_gmaps2,"loading",function(){
      if ('console' in self && 'log' in console) console.log("loading")
      });

      google.maps.event.addListener(cartodb_gmaps2,"loaded",function(){
      if ('console' in self && 'log' in console) console.log("loaded")
      });*/

}


