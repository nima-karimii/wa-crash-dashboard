



function myprediction()
{



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


var  queryUrl="/api/"+selected_hour+"/"+selected_day+"/"+selected_year
console.log(queryUrl)

d3.json(queryUrl).then((data) => {
  console.log(data[0])

  console.log(data[0].Prediction.H)
var Data=[];
var X=[]
  for (i=0;i<data.length;i++)
{
X[i]=data[i].Prediction.H+":00";
Data[i]=data[i].Prediction.Pr;
}


console.log(X); 

CharacterData(X,Data);


});
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
    case 1 : Marker_color[i]='green';Marker_symbol[i]='cross';Marker_text[i]='Perfectly<br>Safe';break;
    case 2 : Marker_color[i]='lightgreen';Marker_symbol[i]='cross';Marker_text[i]='Moderately<br>Safe';break;
    case 3 : Marker_color[i]='gold';Marker_symbol[i]='x';Marker_text[i]='Considerably<br>Dangerous';break;
    case 4 : Marker_color[i]='red';Marker_symbol[i]='x';Marker_text[i]='Severely<br>Dangerous';break;

}
}
    



var trace2 = {
    x: X,
    y: [0, 0, 0, 0,0],
    mode: 'markers+text',
    marker: {
      color: Marker_color,
      size: [100,100,100,100,100],
      symbol: Marker_symbol
    },
    text: Marker_text,
    textposition: 'top',
    textfont: {
        family: 'sans serif',
        size: 20,
        color: Marker_color
      },
    hoverinfo: 'text',
    type: 'scatter'
  };
  
  
  var layout = {
    showlegend: false,
    title: 'The Safety Level of your travel time',
    yaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        dtick: 0.1,
        showticklabels: false
    },
    xaxis: {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        autotick: false,
        ticks: 'outside',
        dtick: 1,
        tickwidth: 4,
        tickcolor: '#000',
        showticklabels: true,
        // title: 'The Hours ',
        tickfont:{
            size:20}
    },
};

  
var data = [trace2];
  
  Plotly.newPlot('predictions_chart', data, layout);
  
}