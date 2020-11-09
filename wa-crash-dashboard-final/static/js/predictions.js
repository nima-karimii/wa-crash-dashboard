



function myprediction()
{


console.log("Hello World")
// Getting the value of year
 Year_Element = d3.select("#selected_year");
 selected_year=Year_Element.property("value");
 console.log(selected_year)

// Getting the value of day
Day_Element = d3.select("#selected_day");
selected_day=Day_Element.property("value");
console.log(selected_day)

//
// Getting the value of time
Hour_Element = d3.select("#selected_hour");
selected_hour=Hour_Element.property("value");

console.log(selected_day,selected_hour,selected_hour,10,12);

/// Plotting the result 
if (selected_hour == "" ) window.alert("Input the Hour");
else{ 

X= [ 12,13,14,15,16]
Data= [ 1,2,3,4,4]
console.log(X); 

CharacterData(X,Data);
}
}


function CharacterData(X,Data)
{

Marker_color=[];
Marker_symbol=[];
Marker_text=[];
Marker_size=[];
for (i=0;i<Data.length;i++)
{
switch(Data[i])
{
    case 1 : Marker_color[i]='green';Marker_symbol[i]='cross';Marker_text[i]='Perfectly Safe';break;
    case 2 : Marker_color[i]='lightgreen';Marker_symbol[i]='cross';Marker_text[i]='Moderately Dangerous';break;
    case 3 : Marker_color[i]='gold';Marker_symbol[i]='x';Marker_text[i]='Considerably Dangerous';break;
    case 4 : Marker_color[i]='red';Marker_symbol[i]='x';Marker_text[i]='Severely Dangerous';break;

}
}
    



var trace2 = {
    x: X,
    y: [0, 0, 0, 0,0],
    mode: 'markers',
    marker: {
      color: Marker_color,
      size: [100,100,100,100,100],
      symbol: Marker_symbol
    },
    text: Marker_text,
    textposition: 'top',
    textfont: {
        family: 'sans serif',
        size: 50,
        color: '#1f77b4'
      },
    hoverinfo: 'text',
    type: 'scatter'
  };
  
  
  var layout = {
    showlegend: false,
    title: 'The Safely Level of your travel time',
    yaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false
    },
    xaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: true,
        title: 'The Hours ',
        titlefont: {
             family: 'Courier New,',
             size: 18,
             color: '#7f7f7f'},
        tickfont:{
            size:50}
    },
};

  
var data = [trace2];
  
  Plotly.newPlot('predictions_chart', data, layout);
  
}