const data = [3, 4, 5, 3, 2, 3, 2, 3, 4, 5, 3, 6, 3, 2, 4, 5, 5, 6, 6, 1, 6, 6, 2, 1, 3, 5, 6];

Highcharts.chart('container', {
    title: {
        text: 'Chart title'
    },
    xAxis: [{
        alignTicks: false
    }, {
        alignTicks: false,
        opposite: true
    }],
    yAxis: [{
        title: { text: 'Values' },
        min: 0,
        max: 12
    }, {
        title: { text: 'Values' },
        opposite: true,
        min: 0,
        max: 8
    }],
    series: [{
        name: 'Series 1',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: -1,
        point: {
            events: {
                click({ point }) {
                    const scatterSeries = point.series.chart.series[1].data,
                        x = point.x,
                        x2 = point.x2;

                    point.select();

                    if (point.selected) {
                        scatterSeries.forEach((scatterSerie) => {
                            const scatterSerieY = scatterSerie.y;
    
                            if (x <= scatterSerieY && x2 >= scatterSerieY ) {
                                scatterSerie.select(true, true);
                            }
                        });
                    }
                }
            }
        }
    }, {
        name: 'Series 2',
        type: 'scatter',
        data: data,
        id: 's1',
        marker: {
            radius: 5
        }
    }]
});