a=2;
b=3;
test_function(a,b)


function Ballonmaker(Data,X,Y)
{

    /*
     * Example code for d3-balloon.js from https://github.com/WZBSocialScienceCenter/d3-balloon
     */
    d3.select("#vis_container").select("svg").remove();

    var svg = d3.select("#vis_container").append("svg")
        .attr("width", "100%")
        .attr("height", 600);

    // generate a 5x7 matrix with random values between 0 and 10
    var data = Data;
console.log(data);
    console.log(data,X,Y);
    // define the columns labels
    var xLabels = X;

    // define the row labels
    var yLabels = Y;

    // set the color scale used in the rows
    var yColor = d3.scaleOrdinal(d3.schemeCategory10);

    // set a transition for interactions
    var transition = d3.transition()
        .duration(500)
        .ease(d3.easeLinear);

    // create the balloon plot
    var bplot = balloonplot(900, 300)
        .position(40, 65)               // set the top-left offset
        .transition(transition)         // enable transitions
        .colorScale('y', yColor)        // set the row-wise colors
        .interactionOnElements(['circle', 'x', 'y'])   // enable interactions for mouseover/touch on circles and axes
        .valueTextFmt(function (v) { return Math.round(v * 100) / 100; })   // custom value formatter
        .data(data)                     // pass the data matrix
        .xAxis(d3.axisTop, xLabels)     // enable the X axis and pass the tick labels
        .yAxis(d3.axisRight, yLabels)   // enable the Y axis and pass the tick labels
        .legend('bottom',4);           // legend below the plot with 3 sample circles (requires bplot.update() below)

console.log(bplot)

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




//// selecting the year ////
function optionChanged(ID) {
  // queryUrl="/crash/"
  // queryUrl=queryUrl+ID
switch (ID)
{
 case "2019" : queryUrl='Samp_crash_data.csv';break;
 case "2018" : queryUrl='Samp_crash_data2.csv';break;
 case "2017" : queryUrl='Samp_crash_data2.csv';break;
 case "2016" : queryUrl='Samp_crash_data3.csv';break;
 case "2015" : queryUrl='Samp_crash_data3.csv';break;
}

  Mapinit=1;
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("heatmap").outerHTML = "<div id='heatmap' class='hidden_display1'> </div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("vis_container").outerHTML = "<div id='vis_container' class='hidden_display'> </div>";


  Dashbord_refresh(queryUrl);
}



// Store our API endpoint inside queryUrl
// var queryUrl = "/crash/2019";
var queryUrl = "Samp_crash_data.csv";
Dashbord_refresh(queryUrl);


function Dashbord_refresh(queryUrl)
{
  console.log(queryUrl);
 

  function Total_Crash_display(Number)
  {
    var info_panel = d3.select("#total-crashes");
    console.log(Number);
    info_panel.html("");
    info_panel.append("h1").text(Number)
  
  }




function Creat_SeverityObj(Fatal,Hospital,Medical,PDO_Major,PDO_Minor)
  {
  this.Fatal = Fatal;
  this.Hospital = Hospital;
  this.Medical = Medical;
  this.PDO_Major = PDO_Major;
  this.PDO_Minor = PDO_Minor;
}

var Event_sev_ob = new Object();
Event_sev_ob = {
  Head_On :new Creat_SeverityObj(0,0,0,0,0,0),
  Hit_Animal:new Creat_SeverityObj(0,0,0,0,0,0),
  Hit_Object:new Creat_SeverityObj(0,0,0,0,0,0),
  Hit_Pedestrian:new Creat_SeverityObj(0,0,0,0,0,0),
  Non_Collision:new Creat_SeverityObj(0,0,0,0,0,0),
  Others:new Creat_SeverityObj(0,0,0,0,0,0),
  Rear_End:new Creat_SeverityObj(0,0,0,0,0,0),
  Right_Angle:new Creat_SeverityObj(0,0,0,0,0,0),
  Right_Turn_Thru:new Creat_SeverityObj(0,0,0,0,0,0),
  Sideswipe_Same_Dir:new Creat_SeverityObj(0,0,0,0,0,0),

}

// // console.log(Event_sev_ob);

function  baloonDatamaker (SEVERITY,EVENT_NATURE ){


// // // console.log(SEVERITY,EVENT_NATURE);

///Cleaning
switch (SEVERITY){
  case "PDO Major" : {SEVERITY="PDO_Major" ;break;};
  case "PDO Minor" :{ SEVERITY="PDO_Minor"; break;};
}

switch (EVENT_NATURE){
  case "Head On" : {EVENT_NATURE="Head_On" ;break;};
  case "Hit Animal" :{ EVENT_NATURE="Hit_Animal"; break;};
  case "Hit Object" : {EVENT_NATURE="Hit_Object" ;break;};
  case "Hit Pedestrian" : {EVENT_NATURE="Hit_Pedestrian" ;break;};
  case "Non Collision" : {EVENT_NATURE="Non_Collision" ;break;};
  case "Rear End" : {EVENT_NATURE="Rear_End" ;break;};
  case "Right Angle" : {EVENT_NATURE="Right_Angle" ;break;};
  case "Right Turn Thru" : {EVENT_NATURE="Right_Turn_Thru" ;break;};
  case "Sideswipe Same Dirn" : {EVENT_NATURE="Sideswipe_Same_Dir" ;break;};
}
// // // console.log(SEVERITY,EVENT_NATURE,Event_sev_ob[EVENT_NATURE][SEVERITY]);

Event_sev_ob[EVENT_NATURE][SEVERITY]+=1;

}




///////////////////////////////////////////////////////////////////////////////////
// d3.json(queryUrl).then((data) => {
  console.log(queryUrl);


d3.csv(queryUrl).then(function(data, err) {
    if (err) throw err;
console.log(data.length);
    console.log(data);
// // console.log(data.length);

  for (var i = 0; i < data.length; i++) {

baloonDatamaker (data[i].SEVERITY,data[i].EVENT_NATURE );
}


Total_Crash_display(data.length);





// Ballonmaker(Event_sev_ob);


var arr = Object.keys(Event_sev_ob).map((k) => Event_sev_ob[k])
var X=Object.keys(Event_sev_ob)
// console.log(arr[0].Fatal);
var Y=Object.keys(arr[0])
Data_arr=[]
for (i=0 ;i<arr.length;i++)
{ var aa= Object.keys(arr[i]).map((k) => arr[i][k])
  Data_arr.push(aa);
}

// // console.log(barchartData);

function r2c(arr) {
  var arrC = [], // next get the longest sub-array length
      x = Math.max.apply(Math, arr.map(function (e) {return e.length;})),
      y = arr.length,
      i, j;
  for (i = 0; i < x; ++i) {   // this is the loop "down"
      arrC[i] = [];
      for (j = 0; j < y; ++j) // and this is the loop "across"
          if (i in arr[j])
              arrC[i].push(arr[j][i]);
  }
  return arrC;
}

BaloonData=r2c(Data_arr);



Ballonmaker(BaloonData,X,Y);



});




}
