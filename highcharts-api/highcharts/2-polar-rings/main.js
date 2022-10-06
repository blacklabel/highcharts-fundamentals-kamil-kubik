const generateRandomSeriesData = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart("container", {
  chart: {
    polar: true,
    events: {
      load() {
        const yAxis = this.yAxis[0];
        const largestSeriesYAxisValue = yAxis.dataMax;

        yAxis.update({
          max: largestSeriesYAxisValue * 2,
          plotLines: [
            {
              dashStyle: "Dash",
              value: largestSeriesYAxisValue * 1.5,
              width: 2,
            },
          ],
        });

        yAxis.addPlotLine({
          width: 2,
          color: "green",
          value: 14,
        });

        console.info(this);

        const redCircle = this.renderer
          .circle(
            this.plotWidth / 2 + this.plotLeft,
            this.plotHeight / 2 + this.plotTop,
            100
          )
          .attr({
            fill: "white",
            stroke: "red",
            "stroke-width": 2,
          })
          .add();

        this.redCircle = redCircle;
      },
      redraw() {
        const redCircle = this.redCircle;

        if (redCircle) {
          redCircle.attr({
            cx: this.plotWidth / 2 + this.plotLeft,
            cy: this.plotHeight / 2 + this.plotTop,
          });
        }
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
