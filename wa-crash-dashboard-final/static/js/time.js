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
// document.getElementById("heatmap").outerHTML = "<div id='heatmap' class='hidden_display1'> </div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("map").outerHTML = "<div id='map'></div>";
// document.getElementById("vis_container").outerHTML = "<div id='vis_container' class='hidden_display'> </div>";


  Dashbord_refresh(queryUrl);
}

var queryUrl = "Samp_crash_data.csv";

Dashbord_refresh(queryUrl);

///////
function Dashbord_refresh(queryUrl)
{

 

  function Total_Crash_display(Number)
  {
    var info_panel = d3.select("#total-crashes");

    info_panel.html("");
    info_panel.append("h1").text(Number)
  
  }


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





///////////////////////////////////////////////////////////////////////////////////
// d3.json(queryUrl).then((data) => {


d3.csv(queryUrl).then(function(data, err) {
    if (err) throw err;
console.log(data.length);
    console.log(data);
// // console.log(data.length);



    // // console.log(data);



var Summery={
  "Total_Bike":0,
  "Total_Truck":0,
  "Total_HTruck":0,
  "Total_MotorCycle":0,
  "Total_Pedestrians":0,
  "Total_Other":0,
  "Total_Fatal":0,
}

 


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


          Summery.Total_Bike=Summery.Total_Bike+(+data[i].TOTAL_BIKE_INVOLVED);}
          // // // console.log( barchartData.Bike);
      
      if (+data[i].TOTAL_TRUCK_INVOLVED>0) {
        Summery.Total_Truck=Summery.Total_Truck+(+data[i].TOTAL_TRUCK_INVOLVED);
                         }
      if (+data[i].TOTAL_HEAVY_TRUCK_INVOLVED>0) {
        Summery.Total_HTruck=Summery.Total_HTruck+(+data[i].TOTAL_HEAVY_TRUCK_INVOLVED);
                          }
      if (+data[i].TOTAL_MOTOR_CYCLE_INVOLVED>0) {
        Summery.Total_MotorCycle=Summery.Total_MotorCycle+(+data[i].TOTAL_MOTOR_CYCLE_INVOLVED);
                         }
      if (+data[i].TOTAL_OTHER_VEHICLES_INVOLVED>0) {
        Summery.Total_Other=Summery.Total_Other+(+data[i].TOTAL_OTHER_VEHICLES_INVOLVED);
                  }
      if (+data[i].TOTAL_PEDESTRIANS_INVOLVED>0) {
        Summery.Total_Pedestrians=Summery.Total_Pedestrians+(+data[i].TOTAL_PEDESTRIANS_INVOLVED);
                  }

      if (data[i].SEVERITY=="Fatal") {
        // // // console.log(data[i].SEVERITY);
        Summery.Total_Fatal=Summery.Total_Fatal+1;}

/////
// // // console.log(data[i].CRASH_DAYWEEK,data[i].CRASH_TIMEDAY);
Heat_map_Data=heatmapData (data[i].CRASH_DAYWEEK,data[i].CRASH_TIMEDAY,Heat_map_Data);
}


console.log(Heat_map_Data);

Heatmap_plot(Heat_map_Data);

// console.log(barchartData);



//////////////////////////////////////////////////////////
// // console.log(Summery);   
// console.log(Event_sev_ob);

Total_Crash_display(data.length);



// // console.log(barchartData);


// Ballonmaker(Data_arr,X,Y);



});




}
