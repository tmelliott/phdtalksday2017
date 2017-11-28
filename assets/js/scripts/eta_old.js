function loadoldETAs () {
    var width = $("#ETA1").width(),
        height = $("#ETA1").height();

    window.etasvg = 
        d3.select("#ETA1").append("svg")
            .attr("width", width + "px")
            .attr("height", height + "px");

    xl = 
        d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);
    yl = 
        d3.scaleLinear()
            .domain([10, -10])
            .range([height, 0]);
    linefun = 
        d3.line()
            .x(function(d) { return xl(d.x); })
            .y(function(d) { return yl(d.y); });

    etalinedata = [{"x": 0, "y": 0}, {"x": 100, "y": 0}];
    etasvg.append("path").attr("class", "routeline")
        .attr("d", linefun(etalinedata));

    var state = Reveal.getCurrentSlide().attributes["data-state"];
    if (state == undefined) return;
    if (state.value == "currentETAs") oldETAs();
    Reveal.addEventListener("currentETAs", oldETAs);
    Reveal.addEventListener("fragmentshown", oldETAs2);
    Reveal.addEventListener("fragmenthidden", oldETAs2);
}

function oldETAs () {
    etastops = [{"x": 10}, {"x": 30}, {"x": 50}, {"x": 90}];
    etasvg.selectAll(".routestop")
        .data(etastops)
        .enter()
            .append("circle").attr("class", "routestop")
            .attr("cx", function(d) { return xl(d.x); })
            .attr("cy", yl(0))
            .attr("r", 10)
            .attr("opacity", 0)
            .transition().delay(function(d) { return d.x * 10 + 500; })
                .duration(500)
                .attr("r", 3)
                .attr("opacity", 1);

    // buspos = 
}

function oldETAs2 () {
    var state = Reveal.getCurrentSlide().attributes["data-state"];
    if (state == undefined) return;
    if (state.value != "currentETAs") return;

    var f = Reveal.getState().indexf;
    switch(f) {
        case 0:
            console.log('bus arrives first stop; delay = 3min');
            break;
    }
}