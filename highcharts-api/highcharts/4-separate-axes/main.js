Highcharts.chart('container', {
    chart: {
        type: 'bar',
        marginTop: 50,
        marginLeft: 0,
        marginRight: 0,
        events: {
            render() {
                const chart = this,
                    yAxis = chart.yAxis;

                if (yAxis.length > 0) {
                    yAxis.map((axis) => {
                        axis.axisTitle.translate(0, -(chart.plotTop + axis.height));
                    })
                }
            }
        }
    },
    title: {
        text: ''
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
        }
    }],
    yAxis: [{
        max: 100,
        left: '0%',
        width: '40%',
        reversed: true,
        title: {
            text: 'Managerial Position',
        }
    }, {
        max: 100,
        left: '60%',
        width: '40%',
        offset: 0,
        title: {
            text: 'Non Managerial Position',
        }
    }],
    plotOptions: {
        series: {
            stacking: 'normal'
        },
        bar: {
            dataLabels: {
                enabled: true,
                inside: true,
                format: '{y}%'
            },
            color: 'red'
        }
    },
    series: [{
        enableMouseTracking: false,
        data: Array.from({ length: 5 }, () => 100),
        color: '#A1B5C9',
        dataLabels: {
            enabled: false
        }
      }, {
        yAxis: 1,
        enableMouseTracking: false,
        data: Array.from({ length: 5 }, () => 100),
        color: '#A1B5C9',
        dataLabels: {
            enabled: false
        }
      }, {
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
    }]
});
