function Ballonmaker(Data,X,Y)
{

    /*
     * Example code for d3-balloon.js from https://github.com/WZBSocialScienceCenter/d3-balloon
     */

    var svg = d3.select("#vis_container").append("svg")
        .attr("width", 700)
        .attr("height", 600);

    // generate a 5x7 matrix with random values between 0 and 10
    var data = Data;

    console.log(data);
    // define the columns labels
    var xLabels = Y;

    // define the row labels
    var yLabels = X;

    // set the color scale used in the rows
    var yColor = d3.scaleOrdinal(d3.schemeCategory10);

    // set a transition for interactions
    var transition = d3.transition()
        .duration(500)
        .ease(d3.easeLinear);

    // create the balloon plot
    var bplot = balloonplot(300, 400)
        .position(40, 65)               // set the top-left offset
        .transition(transition)         // enable transitions
        .colorScale('y', yColor)        // set the row-wise colors
        .interactionOnElements(['circle', 'x', 'y'])   // enable interactions for mouseover/touch on circles and axes
        .valueTextFmt(function (v) { return Math.round(v * 100) / 100; })   // custom value formatter
        .data(data)                     // pass the data matrix
        .xAxis(d3.axisTop, xLabels)     // enable the X axis and pass the tick labels
        .yAxis(d3.axisRight, yLabels)   // enable the Y axis and pass the tick labels
        .legend('bottom', 3);           // legend below the plot with 3 sample circles (requires bplot.update() below)

    // add it to the SVG canvas
    svg.append(bplot)
        .attr("class", "balloon_plot");
    bplot.init();   // necessary update for dynamic repositioning of the legend after it was rendered


    // --- helper functions for random data generation ---

    function randFloat(a, b) {
        return a + Math.random() * (b - a);
    }

    function generateRandMat(rows, cols, minVal, maxVal, round) {
        if (typeof(round)==='undefined') round = false;

        var mat = [];
        for (var i = 0; i < rows; i++) {
            var row = [];
            for (var j = 0; j < cols; j++) {
                var v = randFloat(minVal, maxVal);
                if (round) v = Math.round(v);
                row.push(v);
            }
            mat.push(row);
        }

        return mat;
    }
}

