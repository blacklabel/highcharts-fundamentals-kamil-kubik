Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: undefined
    },
    xAxis: [{
        lineWidth: 0,
        lineColor: 'transparent',
        tickWidth:0,
        left: '50%',
    }],
    yAxis: [{
        tickPositions: [0,20,40,60,80,100], 
        left: '0%',
        reversed: true
    }, {
        tickPositions: [0,20,40,60,80],  
      left: '60%',
      endOnTick: false,
      showLastLabel: true,
      offset: 0,
    }],
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Chart v1',
        yAxis: 0,
        data: [32, 43, 13, 42, 54]
    }, {
        name: 'Chart v2',
        yAxis: 1,
        data: [32, 43, 13, 42, 54]
    }],
});

