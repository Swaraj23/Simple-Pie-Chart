
var width = 500,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.Users; });

var svg = d3.select("#charts").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2+ "," + height / 2 + ")");

d3.json("data.json", function(error, data) {

  data.forEach(function(d) {
    d.Users = +d.Users;
  });
  
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Users:</strong> <span style='color:red'>" + d.data.Users + "%</span>";
  });
  svg.call(tip);

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.Browser); })
	  .on('mouseover', tip.show)
	 
      .on('mouseout', tip.hide);
	  
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate("+ ((width/2)-width) +"," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width",10)
      .attr("height",10)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});
