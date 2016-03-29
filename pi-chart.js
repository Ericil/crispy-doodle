var d = {alaska:[13,3,0],alabama:[9,44,0],arkanas:[10,22,0],arizona:[30,44,0],colorado:[38,28,0],florida:[70,141,0],georgia:[29,73,0],hawaii:[8,17,0],iowa:[50,50,0],idaho:[17,5,0],illnois:[73,76,0],kansas:[24,9,0],lousiana:[14,37,0],massachusetts:[45,46,0],maine:[16,9,0],michigan:[67,63,0],minnesota:[46,31,0],missouri:[34,34,0],mississippi:[4,32,0],north_carolina:[45,59,0],nebraska:[15,10,0],new_hampshire:[15,9,0],nevada:[15,20,0],ohio:[62,81,0],oklahoma:[21,17,0],south_carolina:[14,39,0],tennessee:[23,44,0],texas:[75,147,0],utah:[26,6,0],virgina:[33,62,0],vermont:[16,0,0],washington:[25,9,0],all:[1004,1712,0]};
console.log("on");
var r = {something:[1,1,0],something2:[1,2,0]};
var current = "d";
var button = document.getElementById("button");

var form_d = document.createElement('form');
var inputDrop_d = document.createElement('select');
    form_d.appendChild(inputDrop_d);
    
    for(var key in d){
	var state = document.createElement('option');
	state.value=key;
	state.innerHTML=key;
	inputDrop_d.appendChild(state);
    }
    
    form_d.appendChild(inputDrop_d);

document.body.appendChild(form_d);

var form_r = document.createElement('form');
var inputDrop_r = document.createElement('select');
    form_r.appendChild(inputDrop_r);
    
    for(var key in r){
	var state = document.createElement('option');
	state.value=key;
	state.innerHTML=key;
	inputDrop_r.appendChild(state);
    }
    
    form_r.appendChild(inputDrop_r);

document.body.appendChild(form_r);




var odisplay = document.createElement('p');
var otext = document.createTextNode(d["alaska"][0] + " " + d["alaska"][1]);
odisplay.appendChild(otext);
document.body.appendChild(odisplay);

var hold = odisplay;
inputDrop_d.addEventListener('change', function(){
    
    var display = document.createElement('p');
    var text = document.createTextNode(d[inputDrop_d.value][0] + " " + d[inputDrop_d.value][1]);
    display.appendChild(text);
    document.body.replaceChild(display,hold);
    hold = display;
    console.log(document.body);
    render();
    console.log(document.body.childNodes);
});

inputDrop_r.addEventListener('change', function(){
    
    var display = document.createElement('p');
    var text = document.createTextNode(r[inputDrop_r.value][0] + " " + r[inputDrop_r.value][1]);
    display.appendChild(text);
    document.body.replaceChild(display,hold);
    hold = display;
    console.log(document.body);
    render();
    console.log(document.body.childNodes);
});

var width = 960;
var height = 500;

var color = d3.scale.category20();

// draw and append the container
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// set the thickness of the radius
var min = Math.min(width, height);
var Radius = min / 2;

// construct pie laoyut
var pie = d3.layout.pie().value(function(d){ return d; }).sort(null);

// construct arc generator
var arc = d3.svg.arc()
    .outerRadius(Radius);

// creates the pie chart container
var g = svg.append('g')
var g = svg.append('g')
    .attr('transform', function(){
	var shiftWidth = width / 2;
	return 'translate(' + shiftWidth + ',' + height / 2 + ')';
    });

var data = [ d[inputDrop_d.value][0]/(d[inputDrop_d.value][0] + d[inputDrop_d.value][1]), d[inputDrop_d.value][1]/( d[inputDrop_d.value][0] + d[inputDrop_d.value][1])];


// enter data and draw pie chart
var path = g.datum(data).selectAll("path")
    .data(pie)
    .enter().append("path")
    .attr("class","piechart")
    .attr("fill", function(d,i){ return color(i); })
    .attr("d", arc)
    .each(function(d){ this._current = d; })

	function render(){
	    data = [ d[inputDrop_d.value][0]/(d[inputDrop_d.value][0] + d[inputDrop_d.value][1]), d[inputDrop_d.value][1]/( d[inputDrop_d.value][0] + d[inputDrop_d.value][1])];
	    // add transition to new path
	    g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
	    
	    // add any new paths
	    g.datum(data).selectAll("path")
		.data(pie)
		.enter().append("path")
		.attr("class","piechart")
		.attr("fill", function(d,i){ return color(i); })
		.attr("d", arc)
		.each(function(d){ this._current = d; })
		    
		    // remove data not being used
		    g.datum(data).selectAll("path")
		.data(pie).exit().remove();
	}

//render();
//setInterval(render(), 2000);




// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
	return arc(i(t));
    };
}
