
function barchart(barchartData)
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
// var trace3 = {
//   x: Otherlist,
//   y: OtherListvalue,
//   name: 'Other',
//   type: 'bar'
// };
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

var data = [trace1, trace2,trace4,trace5];

var layout = {barmode: 'group'};

Plotly.newPlot('Barchart', data, layout);

var trace3 = {
  x: Otherlist,
  y: OtherListvalue,
  name: 'Other',
  type: 'bar'
};

Plotly.newPlot('Barchart2',[trace3], {});

}
