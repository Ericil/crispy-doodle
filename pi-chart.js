var d = {alaska:[13,3,0],alabama:[9,44,0],arkanas:[10,22,0],arizona:[30,44,0],colorado:[38,28,0],florida:[70,141,0],georgia:[29,73,0],hawaii:[8,17,0],iowa:[50,50,0],idaho:[17,5,0],illnois:[73,76,0],kansas:[24,9,0],lousiana:[14,37,0],massachusetts:[45,46,0],maine:[16,9,0],michigan:[67,63,0],minnesota:[46,31,0],missouri:[34,34,0],mississippi:[4,32,0],north_carolina:[45,59,0],nebraska:[15,10,0],new_hampshire:[15,9,0],nevada:[15,20,0],ohio:[62,81,0],oklahoma:[21,17,0],south_carolina:[14,39,0],tennessee:[23,44,0],texas:[75,147,0],utah:[26,6,0],virgina:[33,62,0],vermont:[16,0,0],washington:[25,9,0],all:[1004,1712,0]}; //bernie,clinton,other

var r = {alaska:[11,12,0],alabama:[36,13,0],arkanas:[16,15,0],arizona:[58,0,0],DC:[0,0,9],florida:[99,0,0],georgia:[42,18,0],hawaii:[11,7,0],iowa:[7,8,1],idaho:[12,20,0],illnois:[53,9,5],kansas:[9,24,1],kentucky:[17,15,7],lousiana:[18,18,0],massachusetts:[22,4,8],maine:[9,12,2],michigan:[25,17,17],minnesota:[8,13,0],mississippi:[24,13,0],north_carolina:[29,27,9],new_hampshire:[11,3,4],nevada:[14,6,1],ohio:[0,0,66],oklahoma:[13,15,0],south_carolina:[50,0,0],tennessee:[33,16,0],texas:[48,104,0],utah:[0,40,0],virgina:[17,8,5],vermont:[8,0,8],all:[736,463,143]}; //trump,ted,john
var current = "d";
var currennt = "d";
var title_d = document.createElement("p");
var text_d = document.createTextNode("Democratic Primary Results: ");


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
var otext = document.createTextNode("Bernie: " + d["alaska"][0] + " Hillary: " + d["alaska"][1]);
odisplay.appendChild(otext);
document.body.appendChild(odisplay);

var hold = odisplay;
inputDrop_d.addEventListener('change', function(){
    
    var display = document.createElement('p');
    var text = document.createTextNode("Bernie: " + d[inputDrop_d.value][0]  + " Hillary: " + d[inputDrop_d.value][1]);
    display.appendChild(text);
    document.body.replaceChild(display,hold);
    hold = display;
    data = [ d[inputDrop_d.value][0]/(d[inputDrop_d.value][0] + d[inputDrop_d.value][1]), d[inputDrop_d.value][1]/( d[inputDrop_d.value][0] + d[inputDrop_d.value][1])];
    render("d");
});

inputDrop_r.addEventListener('change', function(){
    
    var display = document.createElement('p');
    var text = document.createTextNode("Trump: " + r[inputDrop_r.value][0] + " Ted: " + r[inputDrop_r.value][1] + " John: " + r[inputDrop_r.value][2]);
    display.appendChild(text);
    document.body.replaceChild(display,hold);
    hold = display;
    data = [ r[inputDrop_r.value][0]/(r[inputDrop_r.value][0] + r[inputDrop_r.value][1] + r[inputDrop_r.value][2]), r[inputDrop_r.value][1]/(r[inputDrop_r.value][1] + r[inputDrop_r.value][1] + r[inputDrop_r.value][2]), r[inputDrop_r.value][2]/(r[inputDrop_r.value][0] + r[inputDrop_r.value][1] + r[inputDrop_r.value][2])];
    render("r");
});

var width = 960;
var height = 500;

var color = d3.scale.category20c().domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
var svg;
var min;
var Radius;
var pie;
var arc;
var g;
var data = [0,0,0];

function start(){
    
    // draw and append the container
    svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);
    
    // set the thickness of the radius
    min = Math.min(width, height);
    Radius = min / 2;
    
    // construct pie laoyut
    pie = d3.layout.pie().value(function(d){ return d; }).sort(null);
    
    // construct arc generator
    arc = d3.svg.arc()
	.outerRadius(Radius);
    
    // creates the pie chart container
    g = svg.append('g')
    g = svg.append('g')
	.attr('transform', function(){
	    var shiftWidth = width / 2;
	    return 'translate(' + shiftWidth + ',' + height / 2 + ')';
	});
};
start();
render("d");

function render(party){

    if (current == "d" && party == "r"){
	d3.select("svg").remove();
	start();
	console.log('1');
	color = d3.scale.category20b().domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
	// add any new paths
	g.datum(data).selectAll("path")
	    .data(pie)
	    .enter().append("path")
	    .attr("class","piechart")
	    .attr("fill", function(d,i){ return color(i + 13);console.log("1.1"); })
	    .attr("d", arc)
	    .each(function(d){ this._current = d; })
		
		// remove data not being used
		g.datum(data).selectAll("path")
	    .data(pie).exit().remove();
	// add transition to new path
	g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
	current = "r";
	
    }else if (current == "r" && party == "d"){
	d3.select("svg").remove();
	start();
	console.log('2');
	color = d3.scale.category20c().domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
	// add any new paths
	g.datum(data).selectAll("path")
	    .data(pie)
	    .enter().append("path")
	    .attr("class","piechart")
	    .attr("fill", function(d,i){ return color(i);console.log("1.1"); })
	    .attr("d", arc)
	    .each(function(d){ this._current = d; })
		
		// remove data not being used
		g.datum(data).selectAll("path")
	    .data(pie).exit().remove();
	// add transition to new path
	g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
	current = "d";
    }else{
	console.log('3');
	// add transition to new path
	g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
	
	// add any new paths
	g.datum(data).selectAll("path")
	    .data(pie)
	.enter().append("path")
	    .attr("class","piechart")
	    .attr("fill", function(d,i){
		if (current == "r"){
		    console.log('4');
		    return color(i+13);
		}else{
		    console.log('5');
		    return color(i);
		}})
	    .attr("d", arc)
	    .each(function(d){ this._current = d; })
		
		// remove data not being used
		g.datum(data).selectAll("path")
	    .data(pie).exit().remove();
	// add transition to new path
    }
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
