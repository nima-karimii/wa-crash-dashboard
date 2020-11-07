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


function BarchartdataMaker(MMonth,monthdata)
{
  // console.log(MMonth,monthdata.Jul);
    
       switch (MMonth)
      {
         case 1:{monthdata.Jan+=1; break; }
         case 2:{monthdata.Feb+=1; break; }
         case 3:{monthdata.Mar+=1; break; }
         case 4:{monthdata.Apr+=1; break; }
         case 5:{monthdata.May+=1; break; }
         case 6:{monthdata.Jun+=1; break; }
         case 7:{monthdata.Jul+=1; break; }
         case 8:{monthdata.Aug+=1; break; }
         case 9:{monthdata.Sep+=1; break; }
         case 10:{monthdata.Oct+=1; break; }
         case 11:{monthdata.Nov+=1; break; }
         case 12:{monthdata.Dec+=1; break; }


        }


        return (monthdata);
      }



////////////////
////////////////////////////////////BarChart///////////////////////////////////////////

function Barchart(barchartData)
{
////////////barchart
Trucklist=Object.keys(barchartData.Truck);
TruckListvalue=Object.values(barchartData.Truck);
HTrucklist=Object.keys(barchartData.Heavy_Truck);
HTruckListvalue=Object.values(barchartData.Heavy_Truck);
console.log(Trucklist,TruckListvalue);
Bikelist=Object.keys(barchartData.Bike);
BikeListvalue=Object.values(barchartData.Bike);
Motorlist=Object.keys(barchartData.MotorCycle);
MotorkListvalue=Object.values(barchartData.MotorCycle);
Otherlist=Object.keys(barchartData.Other);
OtherListvalue=Object.values(barchartData.Other);

var trace1 = {
  x: Trucklist,
  y: TruckListvalue,
  name: 'Truck',
  type: 'bar'
};

var trace2 = {
  x: HTrucklist,
  y: HTruckListvalue,
  name: 'Heavytruck',
  type: 'bar'
};
var trace3 = {
  x: Otherlist,
  y: OtherListvalue.map(function(a, index, array){
    return Math.round(a/10);}),
  name: 'Other',
  type: 'bar'
};
var trace4 = {
  x: Motorlist,
  y: MotorkListvalue,
  name: 'MotorCycle',
  type: 'bar'
};
var trace5 = {
  x: Bikelist,
  y: BikeListvalue,
  name: 'Bike',
  type: 'bar'
};

var data = [trace1, trace2,trace3,trace4,trace5];

var layout = {barmode: 'group',
        title: 'Number of involved vehicles',
        font: {
            family: 'Arial',
            color: '#7f7f7f'
          },
            };

Plotly.newPlot('Barchart2', data, layout);

          }
////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////////
// d3.json(queryUrl).then((data) => {


d3.csv(queryUrl).then(function(data, err) {
    if (err) throw err;
console.log(data.length);
    console.log(data);

var barchartData = new Object();

barchartData = {
Truck: { Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
Heavy_Truck:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
Bike: { Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
MotorCycle:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
Other:{ Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0,},
};



  for (var i = 0; i < data.length; i++) {
 

      if (+data[i].TOTAL_BIKE_INVOLVED>0) {
          barchartData.Bike=BarchartdataMaker(data[i].MONTH,barchartData.Bike);
      }
      if (+data[i].TOTAL_TRUCK_INVOLVED>0) {
                    barchartData.Truck=BarchartdataMaker(data[i].MONTH,barchartData.Truck);
                  }
      if (+data[i].TOTAL_HEAVY_TRUCK_INVOLVED>0) {
                    barchartData.Heavy_Truck=BarchartdataMaker(data[i].MONTH,barchartData.Heavy_Truck);
                  }
      if (+data[i].TOTAL_MOTOR_CYCLE_INVOLVED>0) {
                    barchartData.MotorCycle=BarchartdataMaker(data[i].MONTH,barchartData.MotorCycle);
                  }
      if (+data[i].TOTAL_OTHER_VEHICLES_INVOLVED>0) {
        console.log(data[i].MONTH);   
        console.log(barchartData.Other);   

                     barchartData.Other=BarchartdataMaker(data[i].MONTH,barchartData.Other);

                   }

}



Barchart(barchartData);

//////////////////////////////////////////////////////////
console.log(barchartData);   
// console.log(Event_sev_ob);

Total_Crash_display(data.length);


});




}
