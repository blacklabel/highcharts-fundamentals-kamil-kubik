const generateRandomSeriesData = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart("container", {
  chart: {
    type: "column",
    events: {
      load() {
        const yAxis = this.yAxis[0],
          dataMax = yAxis.dataMax;

        yAxis.update({
          max: dataMax * 2,
          plotLines: [
            {
              dashStyle: "Dash",
              value: dataMax * 1.5,
              width: 2,
            },
          ],
        });
      },
    },
  },
  title: {
    text: undefined,
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
  yAxis: {
    tickPositioner() {
      return Array.from({ length: this.dataMax + 1 }, (_, index) => index * 2);
    },
    title: {
      text: undefined,
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: "Tokyo",
      data: generateRandomSeriesData(),
      index: 0,
    },
    {
      name: "New York",
      data: generateRandomSeriesData(),
      index: 1,
    },
    {
      name: "London",
      data: generateRandomSeriesData(),
      index: 2,
    },
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter() {
          return this.y === this.series.yAxis.dataMax ? "max" : "";
        },
      },
    },
  },
});
