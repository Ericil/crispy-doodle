var dem = [{
    "turnout": "15.8",
    "year": "1980"
}, {
    "turnout": "17.1",
    "year": "1984"
}, {
    "turnout": "16.7",
    "year": "1988"
}, {
    "turnout": "13.4",
    "year": "1992"
}, {
    "turnout": "8.4",
    "year": "1996"
}, {
    "turnout": "8.4",
    "year": "2000"
}, {
    "turnout": "9.9",
    "year": "2004"
}, {
    "turnout": "19.5",
    "year": "2008"
}, {
    "turnout": "6.3",
    "year": "2012"
}];
    
var rep = [{
    "turnout": "11.6",
    "year": "1980"
}, {
    "turnout": "7.0",
    "year": "1984"
}, {
    "turnout": "9.5",
    "year": "1988"
}, {
    "turnout": "9.1",
    "year": "1992"
}, {
    "turnout": "9.3",
    "year": "1996"
}, {
    "turnout": "10.5",
    "year": "2000"
}, {
    "turnout": "6.6",
    "year": "2004"
}, {
    "turnout": "11.0",
    "year": "2008"
}, {
    "turnout": "9.8",
    "year": "2012"
}];

var total = [{
    "turnout": "25.7",
    "year": "1980"
}, {
    "turnout": "21.2",
    "year": "1984"
}, {
    "turnout": "25.2",
    "year": "1988"
}, {
    "turnout": "21.9",
    "year": "1992"
}, {
    "turnout": "16.7",
    "year": "1996"
}, {
    "turnout": "17.7",
    "year": "2000"
}, {
    "turnout": "14.7",
    "year": "2004"
}, {
    "turnout": "30.4",
    "year": "2008"
}, {
    "turnout": "29.0",
    "year": "2012"
}];



var svg = d3.select("#linechart"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 50
    }

xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1980, 2012]);

yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 35]);

xAxis = d3.svg.axis()
    .scale(xScale);

yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


svg.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

svg.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);


var line = d3.svg.line()
    .x(function(d) {
	return xScale(d.year);
    })
    .y(function(d) {
	return yScale(d.turnout);
    })

svg.append("svg:path")
    .attr("d", line(dem))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

svg.append("svg:path")
    .attr("d", line(rep))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "none");

svg.append("svg:path")
    .attr("d", line(total))
    .attr("stroke", "gold")
    .attr("stroke-width", 2)
    .attr("fill", "none");

