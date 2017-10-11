function graphs() {
  // load all the graphs ...

  var aklmap;
  aklMap();

  var busdata = [1,2,3];
  Reveal.addEventListener('titlepage', function() {
    // remove points, if they exist!
  });
  Reveal.addEventListener('showpoints', function() {
    // add points, if they don't already
  });
}


function aklMap() {
  var zoom = 11;
  aklmap = new L.Map("aklMap", {
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
}
