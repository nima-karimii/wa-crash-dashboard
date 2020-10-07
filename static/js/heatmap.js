Plotly.d3.csv('../../ETL/crash_data2.csv');

var data = [[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0]]

function heatmapData (DayWeek, TimeDay, data) {
    switch(DayWeek) {
    case "Monday":
        switch(TimeDay){
            case "Morning" : {data[0][0]=+1;break;}
            case "Afternoon" : {data[0][1]=+1;break;}
            case "Evening" : {data[0][2]=+1;break;}
            case "Night" : {data[0][3]=+1;break;}
        }
    case "Tuesday":
        switch(TimeDay){
            case "Morning" : {data[1][0]=+1;break;}
            case "Afternoon" : {data[1][1]=+1;break;}
            case "Evening" : {data[1][2]=+1;break;}
            case "Night" : {data[1][3]=+1;break;}
        }
    case "Wednesday":
        switch(TimeDay){
            case "Morning" : {data[2][0]=+1;break;}
            case "Afternoon" : {data[2][1]=+1;break;}
            case "Evening" : {data[2][2]=+1;break;}
            case "Night" : {data[2][3]=+1;break;}
        }   
    case "Thursday":
        switch(TimeDay){
            case "Morning" : {data[3][0]=+1;break;}
            case "Afternoon" : {data[3][1]=+1;break;}
            case "Evening" : {data[3][2]=+1;break;}
            case "Night" : {data[3][3]=+1;break;}
        }
    case "Friday":
        switch(TimeDay){
            case "Morning" : {data[4][0]=+1;break;}
            case "Afternoon" : {data[4][1]=+1;break;}
            case "Evening" : {data[4][2]=+1;break;}
            case "Night" : {data[4][3]=+1;break;}
        }
    case "Saturday":
        switch(TimeDay){
            case "Morning" : {data[5][0]=+1;break;}
            case "Afternoon" : {data[5][1]=+1;break;}
            case "Evening" : {data[5][2]=+1;break;}
            case "Night" : {data[5][3]=+1;break;}
    }
    case "Friday":
        switch(TimeDay){
            case "Morning" : {data[6][0]=+1;break;}
            case "Afternoon" : {data[6][1]=+1;break;}
            case "Evening" : {data[6][2]=+1;break;}
            case "Night" : {data[6][3]=+1;break;}
        }

    heatmapData (data[i].DayWeek,data[i],TimeDay);

    }
}

function heatmapDataMaker (crashMoment,data){

console.log(crashMoment,data[0][1]);

    switch (crashMoment){
        case "Monday Morning": {data[0][0]=+1; break;}
        case "Monday Afternoon": {data[0][1]=+1; break;}
        case "Monday Evening": {data[0][2]=+1; break;}
        case "Monday Night": {data[0][3]=+1; break;}

}
return (data);
}


// var trace1 = {
// x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
// y: ['Morning', 'Afternoon', 'Evening', 'Night'],
// z: [[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9]],
// name: "Time of day and week",
// type: 'heatmap',
// xaxis: 'x',
// yaxis: 'y',
// hoverongaps: false
// };

// var heatmapData = [trace1];

// Plotly.newPlot('heatmap', heatmapData);



// var data = [
//     {
//         z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
//         x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//         y: ['Morning', 'Afternoon', 'Evening'],
//         type: 'heatmap',
//         hoverongaps: false
//     }
//     ];
    
//     Plotly.newPlot('myDiv', data);

// function unpack(rows, key) {
//   return rows.map(function(row) {
//     return row[key];
//   });
// }


// var z = [[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9]]
// console.log(z)

// console.log(unpack(rows, "CRASH_DAYWEEK"))
// console.log(unpack(rows, "CRASH_TIMEDAY"))


// var trace1 = {
//     x: unpack(rows, 'CRASH_DAYWEEK'),
//     y: unpack(rows, 'CRASH_TIMEDAY'),
//     z: [[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9],[1, 1, 30, 50, 1, 8, 9]],
//     name: "Time of day and week",
//     type: 'heatmap',
//     xaxis: 'x',
//     yaxis: 'y',
//     hoverongaps: false
