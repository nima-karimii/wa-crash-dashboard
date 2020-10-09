// function ballooonChart(Data,Y,X)
// {

    
// //  if (Data==1) 
// //  {
// //         data=[[1,2,1],[1,1,1],[1,2,10],[1,1,1]]
// //     // define the columns labels
// //     var xLabels = ['A', 'B', 'C', 'D', ]

// //     // define the row labels
// //     var yLabels = ['qqq', 'www', 'rrr','ttt'];
  

// //     }
//     var data = Data;
//     var xLabels= Y;
//     var  yLabels= X;

//     data=[[1,2,1],[1,1,1],[1,2,10],[1,1,1]]
//     // define the columns labels
//     var xLabels = ['A', 'B', 'C', 'D', ]

//     // define the row labels
//     var yLabels = ['Foo', 'Bar', 'Example','Nima'];

// //     // set the color scale used in the rows
// //     // console.log(data,xLabels,yLabels);





//     console.log(data,xLabels,yLabels);


//     svgArea=d3.select("body").select("#vis_container1").select("svg")
//     if (!svgArea.empty()){svgArea.remove();}

//     d3.selectAll("svg > *").remove();
//     // /*
//     //  * Example code for d3-balloon.js from https://github.com/WZBSocialScienceCenter/d3-balloon
//     //  */

//     console.log( d3.selectAll("svg > *"));


//     var svg = d3.select("#vis_container1").append("svg")
//         .attr("width", 1000)
//         .attr("height", 1000);


//     var yColor = d3.scaleOrdinal(d3.schemeCategory10);

//     // set a transition for interactions
//     var transition = d3.transition()
//         .duration(500)
//         .ease(d3.easeLinear);
    
//     console.log("transition");

//     console.log(transition);

//     // create the balloon plot
//     var bplot = balloonplot(500, 500)
//         .position(40, 65)               // set the top-left offset
//         .transition(transition)         // enable transitions
//         .colorScale('y', yColor)        // set the row-wise colors
//         .interactionOnElements(['circle', 'x', 'y'])   // enable interactions for mouseover/touch on circles and axes
//         .valueTextFmt(function (v) { return Math.round(v * 100) / 100; })   // custom value formatter
//         .data(data)                     // pass the data matrix
//         .xAxis(d3.axisTop, xLabels)     // enable the X axis and pass the tick labels
//         .yAxis(d3.axisRight, yLabels)   // enable the Y axis and pass the tick labels
//         .legend('bottom', 3);           // legend below the plot with 3 sample circles (requires bplot.update() below)

//     // add it to the SVG canvas
//     svg.append(bplot)
//         .attr("class", "balloon_plot");
//     bplot.init();   // necessary update for dynamic repositioning of the legend after it was rendered


//     // --- helper functions for random data generation ---


// }

//     // generate a 5x7 matrix with random values between 0 and 10
//     var data = generateRandMat(3, 4, 0, 10, true);

//     data=[[1,2,1],[1,1,1],[1,2,10],[1,1,1]]
//     // define the columns labels
//     var xLabels = ['A', 'B', 'C', 'D', ]

//     // define the row labels
//     var yLabels = ['Foo', 'Bar', 'Example','Nima'];

//     // set the color scale used in the rows
//     // console.log(data,xLabels,yLabels);



//  ballooonChart(data,xLabels,yLabels);