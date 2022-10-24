const generateSeries = () =>
    Array.from({ length: 100 }, (_, index) => ({
        name: `Element v${index}`,
        data: Array.from({ length: 5 }, () => {
            const min = 55,
                max = 95;

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }),
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