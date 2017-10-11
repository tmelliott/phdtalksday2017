function graphs() {
  // load all the graphs ...

  var aklmap = aklMap();

  var busdata = [];
  var points_visible = false;
  d3.csv("data/vehicles.csv", function(d) {
    return {
      id: d.id,
      lat: +d.lat,
      lng: +d.lng,
      route: d.route
    };
  }, function(data) {
    busdata = data;
  });

  Reveal.addEventListener('titlepage', function() {
    // remove points, if they exist!
    points_visible = removePoints();
  });
  Reveal.addEventListener('showpoints', function() {
    if (busdata.length == 0) {
      alert("Data isn't loaded yet :(");
      return;
    }
    // add points, if they don't already
    if (points_visible) return;
    points_visible = addPointsToMap(busdata, aklmap);
  });
}


function aklMap(map) {
  var zoom = 11;
  var aklmap = new L.Map("aklMap", {
    center: [-36.845794, 174.860478],
    zoom: zoom,
    zoomControl: false,
    attributionControl: false
  });
  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19
  }).addTo(aklmap);
  // L.control.attribution({position: 'bottomleft'}).addTo(aklmap);

  // aklmap._initPathRoot();


  return aklmap;
}


function addPointsToMap(data, map) {
  var svg = d3.select(map.getPanes().overlayPane)
        .append("svg")
          .attr("height", $("#aklMap").height())
          .attr("width", $("#aklMap").width()),
      g = svg.append("g");
  var points = svg.selectAll("circle")
    .data(data).enter()
      .append("circle");

  return true;
}

function removePoints() {
  return false;
}
