//// selecting the year ////
function optionChanged(ID,page) {
  queryUrl="/crash/"
  queryUrl=queryUrl+ID


if (page!=1) document.getElementById("map").outerHTML = "<div id='map' class='hidden_display'></div>";
  else  document.getElementById("map").outerHTML = "<div id='map'></div>"
// document.getElementById("heatmap").outerHTML = "<div id='heatmap' class='hidden_display1'> </div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("vis_container").outerHTML = "<div id='vis_container' class='hidden_display'> </div>";


  Map_refresh(queryUrl);
}
//////////////////////// Balloon Maker /////////

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








function  balloonDatamaker (SEVERITY,EVENT_NATURE ){


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


function BarchartdataMaker(MMonth,monthdata)
{
  // console.log(MMonth,monthdata.Jul);
    
       switch (MMonth)
      {
         case '1':{monthdata.Jan+=1; break; }
         case '2':{monthdata.Feb+=1; break; }
         case '3':{monthdata.Mar+=1; break; }
         case '4':{monthdata.Apr+=1; break; }
         case '5':{monthdata.May+=1; break; }
         case '6':{monthdata.Jun+=1; break; }
         case '7':{monthdata.Jul+=1;  break;   }
         case '8':{monthdata.Aug+=1; break; }
         case '9':{monthdata.Sep+=1; break; }
         case '10':{monthdata.Oct+=1; break;}
         case '11':{monthdata.Nov+=1; break; }
         case '12':{monthdata.Dec+=1; break; }


        }


        return (monthdata);
      }



function Barchart(barchartData)
{
////////////barchart
Trucklist=Object.keys(barchartData.Truck);
TruckListvalue=Object.values(barchartData.Truck);
HTrucklist=Object.keys(barchartData.Heavy_Truck);
HTruckListvalue=Object.values(barchartData.Heavy_Truck);
console.log(barchartData);
Bikelist=Object.keys(barchartData.Bike);
BikeListvalue=Object.values(barchartData.Bike);
Motorlist=Object.keys(barchartData.MotorCycle);
MotorkListvalue=Object.values(barchartData.MotorCycle);
Otherlist=Object.keys(barchartData.Other);
OtherListvalue=Object.values(barchartData.Other);

console.log(TruckListvalue);
  

var trace1 = {
  x: Trucklist,
  y: TruckListvalue,
  name: 'Trucks',
  type: 'bar'
};

var trace2 = {
  x: HTrucklist,
  y: HTruckListvalue,
  name: 'Heavy-trucks',
  type: 'bar'
};
var trace3 = {
  x: Otherlist,
  y: OtherListvalue.map(function(a, index, array){
    return Math.round(a/10);}),
  name: 'Cars',
  type: 'bar'
};
var trace4 = {
  x: Motorlist,
  y: MotorkListvalue,
  name: 'MotorCycles',
  type: 'bar'
};
var trace5 = {
  x: Bikelist,
  y: BikeListvalue,
  name: 'Bikes',
  type: 'bar'
};

var data = [trace1, trace2,trace3,trace4,trace5];

console.log(data);
var layout = {barmode: 'group'};

Plotly.newPlot('Barchart2', data, layout);


}


////////   Heat MAP ///////////////////////


var Heat_map_Data = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];



function heatmapData (DayWeek, TimeDay,Data) {
  // // // console.log(DayWeek,TimeDay);

    switch(DayWeek) {
    case "Monday":{
        switch(TimeDay){
            case "Morning" : {Data[0][0]+=1;break;}
            case "Afternoon" : {Data[0][1]+=1;break;}
            case "Evening" : {Data[0][2]+=1;break;}
            case "Night" : {Data[0][3]+=1;break;}
        };
        break;}
    case "Tuesday":{
        switch(TimeDay){
            case "Morning" : {Data[1][0]+=1;break;}
            case "Afternoon" : {Data[1][1]+=1;break;}
            case "Evening" : {Data[1][2]+=1;break;}
            case "Night" : {Data[1][3]+=1;break;}
        };
        break;}

    case "Wednesday":{
        switch(TimeDay){
            case "Morning" : {Data[2][0]+=1;break;}
            case "Afternoon" : {Data[2][1]+=1;break;}
            case "Evening" : {Data[2][2]+=1;break;}
            case "Night" : {Data[2][3]+=1;break;}
        };
        break;}

    case "Thursday":{
        switch(TimeDay){
            case "Morning" : {Data[3][0]+=1;break;}
            case "Afternoon" : {Data[3][1]+=1;break;}
            case "Evening" : {Data[3][2]+=1;break;}
            case "Night" : {Data[3][3]+=1;break;}
        };
        break;}

    case "Friday":{
        switch(TimeDay){
            case "Morning" : {Data[4][0]+=1;break;}
            case "Afternoon" : {Data[4][1]+=1;break;}
            case "Evening" : {Data[4][2]+=1;break;}
            case "Night" : {Data[4][3]+=1;break;}
        };
        break;}

    case "Saturday":{
        switch(TimeDay){
            case "Morning" : {Data[5][0]+=1;break;}
            case "Afternoon" : {Data[5][1]+=1;break;}
            case "Evening" : {Data[5][2]+=1;break;}
            case "Night" : {Data[5][3]+=1;break;}
        };
        break;}

    case "Sunday":{
        switch(TimeDay){
            case "Morning" : {Data[6][0]+=1;break;}
            case "Afternoon" : {Data[6][1]+=1;break;}
            case "Evening" : {Data[6][2]+=1;break;}
            case "Night" : {Data[6][3]+=1;break;}
        };
        break;}
    }
return(Data)    
}


    
function Heatmap_plot(data)
{ 
  // // console.log(data);
  var Zdata=data; 


var heatmapData = [
    {

        z: Zdata,

        y: ['Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday','Sunday'],
        x: ['Morning', 'Afternoon', 'Evening','Night'],
        type: 'heatmap',
        colorscale: 'OrRd',
        hoverongaps: false,
        // hoverinfo: 'z',
    }
    ];

var layout = {
    title: 'Number of road crashes',
    font: {
        family: 'Arial',
        color: '#7f7f7f'
      },
};


var config = {
    displayModeBar: false,
    responsive: true
};


Plotly.newPlot('heatmap', heatmapData, layout, config);

}

///////////





// Store our API endpoint inside queryUrl
var queryUrl = "/crash/2019";
var Suburl="https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/suburb-2-wa.geojson"
const API_KEY = "pk.eyJ1Ijoia2FyaW1paSIsImEiOiJja2ZkdTNuNnMwN205MzFwNTF2eGszOHM1In0.jfNBiTctjlmbsc8qwQYmvA";



  // Define streetmap and darkmap layers


// Initialize all of the LayerGroups we'll be using
// Suburb = new L.layerGroup();


Map_refresh(queryUrl);

function ActivateIDs(i)
{
  var map_panel = d3.select("#map");
      map_panel.html("");
      var heatmap_panel = d3.select("#heatmap");
      heatmap_panel.html("");
      var Barchart2_panel = d3.select("#Barchart2");
      Barchart2_panel.html("");
      var vis_container_panel = d3.select("#vis_container");
      vis_container_panel.html("");
      var Year_selected=d3.select("#filter").node().value;
      var map_button=d3.select("#map_b").node().text;
      console.log(map_button);

switch(i)
{
  case 1 : {map_panel.attr('class','a');
            heatmap_panel.attr('class','hidden_display');
            Barchart2_panel.attr('class','hidden_display');
            vis_container_panel.attr('class','hidden_display');
            optionChanged(Year_selected,1);
            break; }
  case 2 : {map_panel.attr('class','hidden_display');
            heatmap_panel.attr('class','a');
            Barchart2_panel.attr('class','hidden_display');
            vis_container_panel.attr('class','hidden_display');
            optionChanged(Year_selected,2);            
            break; }
  case 3 : {map_panel.attr('class','hidden_display');
            heatmap_panel.attr('class','hidden_display');
            Barchart2_panel.attr('class','a');
            vis_container_panel.attr('class','hidden_display');
            optionChanged(Year_selected,3);            
            break; }
  case 4 : {map_panel.attr('class','hidden_display');
            heatmap_panel.attr('class','hidden_display');
            Barchart2_panel.attr('class','hidden_display');
            vis_container_panel.attr('class','a');
            optionChanged(Year_selected,4);            
            break; }
  }


}

///////


function CreatCircle (lat,lng,Color)
{
return (
  L.circleMarker([lat, lng],
    {"radius":3,
      "fillColor": Color,
      "fillOpacity": 1,
      "color": "black",
      "weight": 0.5,
      "opacity": 1
    })
    

)}

function Demographic_Info(SelectedID_MetaData)
{
  var info_array=Object.entries(SelectedID_MetaData);
  console.log (Object.entries(SelectedID_MetaData));

  var bike_panel = d3.select("#total-Bikes");
  bike_panel.html("");
  bike_panel.append("b").text(info_array[0][1]);
  var truck_panel = d3.select("#total-Trucks");
  truck_panel.html("");
  truck_panel.append("b").text(info_array[1][1]);
  var htruck_panel = d3.select("#total-HTrucks");
  htruck_panel.html("");
  htruck_panel.append("b").text(info_array[2][1]);
  var mc_panel = d3.select("#total-MC");
  mc_panel.html("");
  mc_panel.append("b").text(info_array[3][1]);
  var cars_panel = d3.select("#total-Cars");
  cars_panel.html("");
  cars_panel.append("b").text(info_array[5][1]);
  var ped_panel = d3.select("#total-Ped");
  ped_panel.html("");
  ped_panel.append("b").text(info_array[4][1]);
  var info_panel= d3.select("#total-fatal");
  info_panel.html("");
  info_panel.append("h4").text(info_array[6][1]);


}


function Total_Crash_display(Number)
{
  var info_panel = d3.select("#total-crashes");

  info_panel.html("");
  info_panel.append("h4").text(Number)

}





function Map_refresh(queryUrl)

{
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var satMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var layers = {
    Bike: new L.LayerGroup(),
    Truck: new L.LayerGroup(),
    H_Truck: new L.LayerGroup(),
    MotorCycle: new L.LayerGroup(),
    Pedestrians: new L.LayerGroup(),
    Other: new L.LayerGroup(),
  };
  console.log(layers.Bike);
  
  var more_layers= {
    Fatal: new L.LayerGroup(),
    Suburb: new L.LayerGroup(),
  }
  
  
  
    // Create our map, giving it the satellite Map and earthquakes layers to display on load
    var myMap = L.map("map", {
      center:  [-31.9505, 115.8605],
      zoom: 7,
      layers: [
       layers.Bike, 
       layers.Truck, 
       layers.H_Truck, 
       layers.MotorCycle, 
       layers.Pedestrians, 
       layers.Other,
      //  more_layers.Fatal,
      //  more_layers.Suburb,
        ]
    });
  
  //   // Add our 'Satmap' tile layer to the map
  streetmap.addTo(myMap);  
  
  var myMap;
  
  var Mapinit=0;
  
  

  // myMap.eachLayer(function (layer) {
  //   myMap.removeLayer(layer); });



// Create an overlays object to add to the layer control
var overlays = {
  "Bike": layers.Bike,
  "Truck":layers.Truck,
  "H_Truck": layers.H_Truck,
  "MotorCycle": layers.MotorCycle,
  "OTHER_VEHICLES": layers.Other,
  "Pedestrians": layers.Pedestrians,
  "Suburb": more_layers.Suburb,
  "Fatal": more_layers.Fatal,
};

// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(myMap);


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Light MAp":lightMap,
    "satellite Map":satMap,
  };


 
 ///////////////////////////////////////////////////////////////////////////////////
d3.json(queryUrl).then((data) => {


// d3.csv(queryUrl).then(function(data, err) {
console.log(data.length);
    console.log(data);
// // console.log(data.length);


var barchartData = new Object();

barchartData = {
Truck: { Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
Heavy_Truck:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
Bike: { Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
MotorCycle:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
MotorCycle:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
Other:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
};


    // // console.log(data);

// var SMonths = new Object();
//   SMonths= { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:0,Jul:0,Aug:0,Sep:0,O:1,N:1,D:1};
//   // // console.log(SMonths);


var Summery={
  "Total_Bike":0,
  "Total_Truck":0,
  "Total_HTruck":0,
  "Total_MotorCycle":0,
  "Total_Pedestrians":0,
  "Total_Other":0,
  "Total_Fatal":0,
}

  var Bike = [];
  var Truck = [];
  var H_Truck = [];
  var MotorCycle = [];
  var Pedestrians = [];
  var Other = [];
  var Fatal=[]
  // // console.log( barchartData.Truck);



  for (var i = 0; i < data.length; i++) {

    Adress=data[i].COMMON_ROAD_NAME;
    C_date=data[i].CRASH_DATE;
    BBike=data[i].TOTAL_BIKE_INVOLVED;
    TTruck=data[i].TOTAL_TRUCK_INVOLVED;
    HTruck=data[i].TOTAL_HEAVY_TRUCK_INVOLVED;
    Motor=data[i].TOTAL_MOTOR_CYCLE_INVOLVED;
    Other_V=data[i].TOTAL_OTHER_VEHICLES_INVOLVED;
    Pdstrian=data[i].TOTAL_PEDESTRIANS_INVOLVED;


      if (+data[i].TOTAL_BIKE_INVOLVED>0) {
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Blue");
                    newCircle.addTo(layers.Bike);
                    Bike.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                                                   "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                                                   "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

          Summery.Total_Bike=Summery.Total_Bike+(+data[i].TOTAL_BIKE_INVOLVED);
          barchartData.Bike=BarchartdataMaker(data[i].MONTH,barchartData.Bike);
          // // // console.log( barchartData.Bike);
      }
      if (+data[i].TOTAL_TRUCK_INVOLVED>0) {
        Summery.Total_Truck=Summery.Total_Truck+(+data[i].TOTAL_TRUCK_INVOLVED);
        var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Green");
                    newCircle.addTo(layers.Truck);
                    Truck.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

                    barchartData.Truck=BarchartdataMaker(data[i].MONTH,barchartData.Truck);
                    // // // console.log(  barchartData.Truck);
                    // // // console.log(barchartData.Truck,barchartData.Heavy_Truck);


                  }
      if (+data[i].TOTAL_HEAVY_TRUCK_INVOLVED>0) {
        Summery.Total_HTruck=Summery.Total_HTruck+(+data[i].TOTAL_HEAVY_TRUCK_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Orange");
                    newCircle.addTo(layers.H_Truck);
                    H_Truck.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));


                    barchartData.Heavy_Truck=BarchartdataMaker(data[i].MONTH,barchartData.Heavy_Truck);
                  }
      if (+data[i].TOTAL_MOTOR_CYCLE_INVOLVED>0) {
        Summery.Total_MotorCycle=Summery.Total_MotorCycle+(+data[i].TOTAL_MOTOR_CYCLE_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"yellow");
                    newCircle.addTo(layers.MotorCycle);
                    MotorCycle.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));
                    // // // console.log("Motor",data[i].MONTH);

                    barchartData.MotorCycle=BarchartdataMaker(data[i].MONTH,barchartData.MotorCycle);
                  }
      if (+data[i].TOTAL_OTHER_VEHICLES_INVOLVED>0) {
        Summery.Total_Other=Summery.Total_Other+(+data[i].TOTAL_OTHER_VEHICLES_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"purple");
                    newCircle.addTo(layers.Other);
                    Other.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

                    barchartData.Other=BarchartdataMaker(data[i].MONTH,barchartData.Other);
                    // console.log("Other",data[i].MONTH);
                    // console.log(barchartData.Other);

                  }
      if (+data[i].TOTAL_PEDESTRIANS_INVOLVED>0) {
        Summery.Total_Pedestrians=Summery.Total_Pedestrians+(+data[i].TOTAL_PEDESTRIANS_INVOLVED);
        var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Gold");
                    newCircle.addTo(layers.Pedestrians);
                                   Pedestrians.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
                  }

      if (data[i].SEVERITY=="Fatal") {
        // // // console.log(data[i].SEVERITY);
        Summery.Total_Fatal=Summery.Total_Fatal+1;

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"red");
                   //  cityCircles10.push(
                    newCircle.addTo(more_layers.Fatal);
                    Fatal.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
                  }
/////
// // // console.log(data[i].CRASH_DAYWEEK,data[i].CRASH_TIMEDAY);
Heat_map_Data=heatmapData (data[i].CRASH_DAYWEEK,data[i].CRASH_TIMEDAY,Heat_map_Data);
balloonDatamaker (data[i].SEVERITY,data[i].EVENT_NATURE );
}


// // // console.log(Heat_map_Data);


console.log(barchartData);

Heatmap_plot(Heat_map_Data);
Barchart(barchartData);

//////////////////////////////////////////////////////////
// // console.log(Summery);   
// console.log(Event_sev_ob);

Demographic_Info(Summery);
Total_Crash_display(data.length);



////////////////////////////////////////////

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
///////////////////////////////////////////











layers.Bike=L.layerGroup(Bike);
layers.Truck=L.layerGroup(Truck);
layers.H_Truck=L.layerGroup(H_Truck);
layers.MotorCycle=L.layerGroup(MotorCycle);
layers.Other=L.layerGroup(Other);
layers.Pedestrians=L.layerGroup(Pedestrians);

L.control.layers(baseMaps,overlays).addTo(myMap);

more_layers.Fatal=L.layerGroup(Fatal);

// console.log(Suburl);    

d3.json(Suburl, function( err,Geo) {
  if (err) throw err;
  // console.log("!!!!!!!!dfsdfgsihiuh;ihhl;ih!!!") ;    
  L.geoJSON(Geo.features, {
    style: {
    weight: 2,
    color: "orange"}
  }).addTo(Suburb);
});




});




}
