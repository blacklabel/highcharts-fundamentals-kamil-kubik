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
                const chart = this,
                    value = chart.value;

                return chart.axis.options?.activeLabel === value ? 
                    `<span style="fill: red; font-weight: bold">${value}<span/>` 
                    : value;
            }
        }
    },
    series: [{
        name: 'Tokyo',
        data: generatedData()
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
                        const series = this.series;
    
                        series.xAxis.options.activeLabel = target.category;
                        series.chart.redraw(false);
                    },
                    mouseOut() {
                        const series = this.series;

                        series.xAxis.options.activeLabel = null;
                        series.chart.redraw(false);
                    }
                }
            }
        }
    }
});