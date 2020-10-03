// Store our API endpoint inside queryUrl
var queryUrl = "https://raw.githubusercontent.com/abbyabridged/wa-crash-dashboard/Nima-k/Nima/db/Samp_crash_data.csv";
// var PlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
const API_KEY = "pk.eyJ1Ijoia2FyaW1paSIsImEiOiJja2ZkdTNuNnMwN205MzFwNTF2eGszOHM1In0.jfNBiTctjlmbsc8qwQYmvA";

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
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

  // Create our map, giving it the satellite Map and earthquakes layers to display on load
  var myMap = L.map("Map", {
    center:  [-31.9505, 115.8605],
    zoom: 7,
    layers: [
     layers.Bike, 
     layers.Truck, 
     layers.H_Truck, 
     layers.MotorCycle, 
     layers.Pedestrians, 
    //  Plates      
      ]
  });

//   // Add our 'Satmap' tile layer to the map
satMap.addTo(myMap);  

// Create an overlays object to add to the layer control
var overlays = {
  "Magnitudes less than 1": layers.Bike,
  "Magnitudes between (1-3)":layers.Truck,
  "Magnitudes between (3-5)": layers.H_Truck,
  "Magnitudes between (5-7)": layers.MotorCycle,
  "Magnitudes Greater than 7": layers.Pedestrians,
  "Tectonic Plates": Plates  

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





// Perform a GET request to the query URL
// d3.read_Csv(queryUrl, function(data) {

d3.csv(queryUrl).then(function(data, err) {
    if (err) throw err;
    console.log(queryUrl);
    console.log(data);




  earthquakeData= data.features;


  var cityCircles10 = [];
  var cityCircles30 = [];
  var cityCircles50 = [];
  var cityCircles70 = [];
  var cityCircles90 = [];
  var cityCirclesO90 = [];

  for (var i = 0; i < earthquakeData.length; i++) {

     // Set the data location property to a variable
   var location = earthquakeData[i].geometry;
 
  //  console.log(earthquakeData);
     // Set the Earthquake magnitudes property to a variable
     var magnitudes = earthquakeData[i].properties.mag;
 
    // Set the Earthquake Depth property to a variable
     var depth=location.coordinates[2];
 var place =earthquakeData[i].properties.place;
//  console.log(magnitudes);
      if (magnitudes<1) {
        // console.log(magnitudes);

      // Add a circle markers to the map and bind a pop-up
      //  cityCircles10.push(
         var newCircle = CreatCircle(location.coordinates[1], location.coordinates[0],depth,magnitudes);
                   //  cityCircles10.push(
                    newCircle.addTo(layers.Bike);
                    cityCircles10.push( newCircle.bindPopup(place+"<hr>Magnitudes = "+magnitudes+"<br>Depth = "+depth));
      }
        else if (magnitudes<3) {
          // Add a circle markers to the map and bind a pop-up

          var newCircle = CreatCircle(location.coordinates[1], location.coordinates[0],depth,magnitudes);
          //  cityCircles10.push(
           newCircle.addTo(layers.Truck);
           cityCircles30.push( newCircle.bindPopup(place+"<hr>Magnitudes = "+magnitudes+"<br>Depth = "+depth));
                      }
           else if (magnitudes<5) {
            // Add a circle markers to the map and bind a pop-up
// console.log(magnitudes);
            var newCircle = CreatCircle(location.coordinates[1], location.coordinates[0],depth,magnitudes);
            //  cityCircles10.push(
             newCircle.addTo(layers.H_Truck);
             cityCircles50.push( newCircle.bindPopup(place+"<hr>Magnitudes = "+magnitudes+"<br>Depth = "+depth));
}             else if (magnitudes<7) {
              // Add a circle markers to the map and bind a pop-up

              var newCircle = CreatCircle(location.coordinates[1], location.coordinates[0],depth,magnitudes);
              //  cityCircles10.push(
               newCircle.addTo(layers.MotorCycle);
               cityCircles70.push( newCircle.bindPopup(place+"<hr>Magnitudes = "+magnitudes+"<br>Depth = "+depth));
 }                else {
                  // Add a circle markers to the map and bind a pop-up

                  var newCircle = CreatCircle(location.coordinates[1], location.coordinates[0],depth,magnitudes);
                  //  cityCircles10.push(
                   newCircle.addTo(layers.Pedestrians);
                   cityCirclesO90.push( newCircle.bindPopup(place+"<hr>Magnitudes = "+magnitudes+"<br>Depth = "+depth));
     }



////////////////////
   
    // console.log(location.coordinates[0],location.coordinates[1],location.coordinates[2]);

}

Magnitudes_10=L.layerGroup(cityCircles10);
Magnitudes_30=L.layerGroup(cityCircles30);
Magnitudes_50=L.layerGroup(cityCircles50);
Magnitudes_70=L.layerGroup(cityCircles70);
Magnitudes_90=L.layerGroup(cityCircles90);
Magnitudes_90=L.layerGroup(cityCircles90);


L.control.layers(baseMaps, overlays).addTo(myMap);

// d3.json(PlatesURL, function(response) {
        
//   L.geoJSON(response, {
//     style:  {weight: 2,
//     color: "orange"}
//   }).addTo(Plates);
// });




});





