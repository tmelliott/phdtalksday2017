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

  d3.csv("data/route110.csv", function(d) {
    return {
      lat: +d.lat,
      lng: +d.lng,
    };
  }, function(data) {
    demoroute = data;
  });

  myhistory();

  Reveal.addEventListener('aim', function() {
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
  Reveal.addEventListener('route110', function() {
    demoRoute();
  });
  Reveal.addEventListener("fragmentshown", doParticles);
  Reveal.addEventListener("fragmenthidden", doParticles);
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
  aklsvg = d3.select(aklmap.getPanes().overlayPane)
        .append("svg");
}


function addPointsToMap() {
  // d3.select(".aklsvgoverlay").remove();
  aklsvg = d3.select(aklmap.getPanes().overlayPane)
        .select("svg").attr("class", "aklsvgoverlay")
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
  if (aklmap.getZoom () != 11) {
    var cnt = [-36.845794, 174.860478];
    aklmap.flyTo(cnt, 11);
  }

  aklsvg.selectAll("circle")
    .transition()
      .duration(function(d) { return Math.floor(Math.random() * 1000); })
      .attr("opacity", 0)
      .remove();

  aklsvg.selectAll("path")
    .transition()
      .duration(100)
      .attr("opacity", 0)
      .remove();


  points_visible = false;
}


function project(x, y) {
  var pt = aklmap.latLngToLayerPoint(new L.LatLng(y, x));
  return pt;
}



function demoRoute() {
  removePoints();
  setTimeout(function() {
    var cnt = [-36.843871, 174.685693];
    aklmap.flyTo(cnt, 13);
  }, 1000);
  setTimeout(addRouteLine, 2500);
}

function addRouteLine() {
  aklsvg = d3.select(aklmap.getPanes().overlayPane)
        .select("svg").attr("class", "aklsvgoverlay")
          .attr("height", $("#aklMap").height())
          .attr("width", $("#aklMap").width());

  // modify the data
  demoroute.forEach(function(d) {
    d.pt = project(d.lng, d.lat);
  });

  var lineFun = d3.line()
      .x(function(d) { return d.pt.x; })
      .y(function(d) { return d.pt.y; });

  routepath = aklsvg.append("path")
    .attr("class", "routeline")
    .attr("d", lineFun(demoroute))
    .attr("opacity", 0)
    .transition()
      .duration(500)
      .attr("opacity", 1);

  var path = routepath._groups[0][0];
  particles = [
    {"d": 100}, 
    {"d": 110}, 
    {"d": 120}, 
    {"d": 120}, 
    {"d": 130}, 
    {"d": 130}, 
    {"d": 130}, 
    {"d": 140}, 
    {"d": 140}, 
    {"d": 150}
  ];
  particles.forEach(function(d) { 
    d.pt = path.getPointAtLength(d.d); 
  });
}

function doParticles() {
  var state = Reveal.getCurrentSlide().attributes["data-state"];
  if (state == undefined) return;
  if (state.value != "route110") return;
  var f = Reveal.getState().indexf;
  switch(f) {
    case 0: 
      addParticles();
    case 1:
      console.log("ok");
  }
}

function addParticles() {
   aklbuses = aklsvg.selectAll(".particle")
    .data(particles, function(d) { return d.id; })
    .enter()
      .append("circle")
      .attr("class", "particle")
      .attr("cx", function(d) { return d.pt.x; })
      .attr("cy", function(d) { return d.pt.y; })
      .attr("r", 5)
      .attr("opacity", 0)
        .transition().delay(500)
          .duration(500)
          .attr("opacity", 1);
}