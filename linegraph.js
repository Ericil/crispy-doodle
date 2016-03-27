var margin = {top: 20, right: 100, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//voter turnout data for new york
var dataset = [
    {x: 2000, y: 25.4},
    {x: 2004, y: 20.1},
    {x: 2008, y: 19.5},
    {x: 2012, y: 1.4},
];

var xScale = d3.scale.linear()
    .domain([2000, d3.max(dataset, function(d){ return d.x; })])
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([0,30])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10);

//starts drawing the line
var line = d3.svg.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });
      
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

//axis label for x
svg.append("text")      
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text("Year");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

//y axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", - (height/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Voter Turnout %")

svg.append("path")
    .data([dataset])
    .attr("class", "line")
    .attr("d", line);
