const generateRandomSeriesData = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart("container", {
  chart: {
    polar: true,
    events: {
      load() {
        const yAxis = this.yAxis[0];
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

        this.renderer
          .circle(200, 150, 100)
          .attr({
            fill: "white",
            stroke: "red",
            "stroke-width": 1,
          })
          .add();

        yAxis.addPlotLine({
          width: 3,
          color: "green",
          value: yAxis.dataMax * Math.random() * 2,
        });
      },
    },
  },
  title: {
    text: undefined,
  },
  pane: {
    startAngle: 0,
    endAngle: 360,
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
  yAxis: {
    min: 0,
    endOnTick: false,
    // tickPositioner() {
    //   const incrementedDataMax = this.dataMax * 2;
    //   const positions = [];
    //   const increment = 2;

    //   if (incrementedDataMax !== null && this.dataMin !== null) {
    //     for (
    //       let tick = 0;
    //       tick - increment <= incrementedDataMax;
    //       tick += increment
    //     ) {
    //       if (tick <= incrementedDataMax) {
    //         positions.push(tick);
    //       }
    //     }
    //   }

    //   return positions;
    // },
    title: {
      text: undefined,
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      type: "column",
      name: "Tokyo",
      data: generateRandomSeriesData(),
    },
    {
      type: "column",
      name: "New York",
      data: generateRandomSeriesData(),
    },
    {
      type: "column",
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
    column: {
      pointPadding: 0,
      groupPadding: 0,
    },
  },
});
