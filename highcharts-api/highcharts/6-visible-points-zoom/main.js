const generateSeries = () =>
     Array.from({ length: 100 }, () => Math.floor(Math.random() * 99) + 1);

Highcharts.chart('container', {
    chart: {
        zooming: {
            type: 'xy'
        },
        animation: true,
        events: {
            render() {
                const chart = this,
                    countLabel = chart.countLabel,
                    points = chart.series[0].points,
                    visiblePoints = points.filter((point) => point.isInside),
                    visiblePointsTexts = chart.visiblePointsTexts,
                    visibleCircles = chart.visibleCircles;

                if (countLabel) {
                    countLabel.attr({ text: `Visible count: ${visiblePoints.length}` })
                } else {
                    const renderedCountLabel = chart.renderer
                        .text(
                          'Visible count: 100',
                          chart.plotLeft,
                          chart.plotHeight + chart.plotTop + 52
                        )
                        .add();

                    chart.countLabel = renderedCountLabel;
                };

                if (visiblePointsTexts?.length > 0) {
                    visiblePointsTexts.forEach((visiblePointText) => visiblePointText.destroy());
                };

                if (visibleCircles?.length > 0) {
                    visibleCircles.forEach((visibleCircle) => visibleCircle.destroy());
                };

                console.info(visiblePoints);

                const highestVisiblePoint = Math.max(...visiblePoints.map((visiblePoint) => visiblePoint.options.y));
                const renderedVisiblePoints = visiblePoints.filter((visiblePoint) => visiblePoint.options.y === highestVisiblePoint);
                const renderedVisibleTextes = renderedVisiblePoints.map((visiblePoint) => 
                    chart.renderer
                        .text(
                          visiblePoint.options.y.toString(),
                          chart.plotLeft + visiblePoint.plotX, 
                          visiblePoint.plotY + chart.plotTop - 10
                        )
                        .attr({ fill: 'red', 'text-anchor': 'middle' })
                        .add()
                );
                const renderedVisibleCircles = renderedVisiblePoints.map((visiblePoint) =>
                    chart.renderer
                        .circle(
                          visiblePoint.plotX + chart.plotLeft, 
                          chart.plotHeight + chart.plotTop, 3
                        )
                        .attr({ fill: 'red' })
                        .add()
                        .toFront()   
                );     
                
                chart.visiblePointsTexts = renderedVisibleTextes;
                chart.visibleCircles = renderedVisibleCircles;
            }
        }
    },
    title: {
        text: 'Chart title'
    },
    yAxis: {
        title: {
            text: 'Values'
        }
    },
    series: [{
        name: 'Series 1',
        data: generateSeries()
    }],
});