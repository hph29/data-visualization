function drawTrendLine() {
    // Set the dimensions of the canvas / graph
    var margin = {top: 40, right: 50, bottom: 40, left: 50},
        width = 700 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// Parse the date / time
    var parseDate = d3.time.format("%Y-%m").parse,
        formatDate = d3.time.format("%Y-%m"),
        bisectDate = d3.bisector(function (d) {
            return d.yearMonth;
        }).left;

// Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

// Define the line
    var valueline = d3.svg.line()
        .x(function (d) {
            return x(d.yearMonth);
        })
        .y(function (d) {
            return y(d.numCrimes);
        });

// Adds the svg canvas
    var svg = d3.select("body")
        .append("div")
        .style("text-align", "center")
        .append("text")
        .style("font-size", "20px")
        .style("font-family", "Papyrus")
        .style("text-decoration", "underline")
        .text("Crime Conducted Monthly")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var lineSvg = svg.append("g");

    var focus = svg.append("g")
        .style("display", "none");

// Get the data
    d3.csv("https://raw.githubusercontent.com/hph29/data-visualization/master/public/javascripts/stats.csv", function (data) {                 // **********
        data.forEach(function (d) {
            d.yearMonth = parseDate(d.yearMonth);
            d.numCrimes = +d.numCrimes;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.yearMonth;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.numCrimes;
        })]);

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .style("font-size", "10px")
            .attr("class", "y axis")
            .call(yAxis);

        // append the x line
        focus.append("line")
            .attr("class", "x")
            .style("stroke", "gray")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height);

        // append the y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "gray")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width)
            .attr("x2", width);

        // append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "gray")
            .attr("r", 4);

        // place the value at the intersection
        focus.append("text")
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // place the date at the intersection
        focus.append("text")
            .attr("class", "y3")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");

        // append the rectangle to capture mouse
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function () {
                focus.style("display", null);
            })
            .on("mouseout", function () {
                focus.style("display", "none");
            })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            focus.select("circle.y")
                .attr("transform",
                    "translate(" + x(d.yearMonth) + "," +
                    y(d.numCrimes) + ")");

            focus.select("text.y1")
                .attr("transform",
                    "translate(" + x(d.yearMonth) + "," +
                    y(d.numCrimes) + ")")
                .text("Number of Crimes: " + d.numCrimes);

            focus.select("text.y2")
                .attr("transform",
                    "translate(" + x(d.yearMonth) + "," +
                    y(d.numCrimes) + ")")
                .text("Number of Crimes: " + d.numCrimes);

            focus.select("text.y3")
                .attr("transform",
                    "translate(" + x(d.yearMonth) + "," +
                    y(d.numCrimes) + ")")
                .text("At: " + formatDate(d.yearMonth));

            focus.select("text.y4")
                .attr("transform",
                    "translate(" + x(d.yearMonth) + "," +
                    y(d.numCrimes) + ")")
                .text("At: "+ formatDate(d.yearMonth));

            focus.select(".x")
                .attr("transform",
                    "translate(" + x(d.yearMonth) + "," +
                    y(d.numCrimes) + ")")
                .attr("y2", height - y(d.numCrimes));

            focus.select(".y")
                .attr("transform",
                    "translate(" + width * -1 + "," +
                    y(d.numCrimes) + ")")
                .attr("x2", width + width);
        }

    });

    var annotations = [
        {
            "cx": 625,
            "cy": 111,
            "r": 109,
            "text": "The longer Old Faithful lays dormant, the longer the eruption last",
            "textWidth": 140,
            "textOffset": [
                121,
                186
            ]
        }
    ];

    var ringNote = d3.ringNote()
        .draggable(false);

    svg.append("g")
        .attr("class", "annotations")
        .call(ringNote, annotations);

}





drawTrendLine();

