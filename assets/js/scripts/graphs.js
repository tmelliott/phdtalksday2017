function graphs() {
  // load all the graphs ...

  aklMap();

  busdata = [];
  points_visible = false;
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
    removePoints();
  });
  Reveal.addEventListener('showpoints', function() {
    if (busdata.length == 0) {
      alert("Data isn't loaded yet :(");
      return;
    }
    // add points, if they don't already
    if (points_visible) return;
    addPointsToMap(busdata, aklmap);
  });
}


function aklMap() {
  aklmap = new L.Map("aklMap", {
    center: [-36.845794, 174.860478],
    zoom: 11,
    zoomControl: false,
    attributionControl: false
  });
  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19
  }).addTo(aklmap);
  // L.control.attribution({position: 'bottomleft'}).addTo(aklmap);
}


function addPointsToMap() {
  aklsvg = d3.select(aklmap.getPanes().overlayPane)
        .append("svg")
          .attr("height", $("#aklMap").height())
          .attr("width", $("#aklMap").width());
        //  g = aklsvg.append("g");

  // modify the data
  busdata.forEach(function(d) {
    d.pt = project(d.lng, d.lat);
  });

  aklbuses = aklsvg.selectAll("circle")
    .data(busdata, function(d) { return d.id; })
    .enter()
      .append("circle")
      .attr("cx", function(d) { return d.pt.x; })
      .attr("cy", function(d) { return d.pt.y; })
      .attr("r", 5)
      .attr("opacity", 0)
        .transition().delay(500)
          .duration(function(d) { return Math.floor(Math.random() * 5000); })
          .attr("opacity", 1)
          .attr("r", 2);

  points_visible = true;
}

function removePoints() {
  aklsvg.selectAll("circle")
    .transition()
      .duration(function(d) { return Math.floor(Math.random() * 1000); })
      .attr("opacity", 0)
      .remove();

  points_visible = false;
}


function project(x, y) {
  var pt = aklmap.latLngToLayerPoint(new L.LatLng(y, x));
  return pt;
}
