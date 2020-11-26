//// Variables 
var Summery={},Event_sev_ob,Heat_map_Data, barchartData,Number_of_crash,BaloonData;
var X_balloon =[] , Y_balloon =[] ,Fatal_time_data=[];

$('#min').click(function(){ $("#text").toggle(200);});

$('#min_all').click(function(){ 
  if($("#min_time").hasClass("btn-secondary"))
  { $("#min_time").addClass("btn-primary"); $("#min_time").removeClass("btn-secondary");$("#time_text").toggle(200);}
  if($("#min_map").hasClass("btn-secondary"))
  { $("#min_map").addClass("btn-primary"); $("#min_map").removeClass("btn-secondary");
  $("#min_car").addClass("btn-primary"); $("#min_car").removeClass("btn-secondary");
  $("#map_text").toggle(200);}
  if($("#min_type").hasClass("btn-secondary"))
  { $("#min_type").addClass("btn-primary"); $("#min_type").removeClass("btn-secondary");$("#type_text").toggle(200);}
});
$('#min_time').click(function(){ 
  if($("#min_time").hasClass("btn-primary")){
    $("#min_time").addClass("btn-secondary");$("#min_time").removeClass("btn-primary");}
    else { $("#min_time").addClass("btn-primary"); $("#min_time").removeClass("btn-secondary");}
  $("#time_text").toggle(200);});

$('#min_time2').click(function(){ 
  if($("#min_time").hasClass("btn-primary")){
    $("#min_time").addClass("btn-secondary");$("#min_time").removeClass("btn-primary");}
    else { $("#min_time").addClass("btn-primary"); $("#min_time").removeClass("btn-secondary");}
    $("#time_text").toggle(200);});

$('#min_map').click(function(){ 
  if($("#min_map").hasClass("btn-primary")){
    $("#min_map").addClass("btn-secondary");
    $("#min_map").removeClass("btn-primary");
    $("#min_car").addClass("btn-secondary");
    $("#min_car").removeClass("btn-primary");
  }
    else { 
      $("#min_car").addClass("btn-primary"); 
      $("#min_car").removeClass("btn-secondary");
      $("#min_map").addClass("btn-primary"); 
      $("#min_map").removeClass("btn-secondary");}
    $("#map_text").toggle(200);});

$('#min_map2').click(function(){   
  if($("#min_map").hasClass("btn-primary")){
    $("#min_map").addClass("btn-secondary");
    $("#min_map").removeClass("btn-primary");
    $("#min_car").addClass("btn-secondary");
    $("#min_car").removeClass("btn-primary");
  }
    else { 
      $("#min_car").addClass("btn-primary"); 
      $("#min_car").removeClass("btn-secondary");
      $("#min_map").addClass("btn-primary"); 
      $("#min_map").removeClass("btn-secondary");}
    $("#map_text").toggle(200);});

$('#min_type').click(function(){ 
  if($("#min_type").hasClass("btn-primary")){
    $("#min_type").addClass("btn-secondary");
    $("#min_type").removeClass("btn-primary");
  }
  else { 
    $("#min_type").addClass("btn-primary"); 
    $("#min_type").removeClass("btn-secondary");}
  $("#type_text").toggle(200);});

$('#min_type2').click(function(){ 
  if($("#min_type").hasClass("btn-primary")){
    $("#min_type").addClass("btn-secondary");
    $("#min_type").removeClass("btn-primary");
  }
  else { 
    $("#min_type").addClass("btn-primary"); 
    $("#min_type").removeClass("btn-secondary");}
  $("#type_text").toggle(200);});

$('#min_car').click(function(){   
  if($("#min_map").hasClass("btn-primary")){
    $("#min_map").addClass("btn-secondary");
    $("#min_map").removeClass("btn-primary");
    $("#min_car").addClass("btn-secondary");
    $("#min_car").removeClass("btn-primary");
  }
    else { 
      $("#min_car").addClass("btn-primary"); 
      $("#min_car").removeClass("btn-secondary");
      $("#min_map").addClass("btn-primary"); 
      $("#min_map").removeClass("btn-secondary");}
    $("#map_text").toggle(200);});



function Creat_SeverityObj(Fatal,Hospital,Medical,PDO_Major,PDO_Minor)
  {
  this.Fatal = Fatal;
  this.Hospital = Hospital;
  this.Medical = Medical;
  this.PDO_Major = PDO_Major;
  this.PDO_Minor = PDO_Minor;
}


// Store our endpoint inside queryUrl
var queryUrl = "/crash/2019";
var Suburl="https://data.gov.au/geoserver/wa-suburb-locality-boundaries-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_6a0ec945_c880_4882_8a81_4dbcb85e74e5&outputFormat=json"
const API_KEY = "pk.eyJ1Ijoia2FyaW1paSIsImEiOiJja2ZkdTNuNnMwN205MzFwNTF2eGszOHM1In0.jfNBiTctjlmbsc8qwQYmvA";


var layers = {
  Bike: new L.LayerGroup(),
  Truck: new L.LayerGroup(),
  H_Truck: new L.LayerGroup(),
  MotorCycle: new L.LayerGroup(),
  Pedestrians: new L.LayerGroup(),
  Other: new L.LayerGroup(),
};
// // // console.log(layers.Bike);

var more_layers= {
  Fatal: new L.LayerGroup(),
  Suburb: new L.LayerGroup(),
}




// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(myMap);



  var Bike_popup = [];
  var Truck_popup = [];
  var H_Truck_popup = [];
  var MotorCycle_popup = [];
  var Pedestrians_popup = [];
  var Other_popup = [];
  var Fatal_popup=[];




data_refresh("2019");


function clearsummery(){

  document.getElementById("total-crashes").outerHTML = "<label id='total-crashes' ><img src='https://i2.wp.com/garysbikesutah.com/wp-content/uploads/2018/07/opc-ajax-loader.gif' width='60' height='60'>"; 

  var bike_panel = d3.select("#total-Bikes");
  bike_panel.html("");
  bike_panel.append("b").text("?");
  var truck_panel = d3.select("#total-Trucks");
  truck_panel.html("");
  truck_panel.append("b").text("?");
  var htruck_panel = d3.select("#total-HTrucks");
  htruck_panel.html("");
  htruck_panel.append("b").text("?");
  var mc_panel = d3.select("#total-MC");
  mc_panel.html("");
  mc_panel.append("b").text("?");
  var cars_panel = d3.select("#total-Cars");
  cars_panel.html("");
  cars_panel.append("b").text("?");
  var ped_panel = d3.select("#total-Ped");
  ped_panel.html("");
  ped_panel.append("b").text("?");
 
  document.getElementById("total-fatal").outerHTML = "<label id='total-fatal' ><img src='https://i2.wp.com/garysbikesutah.com/wp-content/uploads/2018/07/opc-ajax-loader.gif' width='60' height='60'></label>"; 

}


//// selecting the year ////
function optionChanged(ID) {

console.log("START");
clearsummery(); 
  
//  if (page!=1) 
//  {
//   if ( document.getElementById("map").className.match(/(?:^|\s)a(?!\S)/) ) {document.getElementById("map").outerHTML = "<div id='map' class='a'></div>"; }
//     else  {document.getElementById("map").outerHTML = "<div id='map' class='hidden_display'></div>"; }}
//   else { document.getElementById("map").outerHTML = "<div id='map' class='a'></div>"; }

  
  data_refresh(ID);
}





//////////////////////// Balloon Chart ///////////////

/// collecting the data for Balloon chart of Accident type


function  balloonDatamaker (SEVERITY,EVENT_NATURE ){


  // // // // // // console.log(SEVERITY,EVENT_NATURE);
  
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
  // // // // // // console.log(SEVERITY,EVENT_NATURE,Event_sev_ob[EVENT_NATURE][SEVERITY]);
  
  Event_sev_ob[EVENT_NATURE][SEVERITY]+=1;
  
  }


//////////////////////// Bar Chart ///////////////



function BarchartdataMaker(MMonth,monthdata)
{
  // // // // console.log(MMonth,monthdata.Jul);
    
       switch (MMonth)
      {
         case 1:{monthdata.Jan+=1; break; }
         case 2:{monthdata.Feb+=1; break; }
         case 3:{monthdata.Mar+=1; break; }
         case 4:{monthdata.Apr+=1; break; }
         case 5:{monthdata.May+=1; break; }
         case 6:{monthdata.Jun+=1; break; }
         case 7:{monthdata.Jul+=1;  break;   }
         case 8:{monthdata.Aug+=1; break; }
         case 9:{monthdata.Sep+=1; break; }
         case 10:{monthdata.Oct+=1; break;}
         case 11:{monthdata.Nov+=1; break; }
         case 12:{monthdata.Dec+=1; break; }


        }

  // // // console.log(MMonth,monthdata.Jul);

        return (monthdata);
      }



function Barchart(barchartData)
{
////////////barchart
Trucklist=Object.keys(barchartData.Truck);
TruckListvalue=Object.values(barchartData.Truck);
HTrucklist=Object.keys(barchartData.Heavy_Truck);
HTruckListvalue=Object.values(barchartData.Heavy_Truck);
// // // console.log(barchartData);
Bikelist=Object.keys(barchartData.Bike);
BikeListvalue=Object.values(barchartData.Bike);
Motorlist=Object.keys(barchartData.MotorCycle);
MotorkListvalue=Object.values(barchartData.MotorCycle);
Otherlist=Object.keys(barchartData.Other);
OtherListvalue=Object.values(barchartData.Other);

// // console.log(TruckListvalue);
  

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
  // y: OtherListvalue.map(function(a, index, array){
  //   return Math.round(a/10);}),
  y:OtherListvalue,
  name: 'Cars&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
  marker: {
    color: 'rgb(142,124,195)'
  },
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

var data = [trace1, trace2,trace4,trace5];
var cardata=[trace3]
// // // console.log(data);
var layout = {title: 'Number of Accidents, during the year for each vehicles types   ',
  barmode: 'group',
  yaxis: {
    title: 'Number of Accident'}
  };

Plotly.newPlot('Barchart2', data, layout);

var carlayout = {title: 'Number of Accidents, during the year for cars ',
font:{
  family: 'Raleway, sans-serif'
},
yaxis: {
  title: 'Number of Accident'},
showlegend: true,
yaxis: {
  zeroline: false,
  gridwidth: 2
},
};

Plotly.newPlot('Barchart3', cardata, carlayout);




}


////////   Heat MAP ///////////////////////



function heatmapData (DayWeek, TimeDay,Data) {
  // // // // // // console.log(DayWeek,TimeDay);

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
  // console.log(data);

  Tdata= data[0].map((_, colIndex) => data.map(row => row[colIndex]));

  // console.log(Tdata);

var heatmapData = [
    {

        z: Tdata,

        x: ['Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday','Sunday'],
        y: ['Morning<br>6am-12pm', 'Afternoon<br>12pm-6pm', 'Evening<br>6pm-12am','Night<br>12am-6am'],
        type: 'heatmap',
        colorscale: 'OrRd',
        hoverongaps: false,
        // hoverinfo: 'z',
    }
    ];

var layout = {
    title: 'Number of road crashes based on Day-time and Week-day',
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
      var map_button=d3.select("#map_b").node().text;
      var Barchart1_panel = d3.select("#Barchart1");
      Barchart1_panel.html("");
      var Barchart3_panel = d3.select("#Barchart3");
      Barchart3_panel.html("");
      // // // console.log(map_button);

switch(i)
{
  case 1 : {
            heatmap_panel.attr('class','hidden_display');
            Barchart2_panel.attr('class','hidden_display');
            vis_container_panel.attr('class','hidden_display');
            Barchart3_panel.attr('class','hidden_display');
            Barchart1_panel.attr('class','hidden_display');
            mapping(1);
            break; }
  case 2 : {
            map_panel.attr('class','hidden_display');
            heatmap_panel.attr('class','a');
            Barchart2_panel.attr('class','hidden_display');
            vis_container_panel.attr('class','hidden_display');
            Barchart3_panel.attr('class','hidden_display');
            Barchart1_panel.attr('class','a');
            plotting();
            break; }
  case 3 : {map_panel.attr('class','hidden_display');
            heatmap_panel.attr('class','hidden_display');
            Barchart2_panel.attr('class','a');
            vis_container_panel.attr('class','hidden_display');
            Barchart3_panel.attr('class','a');
            Barchart1_panel.attr('class','hidden_display');

            plotting();
            break; }
  case 4 : {map_panel.attr('class','hidden_display');
            heatmap_panel.attr('class','hidden_display');
            Barchart2_panel.attr('class','hidden_display');
            vis_container_panel.attr('class','a')
            Barchart3_panel.attr('class','hidden_display');
            Barchart1_panel.attr('class','hidden_display');
            plotting();
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
  // // // console.log (Object.entries(SelectedID_MetaData));

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
  info_panel.text(info_array[6][1]);


}


function Total_Crash_display(Number)
{
  var info_panel = d3.select("#total-crashes");

  info_panel.html("");
  info_panel.text(Number)

}

function barchart_fatal(timeData)
{ 
  X= timeData.map(function(obj) { return obj.hour});
  Y= timeData.map(function(obj) { return obj.Number});
// console.log(X,Y);
  var data = [
    {
      x:X,
      y: Y,
      type: 'bar',
      marker: {
        color: 'red',
        opacity: 0.8
      }
    }
  ];

  var layout = {
    title: 'Number of Fatalities in each hours',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: -45,
      showticklabels: true,
      title: 'The Hours ',
      dtick: 1

    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05


  };
  
  Plotly.newPlot('Barchart1', data,layout);



}



function data_refresh(YEAR)

{

  queryUrl="/crash/"
  queryUrl=queryUrl+YEAR

  TimequeryUrl="/time/"
  TimequeryUrl=TimequeryUrl+YEAR


/// Creating an Object to store Severity data

Event_sev_ob = new Object();
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


Heat_map_Data = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];


  

  
  barchartData = new Object();

  barchartData = {
  Truck: { Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
  Heavy_Truck:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
  Bike: { Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
  MotorCycle:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
  MotorCycle:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
  Other:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
  };
  
  

Summery={
  "Total_Bike":0,
  "Total_Truck":0,
  "Total_HTruck":0,
  "Total_MotorCycle":0,
  "Total_Pedestrians":0,
  "Total_Other":0,
  "Total_Fatal":0,
}



layers = {
  Bike: new L.LayerGroup(),
  Truck: new L.LayerGroup(),
  H_Truck: new L.LayerGroup(),
  MotorCycle: new L.LayerGroup(),
  Pedestrians: new L.LayerGroup(),
  Other: new L.LayerGroup(),
};
// // // console.log(layers.Bike);

more_layers= {
  Fatal: new L.LayerGroup(),
  Suburb: new L.LayerGroup(),
}












 ///////////////////////////////////////////////////////////////////////////////////
d3.json(queryUrl).then((data) => {

console.log("2.Data");



  Bike_popup = [];
  Truck_popup = [];
  H_Truck_popup = [];
  MotorCycle_popup = [];
  Pedestrians_popup = [];
  Other_popup = [];
  Fatal_popup=[]
  // // // // // console.log( barchartData.Truck);



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
                    Bike_popup.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                                                   "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                                                   "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

          Summery.Total_Bike=Summery.Total_Bike+(+data[i].TOTAL_BIKE_INVOLVED);
          barchartData.Bike=BarchartdataMaker(data[i].MONTH,barchartData.Bike);
          // // // // // // console.log( barchartData.Bike);
      }
      if (+data[i].TOTAL_TRUCK_INVOLVED>0) {
        Summery.Total_Truck=Summery.Total_Truck+(+data[i].TOTAL_TRUCK_INVOLVED);
        var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Green");
                    newCircle.addTo(layers.Truck);
                    Truck_popup.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

                    barchartData.Truck=BarchartdataMaker(data[i].MONTH,barchartData.Truck);
                    // // // console.log(data[i].MONTH,barchartData.Truck);
                    // // // console.log(barchartData.Truck,barchartData.Heavy_Truck);


                  }
      if (+data[i].TOTAL_HEAVY_TRUCK_INVOLVED>0) {
        Summery.Total_HTruck=Summery.Total_HTruck+(+data[i].TOTAL_HEAVY_TRUCK_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Orange");
                    newCircle.addTo(layers.H_Truck);
                    H_Truck_popup.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));


                    barchartData.Heavy_Truck=BarchartdataMaker(data[i].MONTH,barchartData.Heavy_Truck);
                  }
      if (+data[i].TOTAL_MOTOR_CYCLE_INVOLVED>0) {
        Summery.Total_MotorCycle=Summery.Total_MotorCycle+(+data[i].TOTAL_MOTOR_CYCLE_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"yellow");
                    newCircle.addTo(layers.MotorCycle);
                    MotorCycle_popup.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));
                    // // // // // // console.log("Motor",data[i].MONTH);

                    barchartData.MotorCycle=BarchartdataMaker(data[i].MONTH,barchartData.MotorCycle);
                  }
      if (+data[i].TOTAL_OTHER_VEHICLES_INVOLVED>0) {
        Summery.Total_Other=Summery.Total_Other+(+data[i].TOTAL_OTHER_VEHICLES_INVOLVED);
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"purple");
                    newCircle.addTo(layers.Other);
                    Other_popup.push( newCircle.bindPopup(Adress+"<br>"+C_date+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));

                    barchartData.Other=BarchartdataMaker(data[i].MONTH,barchartData.Other);
                    // // // // console.log("Other",data[i].MONTH);
                    // // // // console.log(barchartData.Other);

                  }
      if (+data[i].TOTAL_PEDESTRIANS_INVOLVED>0) {
        Summery.Total_Pedestrians=Summery.Total_Pedestrians+(+data[i].TOTAL_PEDESTRIANS_INVOLVED);
        var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"Gold");
                    newCircle.addTo(layers.Pedestrians);
                                   Pedestrians_popup.push(newCircle.bindPopup(Adress+"<br>"+C_date+
                                   "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                                   "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));
                  }

      if (data[i].SEVERITY=="Fatal") {
        // // // // // // console.log(data[i].SEVERITY);
        Summery.Total_Fatal=Summery.Total_Fatal+1;
        // // // console.log(C_date);
      // Add a circle markers to the map and bind a pop-up
         var newCircle = CreatCircle(data[i].LATITUDE, data[i].LONGITUDE,"red");
                   //  cityCircles10.push(
                    newCircle.addTo(more_layers.Fatal);
                    Fatal_popup.push( newCircle.bindPopup(Adress+"<br>"+C_date+"-"+data[i].CRASH_TIMEDAY+
                    "<br>C:"+Other_V+" T:"+TTruck+" HT:"+HTruck+
                    "<br>M:"+Motor+" B:"+BBike+" p"+Pdstrian));
                  }
/////
// // // // // // console.log(data[i].CRASH_DAYWEEK,data[i].CRASH_TIMEDAY);
Heat_map_Data=heatmapData (data[i].CRASH_DAYWEEK,data[i].CRASH_TIMEDAY,Heat_map_Data);
balloonDatamaker (data[i].SEVERITY,data[i].EVENT_NATURE );

}

// console.log("END");



Number_of_crash=data.length;

////////////////////////////////////////////



var arr = Object.keys(Event_sev_ob).map((k) => Event_sev_ob[k])
X_balloon=Object.keys(Event_sev_ob)
// // // // console.log(arr[0].Fatal);
Y_balloon=Object.keys(arr[0])
Data_arr=[]
for (i=0 ;i<arr.length;i++)
{ var aa= Object.keys(arr[i]).map((k) => arr[i][k])
  Data_arr.push(aa);
}
console.log("Lodaing Done");


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

plotting();

if ( document.getElementById("map").className.match(/(?:^|\s)a(?!\S)/) ) 
{mapping(1); }



});

d3.json(TimequeryUrl).then((timeData) => {
  console.log("timeData_load");
  Fatal_time_data=timeData;

});


}








function mapping(type)
{

console.log("mapping");


Demographic_Info(Summery);
Total_Crash_display(Number_of_crash);
  var myMap;


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


// Create an overlays object to add to the layer control
var overlays = {
  "Bikes": layers.Bike,
  "Trucks":layers.Truck,
  "H_Trucks": layers.H_Truck,
  "MotorCycles": layers.MotorCycle,
  "Cars": layers.Other,
  "Pedestrians": layers.Pedestrians,
  "Suburb": more_layers.Suburb,
  "Fatal": more_layers.Fatal,
};


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Light MAp":lightMap,
    "satellite Map":satMap,
  };


 if (type==2)
 {// console.log(document.getElementById("map").className);
  if ( document.getElementById("map").className.match(/(?:^|\s)a(?!\S)/) ) 
    {document.getElementById("map").outerHTML = "<div id='map' class='a'></div>"; }
     else  {document.getElementById("map").outerHTML = "<div id='map' class='hidden_display'></div>"; }
 }
 else {document.getElementById("map").outerHTML = "<div id='map' class='a'></div>";}

     // Create our map, giving it the satellite Map and earthquakes layers to display on load
    myMap = L.map("map", {
      center:  [-31.9505, 115.8605],
      zoom: 7,
      layers: [
      //  layers.Bike, 
      //  layers.Truck, 
      //  layers.H_Truck, 
      //  layers.MotorCycle, 
      //  layers.Pedestrians, 
      //  layers.Other,
      //  more_layers.Fatal,
      //  more_layers.Suburb,
        ]
    });
  
  //   // Add our 'Satmap' tile layer to the map
  streetmap.addTo(myMap);  

  layers.Bike=L.layerGroup(Bike_popup);
  layers.Truck=L.layerGroup(Truck_popup);
  layers.H_Truck=L.layerGroup(H_Truck_popup);
  layers.MotorCycle=L.layerGroup(MotorCycle_popup);
  layers.Other=L.layerGroup(Other_popup);
  layers.Pedestrians=L.layerGroup(Pedestrians_popup);
  
  L.control.layers(baseMaps,overlays).addTo(myMap);
  
  more_layers.Fatal=L.layerGroup(Fatal_popup);
  
  
  d3.json(Suburl).then( function(Geo) {
    // console.log(Suburl); 
    // console.log(Geo) ;    
    L.geoJSON(Geo.features, {
      style: {
      weight: 2,
      color: "orange"}
    }).addTo(more_layers.Suburb);
  });
    
 console.log("mapping_done");

}



function plotting()
{
console.log("plotting");

Ballonmaker(BaloonData,X_balloon,Y_balloon);
Heatmap_plot(Heat_map_Data);
Barchart(barchartData);
Demographic_Info(Summery);
Total_Crash_display(Number_of_crash);
barchart_fatal(Fatal_time_data);
console.log("plotting_done");

}



