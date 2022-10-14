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
        labels: {
            rotation: -45,
            formatter() {
                // console.info(this);
                const chart = this,
                    value = chart.value;

                console.info(chart.axis.options?.activeLabel);

                return chart.axis.options?.activeLabel === value ? `<span style="font-size: 0.8rem; fill: red">${value}<span/>` : value;
            }
        }
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
            point: {
                events: {
                    mouseOver({ target }) {
                        // console.info(this);
                        // console.info(target);

                        const series = this.series;
    
                        series.xAxis.options.activeLabel = target.category
                        series.chart.redraw(false);
                    }
                }
            }
        }
    }
});