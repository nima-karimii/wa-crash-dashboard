// Plotly.d3.csv('https://raw.githubusercontent.com/abbyabridged/wa-crash-dashboard/master/fatalities_data.csv', function(err, rows){

Plotly.d3.csv('static/js/fatalities_data_count.csv', function(err, rows){

function unpack(rows, key) {
  return rows.map(function(row) {
    return row[key];
  });
}

console.log(unpack(rows, "Crash Type"))


var trace1 = {
  x: unpack(rows, 'Dayweek'),
  y: unpack(rows, 'Crash Type'),
  name: "Fatal crashes",
  type: 'bar',
  xaxis: 'x',
  yaxis: 'y'
};

var trace2 = {
  x: unpack(rows, 'Dayweek'),
  y: unpack(rows, 'Number Fatalities'),
  name: "Fatalities",
  type: 'bar',
  xaxis: 'x',
  yaxis: 'y'
};

var data = [trace1, trace2];

var layout = {
  title: "Fatalities/fatal crashes by day of the week",
  barmode: 'group'
};


Plotly.newPlot('barchart3', data, layout);
});



Plotly.d3.csv('static/js/fatalities_data_count.csv', function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) {
      return row[key];
    });
  }

var trace3 = {
  x: unpack(rows, 'Time of Day'),
  y: unpack(rows, 'Count'),
  name: "Fatal crashes",
  type: 'bar',
  xaxis: 'x',
  yaxis: 'y'
};

var trace4 = {
  x: unpack(rows, 'Time of Day'),
  y: unpack(rows, 'Number Fatalities'),
  name: "Fatalities",
  type: 'bar',
  xaxis: 'x',
  yaxis: 'y'
};

var data = [trace3, trace4];

var layout = {
  title: "Fatalities/fatal crashes by time of day",
  barmode: 'group'
};


Plotly.newPlot('barchart4', data, layout);
});
