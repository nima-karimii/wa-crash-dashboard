// Store our API endpoint inside queryUrl
var queryUrl = "https://raw.githubusercontent.com/abbyabridged/wa-crash-dashboard/Nima-k/Nima/db/Samp_crash_data.csv";
// var PlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
const API_KEY = "pk.eyJ1Ijoia2FyaW1paSIsImEiOiJja2ZkdTNuNnMwN205MzFwNTF2eGszOHM1In0.jfNBiTctjlmbsc8qwQYmvA";

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    // tileSize: 250,
    maxZoom: 18,
    // zoomOffset: -1,
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

// Initialize all of the LayerGroups we'll be using
Plates = new L.layerGroup();
var layers = {
  Bike: new L.LayerGroup(),
  Truck: new L.LayerGroup(),
  H_Truck: new L.LayerGroup(),
  MotorCycle: new L.LayerGroup(),
  Pedestrians: new L.LayerGroup(),
  Other: new L.LayerGroup(),
};

var more_layers= {
  Fatal: new L.LayerGroup(),
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
     more_layers.Fatal,
    // //  Plates      
      ]
  });

//   // Add our 'Satmap' tile layer to the map
streetmap.addTo(myMap);  


// Create an overlays object to add to the layer control
var overlays = {
  "Bike": layers.Bike,
  "Truck":layers.Truck,
  "H_Truck": layers.H_Truck,
  "MotorCycle": layers.MotorCycle,
  "OTHER_VEHICLES": layers.Other,
  "Pedestrians": layers.Pedestrians,
  // "------------":[],
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
  
    // console.log (Object.entries(SelectedID_MetaData)[1]);

    var info_array=Object.entries(SelectedID_MetaData);

    for (i=0; i<info_array.length;i++)
      {
        var ID=info_array[i][0];
        var INFO=info_array[i][1];
        infoDemo= ID.toUpperCase()+':  '+ INFO;
        title=info_panel.append("h5").text(infoDemo)

      }
  }





// Perform a GET request to the query URL
// d3.read_Csv(queryUrl, function(data) {

d3.csv(queryUrl).then(function(data, err) {
    if (err) throw err;
    // console.log(data.length);
    // console.log(data);

var Summery={
  "Total_Bike":0,
  "Total_Truck":0,
  "Total_HTruck":0,
  "Total_MotorCycle":0,
  "Total_Pedestrians":0,
  "Total_Other":0,
  "Total_Fatal":0,
}


//   earthquakeData= data.features;


 


  var Bike = [];
  var Truck = [];
  var H_Truck = [];
  var MotorCycle = [];
  var Pedestrians = [];
  var Other = [];
  var Fatal=[]

  for (var i = 0; i < data.length; i++) {
   
      if (+data[i].TOTAL_BIKE_INVOLVED>0) {
        // console.log(data[i].TOTAL_BIKE_INVOLVED);

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Blue");
                   //  cityCircles10.push(
                    newCircle.addTo(layers.Bike);
                    Bike.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
          Summery.Total_Bike=Summery.Total_Bike+(+data[i].TOTAL_BIKE_INVOLVED);
      }
      if (+data[i].TOTAL_TRUCK_INVOLVED>0) {
        Summery.Total_Truck=Summery.Total_Truck+(+data[i].TOTAL_TRUCK_INVOLVED);

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Green");
                   //  cityCircles10.push(
                    newCircle.addTo(layers.Truck);
                    Truck.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
      }
      if (+data[i].TOTAL_HEAVY_TRUCK_INVOLVED>0) {
        // console.log(data[i].TOTAL_HEAVY_TRUCK_INVOLVED);
        Summery.Total_HTruck=Summery.Total_HTruck+(+data[i].TOTAL_HEAVY_TRUCK_INVOLVED);

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Orange");
                   //  cityCircles10.push(
                    newCircle.addTo(layers.H_Truck);
                    H_Truck.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
      }
      if (+data[i].TOTAL_MOTOR_CYCLE_INVOLVED>0) {
        // console.log(data[i].TOTAL_MOTOR_CYCLE_INVOLVED);
        Summery.Total_MotorCycle=Summery.Total_MotorCycle+(+data[i].TOTAL_MOTOR_CYCLE_INVOLVED);

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"yellow");
                   //  cityCircles10.push(
                    newCircle.addTo(layers.MotorCycle);
                    MotorCycle.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
      }
      if (+data[i].TOTAL_OTHER_VEHICLES_INVOLVED>0) {
        // console.log(data[i].TOTAL_MOTOR_CYCLE_INVOLVED);
        Summery.Total_Other=Summery.Total_Other+(+data[i].TOTAL_OTHER_VEHICLES_INVOLVED);

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"purple");
                   //  cityCircles10.push(
                    newCircle.addTo(layers.Other);
                    Other.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
      }
      
      if (+data[i].TOTAL_PEDESTRIANS_INVOLVED>0) {
        // console.log(data[i].TOTAL_MOTOR_CYCLE_INVOLVED);
        Summery.Total_Pedestrians=Summery.Total_Pedestrians+(+data[i].TOTAL_PEDESTRIANS_INVOLVED);

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"red");
                   //  cityCircles10.push(
                    newCircle.addTo(layers.Pedestrians);
                    Pedestrians.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
      }

      if (data[i].SEVERITY=="Fatal") {
        // console.log(data[i].SEVERITY);
        Summery.Total_Fatal=Summery.Total_Fatal+1;

      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"red");
                   //  cityCircles10.push(
                    newCircle.addTo(more_layers.Fatal);
                    Fatal.push( newCircle.bindPopup("fhdfghdghdfhdgdd"));
      }



}
console.log(Summery);   

Demographic_Info(Summery);


layers.Bike=L.layerGroup(Bike);
layers.Truck=L.layerGroup(Truck);
layers.H_Truck=L.layerGroup(H_Truck);
layers.MotorCycle=L.layerGroup(MotorCycle);
layers.Other=L.layerGroup(Other);
layers.Pedestrians=L.layerGroup(Pedestrians);

// Magnitudes_30=L.layerGroup(cityCircles30);
// Magnitudes_50=L.layerGroup(cityCircles50);
// Magnitudes_70=L.layerGroup(cityCircles70);
// Magnitudes_90=L.layerGroup(cityCircles90);
// Magnitudes_90=L.layerGroup(cityCircles90);


L.control.layers(baseMaps,overlays).addTo(myMap);

more_layers.Fatal=L.layerGroup(Fatal);


// d3.json(PlatesURL, function(response) {
        
//   L.geoJSON(response, {
//     style:  {weight: 2,
//     color: "orange"}
//   }).addTo(Plates);
// });




});





