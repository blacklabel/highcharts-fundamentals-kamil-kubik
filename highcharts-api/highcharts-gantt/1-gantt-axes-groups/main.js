Highcharts.ganttChart('container', {
    xAxis: [{
        dateTimeLabelFormats: { 
            week: '%A, %d %b, %Y' 
        }
    }],
    yAxis: {
        categories: ['Main', 'First', 'Second']
    },
    series: [{
        name: 'Project 1',
        data: [{
            name: 'Main',
            pointWidth: 0
        }, {
            name: 'First',
            y: 1,
            start: 1560902400000,
            end: 1561075200000
        }, {
            name: 'Second',
            y: 2,
            start: 1560902400000,
            end: 1561075200000
        }, {
            name: 'Second',
            y: 2,
            start: 1561507200000,
            end: 1561680000000
        }]
    }]
});
