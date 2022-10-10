Highcharts.chart('container', {
    chart: {
        type: 'bar',
        events: {
            load() {
                console.info(this);
            }
        },
        marginLeft: 0,
        marginRight: 0,
        spacingLeft: 0,
        spacingRight: 0
    },
    title: {
        text: undefined
    },
    legend: {
        enabled: false
    },
    xAxis: [{
        categories: ['Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5'],
        left: '50%',
        width: '20%',
        lineWidth: 0,
        labels: {
            align: 'left',
        },
    }],
    yAxis: [{
        left: '0%',
        width: '40%',
        reversed: true,
        title: {
            enabled: false,
        }
    }, {
        left: '60%',
        width: '40%',
        offset: 0,
        title: {
            enabled: false
        }
    }],
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                inside: true,
                format: '{y}%'
            },
            color: 'red'
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Chart v1',
        data: [32, 43, 13, 42, 54],
        dataLabels: {
            align: 'right'
        }
    }, {
        name: 'Chart v2',
        yAxis: 1,
        data: [32, 43, 13, 42, 54],
        dataLabels: {
            align: 'left'
        }
    }],
});
