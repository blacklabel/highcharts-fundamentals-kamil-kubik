const generateSeries = () =>
    Array.from({ length: 100 }, (_, index) => ({
        name: `Element v${index}`,
        data: Array.from({ length: 5 }, () => 
            Math.floor(Math.random() * (95 - 55 + 1)) + 55),
        color: 'red'
    })); 

Highcharts.chart('container', {
    chart: {
        type: 'column',
    },
    title: {
        text: undefined
    },
    legend: {
        enabled: false
    },
    xAxis: {
        categories: [
            'BANK 1',
            'BANK 2',
            'BANK 3',
            'BANK 4',
            'BANK 5',
        ],
    },
    yAxis: {
        max: 125,
        title: {
            text: undefined
        },
    },
    credits: {
        enabled: false,
    },
    series: generateSeries(),
    plotOptions: {
        series: {
            pointPadding: 0,
            borderWidth: 0
        }
    }
});