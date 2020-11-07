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
document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("heatmap").outerHTML = "<div id='heatmap' class='hidden_display1'> </div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("vis_container").outerHTML = "<div id='vis_container' class='hidden_display'> </div>";


  Dashbord_refresh(queryUrl);
}



// Store our API endpoint inside queryUrl
// var queryUrl = "/crash/2019";
var queryUrl = "Samp_crash_data.csv";
var Suburl="https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/suburb-2-wa.geojson"
const API_KEY = "pk.eyJ1Ijoia2FyaW1paSIsImEiOiJja2ZkdTNuNnMwN205MzFwNTF2eGszOHM1In0.jfNBiTctjlmbsc8qwQYmvA";



  // Define streetmap and darkmap layers


// Initialize all of the LayerGroups we'll be using
// Suburb = new L.layerGroup();


Dashbord_refresh(queryUrl);

///////
function Dashbord_refresh(queryUrl)
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
    var info_panel = d3.select("#sample-metadata");

    info_panel.html("");
  
    // // // console.log (Object.entries(SelectedID_MetaData)[1]);

    var info_array=Object.entries(SelectedID_MetaData);

    for (i=0; i<info_array.length;i++)
      {
        var ID=info_array[i][0];
        var INFO=info_array[i][1];
        infoDemo=ID.toUpperCase()+'  '+ INFO;
        title=info_panel.append("h5").text(infoDemo)

      }
  }


  function Total_Crash_display(Number)
  {
    var info_panel = d3.select("#total-crashes");

    info_panel.html("");
    info_panel.append("h1").text(Number)
  
  }

   
 ///////////////////////////////////////////////////////////////////////////////////
// d3.json(queryUrl).then((data) => {


d3.csv(queryUrl).then(function(data, err) {
    if (err) throw err;
console.log(data.length);
    console.log(data);
// // console.log(data.length);



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
      }
      if (+data[i].TOTAL_TRUCK_INVOLVED>0) {
        Summery.Total_Truck=Summery.Total_Truck+(+data[i].TOTAL_TRUCK_INVOLVED);
        var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Green");
                    newCircle.addTo(layers.Truck);
                    Truck.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

                  }
      if (+data[i].TOTAL_HEAVY_TRUCK_INVOLVED>0) {
        Summery.Total_HTruck=Summery.Total_HTruck+(+data[i].TOTAL_HEAVY_TRUCK_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Orange");
                    newCircle.addTo(layers.H_Truck);
                    H_Truck.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));


                  }
      if (+data[i].TOTAL_MOTOR_CYCLE_INVOLVED>0) {
        Summery.Total_MotorCycle=Summery.Total_MotorCycle+(+data[i].TOTAL_MOTOR_CYCLE_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"yellow");
                    newCircle.addTo(layers.MotorCycle);
                    MotorCycle.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));
                    // // // console.log("Motor",data[i].MONTH);

                  }
      if (+data[i].TOTAL_OTHER_VEHICLES_INVOLVED>0) {
        Summery.Total_Other=Summery.Total_Other+(+data[i].TOTAL_OTHER_VEHICLES_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"purple");
                    newCircle.addTo(layers.Other);
                    Other.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

                    // // // console.log("Other",data[i].MONTH);
                    // // // console.log(barchartData.Other);

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

}

// // // console.log(Heat_map_Data);


// console.log(barchartData);



//////////////////////////////////////////////////////////
// // console.log(Summery);   
// console.log(Event_sev_ob);

Demographic_Info(Summery);
Total_Crash_display(data.length);


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
