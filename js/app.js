
var map, infowindow, cartodb_gmaps1, cartodb_gmaps2;


function getRelocatingSchools() {

  var url = "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,%20ST_Y(the_geom)%20as%20latitude,%20address_of_relocating_school,borough,grade_levels_that_are_relocating,host_bldg_id%20FROM%20relocating_schools";
  $.ajax({ url: url, success: function(data) {
    console.log(data);
  }});

}

function getHostingSchools() {

  var url = "http://wsjgraphics.cartodb.com/api/v1/sql?q=SELECT%20ST_X(the_geom)%20as%20longitude,ST_Y(the_geom)%20as%20latitude,host_bldg_address,host_bldg_id,host_bldg_name,host_boro%20FROM%20host_schools";
  $.ajax({ url: url, success: function(data) {
    console.log(data);
  }});

}

function init() {



  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(7.369722, 12.354722),
    disableDefaultUI: false,
    zoom: 3,
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


