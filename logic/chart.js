var loaddata = function () {
    var load = d3.csv("data/blocks_info_40-1.json.csv", function (data) {
        data.forEach(function (d) {
            d.num = +d.num;
            d.diff = +d.diff;
            d.time = +d.time;
        });
        console.log(data);
        initchart(data);
    });
};

var initchart = function (data) {
    var vis = d3.select("#visualisation"),
        WIDTH = 600,
        HEIGHT = 400,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]),
        yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]),
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
            return xScale(d.num);
        })
        .y(function (d) {
            return yScale(d.time);
        });
    vis.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
}

loaddata();