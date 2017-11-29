
function loadEtaGraph () {

    etadata = [{"time":32,"eta":10},{"time":33,"eta":9},{"time":34,"eta":8},{"time":35,"eta":7},
        {"time":36,"eta":6},{"time":37,"eta":8},{"time":38,"eta":7},{"time":39,"eta":6},{"time":40,"eta":6},
        {"time":41,"eta":5},{"time":42,"eta":4},{"time":43,"eta":3},{"time":44,"eta":2},{"time":45,"eta":1},
        {"time":46,"eta":0},{"time":47,"eta":-1},{"time":48,"eta":0}];

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = $("#ETAgraph").width() - margin.left - margin.right,
        height = $("#ETAgraph").height() - margin.top - margin.bottom;

    xl = 
        d3.scaleLinear()
            .domain([30, 50])
            .range([0, width]);
    // yl = 
    //     d3

    // etagraph = 
    //     d3.select("#ETAgraph").append("svg")
    //         .attr("width")

}