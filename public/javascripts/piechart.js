function pieChart(id, data, metadata) {

    var width = 700 , height = 350 , radius = 125 ,
        color = ["#3f3f3f","#7f7f7f"];

    var colorDescriptions = [];

    var svgContainer = d3.select("body") // create svg container
        .append("svg:svg")
        .style("display", "block")
        .style("margin", "auto")
        .style("text-align", "center")
        .style("font-family", "Papyrus")
        .data([data])
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(" + 250 + "," + 150 + ")") ;;

    var arc = d3.svg.arc() // draw arc of given radius
        .outerRadius(radius);

    var pie = d3.layout.pie() // assign data for pie chart
        .value(function(d) { return d.value; });

    var arcs = svgContainer.selectAll("g.slice") // slice the circle
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path") // fill color in each slice
        .style("fill", function(d, i) {
            var colorSelected =  color[i];
            colorDescriptions.push({"colorSelected": colorSelected, "label": data[i].label});
            return colorSelected; } )
        .attr("d", arc);

    arcs.append("svg:text") // write slice information values
        .attr("transform", function(d) {
            d.innerRadius = 0;
            d.outerRadius = radius;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d, i) { return data[i].value + '\n' + "("
            + Math.round((data[i].value / [data[0].value + data[1].value].reduce((a, b) => a + b, 0)) * 100) + "%)"; })
        .style("fill", "#cfcfcf")
        .style("font-size", "14px");

    descriptionText = "Pie Chart of " + metadata.x + " with " + metadata.y; // pie chart description

    var description = svgContainer.append("g").attr("class", "description"); // pie chart description
    var desc_label = description.append("text")
        .attr("class", "description")
        .attr("x", 80)
        .attr("y", -135)
        .text(descriptionText)
        .style("font-weight", "bold")
        .style("font-size", "20px")
        .style("text-anchor", "middle");

    var pieChartLabels = svgContainer.append("g").attr("id","pie-chart-labels");   //index for pie chart : name
    pieChartLabels.selectAll("text").data(colorDescriptions).enter().append("svg:text")
        .text(function(d) { return d.label; } ).attr("x",280)
        .attr("y",function(d, i) { return 14 + i*30; })
        .style("font-size", "20px");

    var pieChartLabelsColors = svgContainer.append("g").attr("id","pie-chart-labels-colors");
    pieChartLabelsColors.selectAll("rect").data(colorDescriptions).enter().append("rect")
        .attr("x",250)
        .attr("y",function(d, i) { return i*30; })
        .attr("width", 25)
        .attr("height", 15)
        .style("fill" , function(d) { return d.colorSelected; }); //index for pie chart : color

}

var metadata = {
    'x' : 'Type' ,
    'y' : 'Number of Crimes' };

// define data
var data = [
    {label: "Domestic Crimes", value: 220054},
    {label: "Non-domestic Crimes", value: 1236660}
];


var metadata2 = {
    'x' : 'Serving a prison sentence' ,
    'y' : 'Number of Criminals' };

// define data
var data2 = [
    {label: "Serving sentences", value: 377472},
    {label: "Liberated", value: 1079242}
];

pieChart("#pieChart", data, metadata);
pieChart("#pieChart2", data2, metadata2);



