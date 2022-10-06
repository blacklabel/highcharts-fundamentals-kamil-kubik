const generateRandomSeriesData = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart("container", {
  chart: {
    type: "column",
    events: {
      load() {
        const largestSeriesYAxisValue = this.yAxis[0].dataMax;

        this.yAxis[0].update({
          max: largestSeriesYAxisValue * 2,
          plotLines: [
            {
              dashStyle: "Dash",
              value: largestSeriesYAxisValue * 1.5,
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
      const incrementedDataMax = this.dataMax * 2,
        positions = [],
        increment = 2;

      if (incrementedDataMax !== null && this.dataMin !== null) {
        for (
          let tick = 0;
          tick - increment <= incrementedDataMax;
          tick += increment
        ) {
          if (tick <= incrementedDataMax) {
            positions.push(tick);
          }
        }
      }

      return positions;
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
          const largestSeriesYAxisValue = Math.max(this.series.yAxis.dataMax);
          return this.y === largestSeriesYAxisValue ? "max" : "";
        },
      },
    },
  },
});
