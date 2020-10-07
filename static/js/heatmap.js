queryUrl='https://raw.githubusercontent.com/abbyabridged/wa-crash-dashboard/abby/ETL/crash_data2.csv'


d3.csv(queryUrl).then(function(data, err) {
// Plotly.d3.csv('../../ETL/crash_data2.csv')

var Data = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

// console.log(Data[0][1],Data[0][1]);

function heatmapData (DayWeek, TimeDay,Data) {
  // console.log(DayWeek,TimeDay);

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
}

console.log(data[5].CRASH_DAYWEEK,data[9].CRASH_TIMEDAY);


for (var i = 0; i <data.length; i++){
heatmapData (data[i].CRASH_DAYWEEK,data[i].CRASH_TIMEDAY,Data);
}

console.log(Data);

});

// var trace1 = {
//     x: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
//     y: ['Morning', 'Afternoon', 'Evening', 'Night'],
//     z: Data,
//     name: "Time of day and week",
//     type: 'heatmap',
//     xaxis: 'x',
//     yaxis: 'y',
//     hoverongaps: false
//     };
    
// var data = [trace1];
    
// Plotly.newPlot('heatmap', data);


var heatmapData = [
    {

        z: [
            [3397, 6092, 1644, 2070], // Sun
            [5246, 7645, 2272, 2725], // Sat
            [7642, 11927, 3015, 2369], // Fri
            [7984, 11041, 2783, 1813], // Thurs
            [7934, 10648, 2535, 1560], // Wed
            [8089, 10454, 2343, 1437], // Tue
            [7078, 9896, 2012, 1473]], // Mon

        y: ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday','Tuesday','Monday'],
        x: ['Morning', 'Afternoon', 'Evening','Night'],
        type: 'heatmap',
        // colorscale: [
        //     ['0.0', '#EED2AA'],
        //     ['0.111111111111', '#EED2AA'],
        //     ['0.222222222222', 'E1AD66'],
        //     ['0.333333333333', 'D79233'],
        //     ['0.444444444444', 'D79233'],
        //     ['0.555555555556', 'rgb(253,141,60)'],
        //     ['0.666666666667', 'rgb(241,105,19)'],
        //     ['0.777777777778', 'D79233'],
        //     ['0.888888888889', '497CAB'],
        //     ['1.0', 'D79233']
        //   ],
        colorscale: 'OrRd',
        hoverongaps: false
    }
    ];
    
    Plotly.newPlot('heatmap', heatmapData);

    