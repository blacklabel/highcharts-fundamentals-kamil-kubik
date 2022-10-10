const generateSeries = () =>
     Array.from({ length: 100 }, () => Math.floor(Math.random() * 99) + 1);

Highcharts.chart('container', {
    chart: {
        zooming: {
            type: 'xy'
        },
        events: {
            load() {
                const chart = this,
                    countLabel = chart.renderer.text('Visible count: 100', chart.plotLeft, chart.plotHeight + chart.plotTop + 52).add();

                chart.countLabel = countLabel;
            },
            render() {
                const chart = this,
                    countLabel = chart.countLabel,
                    points = chart.series[0].points,
                    visiblePointsCount = points.filter((point) => point.isInside).length;

                if (countLabel) {
                    countLabel.attr({ text: `Visible count: ${visiblePointsCount}` })
                }

                console.info(countLabel);
            }
        }
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'Chart title'
    },
    yAxis: {
        title: {
            text: 'Values'
        }
    },
    xAxis: {},
    series: [{
        name: 'Lines',
        data: generateSeries()
    }],
});