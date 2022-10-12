const generateSeries = () =>
  Array.from({ length: 5 }, () => Math.floor(Math.random() * (15 - 1)) + 1);

Highcharts.chart("container", {
  chart: {
    type: "column",
    events: {
      load() {
        const chart = this,
          series = chart.series;

        series.forEach((serie) =>
          serie.points.slice(0, -1).map((point) => {
            point.path = chart.renderer
              .path({ zIndex: 1, stroke: serie.color, "stroke-width": 3 })
              .add();
          })
        );
      },
      render() {
        const chart = this;

        chart.series.forEach((serie) =>
          serie.points.slice(0, -1).map((point, index) => {
            const nextPoint = serie.points[index + 1],
              pointPath = point.path;

            if (pointPath) {
              pointPath.attr({
                d: [
                  "M",
                  chart.plotLeft + point.shapeArgs.x + point.shapeArgs.width,
                  chart.plotTop + point.plotY + 2,
                  "L",
                  chart.plotLeft + nextPoint.shapeArgs.x,
                  chart.plotTop + nextPoint.plotY + 2,
                ],
              });

              !serie.visible ? pointPath.hide() : pointPath.show();
            }
          })
        );
      },
    },
  },
  title: {
    text: "Chart title",
  },
  yAxis: {
    title: {
      text: "Values",
    },
  },
  plotOptions: {
    column: {
      borderWidth: 0,
    },
  },
  series: [
    {
      name: "Series 1",
      data: generateSeries(),
    },
    {
      name: "Series 2",
      data: generateSeries(),
    },
    {
      name: "Series 3",
      data: generateSeries(),
    },
  ],
});
