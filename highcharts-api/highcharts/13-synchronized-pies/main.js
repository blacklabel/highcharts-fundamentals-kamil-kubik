const data = [{
    name: 'Chrome',
    y: 60,
},  {
    name: 'Edge',
    y: 15
},  {
    name: 'Firefox',
    y: 10
}, {
    name: 'Safari',
    y: 5
}, {
    name: 'Internet Explorer',
    y: 2.5
}, {
    name: 'Other',
    y: 1
}];

Highcharts.chart('container', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Chart title'
    },
    tooltip: {
        hideDelay: 0,
        followPointer: false
    },
    plotOptions: {
        pie: {
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            point: {
                events: {
                  legendItemClick() {
                    const point = this,
                      series = point.series;

                    series.chart.series.map((seriesElement, index) => {
                        if (series.index !== index) {
                            seriesElement.points[point.index].setVisible(!point.visible);
                        }
                    });
                  },
                  mouseOver() {
                    const point = this,
                      series = point.series,
                      chart = point.series.chart,
                      secondTooltip = chart.secondTooltip || new Highcharts.Tooltip(chart, chart.tooltip.options);
                    
                    series.chart.series.forEach((seriesElement, index) => {
                        if (series.index !== index) {
                            const seriesElementPoint = seriesElement.points[point.index];
                            seriesElementPoint.setState('hover');

                            if (!chart.secondTooltip) {
                                chart.secondTooltip = secondTooltip;
                            }

                            if (secondTooltip) {
                                secondTooltip.refresh(seriesElementPoint);
                            }
                        }
                    });
                  },
                  mouseOut() {
                    const secondTooltip = this.series.chart.secondTooltip;

                    if (secondTooltip) {
                        secondTooltip.hide();
                    }
                  }
                }
            }
        },
        series: {
            states: {
                inactive: {
                    opacity: 1
                }
            }
        }
    },
    series: [{
        name: 'Chart 1',
        showInLegend: true,
        data,
        center: [120, 80],
        size: 200
    }, {
        name: 'Chart 2',
        data,
        center: [420, 80],
        size: 200
    }]
});
