var initchart = function () {
    var data = [{
        "sale": "202",
        "year": "2000"
    }, {
        "sale": "215",
        "year": "2001"
    }, {
        "sale": "179",
        "year": "2002"
    }, {
        "sale": "199",
        "year": "2003"
    }, {
        "sale": "134",
        "year": "2004"
    }, {
        "sale": "176",
        "year": "2010"
    }];

    var vis = d3.select("#visualisation"),
        WIDTH = 600,
        HEIGHT = 400,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]),
        yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 215]),
        xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

    var lineGen = d3.line()
        .x(function (d) {
            return xScale(d.year);
        })
        .y(function (d) {
            return yScale(d.sale);
        });
    vis.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
}

initchart();