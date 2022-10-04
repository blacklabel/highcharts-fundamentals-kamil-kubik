const generateRandomSeriesData = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart("container", {
  chart: {
    type: "column",
  },
  title: {
    text: undefined,
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
  yAxis: {
    tickPixelInterval: 50,
    title: {
      text: undefined,
    },
  },
  series: [
    {
      name: "Tokyo",
      data: generateRandomSeriesData(),
    },
    {
      name: "New York",
      data: generateRandomSeriesData(),
    },
    {
      name: "London",
      data: generateRandomSeriesData(),
    },
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter() {
          const largestSeriesYAxisValue = Math.max(this.series.yAxis.dataMax);
          return this.y === largestSeriesYAxisValue ? "max" : "";
        },
      },
    },
  },
});

const largestSeriesYAxisValue = Math.max(chart.series[0].yAxis.dataMax);

chart.update({
  yAxis: {
    max: largestSeriesYAxisValue * 2,
    plotLines: [
      {
        dashStyle: "Dash",
        value: largestSeriesYAxisValue * 1.5,
        width: 2,
      },
    ],
  },
});
