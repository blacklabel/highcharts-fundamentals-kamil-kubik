const generatedData = () =>
    Array.from({ length: 12 }, () => Math.floor(Math.random() * 15) + 1);

Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Chart title'
    },
    xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        crosshair: true
    },
    yAxis: {},
    series: [{
        name: 'Tokyo',
        data: generatedData(),
    }, {
        name: 'New York',
        data: generatedData()

    }, {
        name: 'London',
        data: generatedData()

    }, {
        name: 'Berlin',
        data: generatedData()

    }],
    plotOptions: {
        series: {
            events: {
                mouseOver({ target }) {
                    console.info(target);

                    // target.options.dataLabels.style.color = '#fff';

                    // target.options.dataLabels.attr({ color: '#fff' })

                    target.xAxis.update({
                        userOptions: {
                            color: 'red'
                        }
                    });
                }
            }
        }
    }
});