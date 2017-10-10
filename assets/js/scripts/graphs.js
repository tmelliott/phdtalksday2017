function graphs() {
  // load all the graphs ...
  test();
}

function test() {
  var svg = d3.select("#testGraph").append("svg")
      .attr("width", 800)
      .attr("height", 500),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  var radius = 20;
  var circle_data = d3.range(50).map(function() {
      return{
          x : Math.round(Math.random() * (width - radius*2 ) + radius),
          y : Math.round(Math.random() * (height - radius*2 ) + radius)
      };
  });

  var circles = svg.append("g")
    .attr("class", "circles")
    .selectAll("circle")
        .data(circle_data)
        .enter()
          .append("circle")
          .attr("cx", function(d) {return(d.x)})
          .attr("cy", function(d) {return(d.y)})
        .attr("r", radius);
}
