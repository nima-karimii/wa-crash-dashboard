// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var PlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
const API_KEY = "pk.eyJ1Ijoia2FyaW1paSIsImEiOiJja2ZkdTNuNnMwN205MzFwNTF2eGszOHM1In0.jfNBiTctjlmbsc8qwQYmvA";



  // Define The Maps layers

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
  Magnitudes_1: new L.LayerGroup(),
  Magnitudes_3: new L.LayerGroup(),
  Magnitudes_5: new L.LayerGroup(),
  Magnitudes_7: new L.LayerGroup(),
  Magnitudes_O7: new L.LayerGroup(),
};

  // Create our map, giving it the satellite Map and earthquakes layers to display on load
  var myMap = L.map("map", {
    center:  [36.7783, -119.4179],
    zoom: 3,
    layers: [
     layers.Magnitudes_1, 
     layers.Magnitudes_3, 
     layers.Magnitudes_5, 
     layers.Magnitudes_7, 
     layers.Magnitudes_O7, 
      ]
  });

//   // Add our 'Satmap' tile layer to the map
satMap.addTo(myMap);  

// Create an overlays object to add to the layer control
var overlays = {
  "Magnitudes less than 1": layers.Magnitudes_1,
  "Magnitudes between (1-3)":layers.Magnitudes_3,
  "Magnitudes between (3-5)": layers.Magnitudes_5,
  "Magnitudes between (5-7)": layers.Magnitudes_7,
  "Magnitudes Greater than 7": layers.Magnitudes_O7,
  "Tectonic Plates": Plates  

};

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Light MAp":lightMap,
    "satellite Map":satMap,
  };


function ColorSelector (Depth)
{ var Color="";
if (Depth<10) Color="lightgreen";
else if (Depth<30) Color="yellow";
else if (Depth<50) Color="gold";
else if (Depth<70) Color="darkorange";
else if (Depth<90) Color="red";
else Color="darkred";
// console.log(Depth);
return (Color);
}


function CreatCircle (lat,lng,depth,magnitudes)
{
return (
  L.circleMarker([lat, lng],
    {"radius":magnitudes*3,
      "fillColor": ColorSelector(depth),
      "fillOpacity": 1,
      "color": "black",
      "weight": 0.5,
      "opacity": 1
    })
    

)}


// Perform a GET request to the query URL
d3.json(queryUrl).then( function(data) {
  console.log(data);

earthquakeData= data.features;


  var cityCircles1 = [];
  var cityCircles3 = [];
  var cityCircles5 = [];
  var cityCircles7 = [];
  var cityCirclesO7 = [];

  for (var i = 0; i < earthquakeData.length; i++) {

     // Set the data location property to a variable
   var location = earthquakeData[i].geometry;
 
   console.log(earthquakeData);
     // Set the Earthquake magnitudes property to a variable
     var magnitudes = earthquakeData[i].properties.mag;
 
    // Set the Earthquake Depth property to a variable
     var depth=location.coordinates[2];
     var place =earthquakeData[i].properties.place;
//  console.log(magnitudes);
      
    var newCircle_l = CreatCircle(location.coordinates[1], location.coordinates[0],depth,magnitudes);
    var newCircle_p =newCircle_l.bindPopup(earthquakeData[i].properties.place+
      "<hr>Time = "+ (new Date(earthquakeData[i].properties.time)).toLocaleString()+
      "<br>Magnitudes = "+magnitudes+
      "<br>Depth = "+depth) 

/// Creating the layers base on magnitudes

    if (magnitudes<=1) {
          newCircle_l.addTo(layers.Magnitudes_1);
          cityCircles1.push(newCircle_p);  }
        else if (magnitudes<=3) {
          newCircle_l.addTo(layers.Magnitudes_3);
          cityCircles3.push(newCircle_p);   }
          else if (magnitudes<=5) {
              newCircle_l.addTo(layers.Magnitudes_5);
              cityCircles5.push(newCircle_p);}             
              else if (magnitudes<=7) {          
                newCircle_l.addTo(layers.Magnitudes_7);
                cityCircles7.push(newCircle_p); }                
                else {
                  newCircle_l.addTo(layers.Magnitudes_O7);
                  cityCirclesO7.push(newCircle_p);
     }

}
// Adding the Layers
Magnitudes_10=L.layerGroup(cityCircles1);
Magnitudes_30=L.layerGroup(cityCircles3);
Magnitudes_50=L.layerGroup(cityCircles5);
Magnitudes_70=L.layerGroup(cityCircles7);
Magnitudes_90=L.layerGroup(cityCirclesO7);

// // Create a control for our layers, add our overlay layers to it
L.control.layers(baseMaps, overlays).addTo(myMap);


//// Getting the  Tectonic Plates Geojson
d3.json(PlatesURL, function(response) {
        
  L.geoJSON(response, {
    style:  {weight: 2,
    color: "orange"}
  }).addTo(Plates);
});

// Set up the legend
var legend = L.control({ position: "bottomright" });
  
legend.onAdd = function() { var div = L.DomUtil.create('div', 'info legend')
      
div.innerHTML = "<table style= 'background-color: white'><tr><td colspan='2' ><h3>&nbsp;&nbsp;Depth </h3></td></tr>"+
                "<tr><td><10</td><td style= 'background-color: lightgreen'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>"+
                "<tr><td>10-30</td><td style= 'background-color: yellow'></td></tr>"+
                "<tr><td>30-50</td><td style= 'background-color: gold'></td></tr>"+
                "<tr><td>50-70</td><td style= 'background-color: darkorange'></td></tr>"+
                "<tr><td>70-90</td><td style= 'background-color: Red'></td></tr>"+
                "<tr><td>>90</td><td style= 'background-color: darkred'></td></tr>"+
                "</table>";

return div;
};

legend.addTo(myMap);


});





