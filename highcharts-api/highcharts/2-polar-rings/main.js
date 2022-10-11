const generateRandomSeriesData = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart('container', {
  chart: {
    type: 'column',
    polar: true,
    events: {
      load() {
        const yAxis = this.yAxis[0],
          dataMax = yAxis.dataMax;

        yAxis.update({
          max: dataMax * 2,
        });

        yAxis.addPlotLine({
          dashStyle: 'Dash',
          value: dataMax * 1.5,
          width: 2
        });
      },
      render() {
        const chart = this,
          yAxis = chart.yAxis[0],
          redCircle = chart.redCircle;

        if (redCircle) {
          redCircle.attr({
            cx: chart.plotWidth / 2 + chart.plotLeft,
            cy: chart.plotHeight / 2 + chart.plotTop,
            r: yAxis.toPixels(
              Math.random() * yAxis.dataMax * 2,
              true
            )
          });
        } else {
          const renderedRedCircle = chart.renderer
            .circle(
              chart.plotWidth / 2 + chart.plotLeft,
              chart.plotHeight / 2 + chart.plotTop,
              100
            )
            .attr({
              fill: 'white',
              stroke: 'red',
              'stroke-width': 2
            })
            .add();

          chart.redCircle = renderedRedCircle;
        }
      },
    },
  },
  title: {
    text: undefined,
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar']
  },
  yAxis: {
    plotLines: [
      {
        width: 2,
        color: 'green',
        value: 15
      }
    ]
  },
  series: [
    {
      name: 'Tokyo',
      data: generateRandomSeriesData()
    },
    {
      name: 'New York',
      data: generateRandomSeriesData()
    },
    {
      name: 'London',
      data: generateRandomSeriesData()
    },
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter() {
          return this.y === this.series.yAxis.dataMax ? 'max' : '';
        }
      }
    },
    column: {
      pointPadding: 0,
      groupPadding: 0,
    }
  }
});
