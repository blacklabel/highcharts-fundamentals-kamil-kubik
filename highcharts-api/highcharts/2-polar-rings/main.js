const generateRandomSeriesData = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart("container", {
  chart: {
    type: "column",
    polar: true,
    events: {
      load() {
        const yAxis = this.yAxis[0],
          dataMax = yAxis.dataMax;

        yAxis.update({
          max: dataMax * 2
        });

        yAxis.addPlotLine({
          dashStyle: "Dash",
          value: dataMax * 1.5,
          width: 2
        });

        const redCircle = this.renderer
          .circle(
            this.plotWidth / 2 + this.plotLeft,
            this.plotHeight / 2 + this.plotTop,
            100
          )
          .attr({
            fill: "white",
            stroke: "red",
            "stroke-width": 2
          })
          .add();

        this.redCircle = redCircle;
      },
      render() {
        const redCircle = this.redCircle;

        if (redCircle) {
          redCircle.attr({
            cx: this.plotWidth / 2 + this.plotLeft,
            cy: this.plotHeight / 2 + this.plotTop
          });
        }
      }
    }
  },
  title: {
    text: undefined
  },
  pane: {
    startAngle: 0,
    endAngle: 360
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"]
  },
  yAxis: {
    min: 0,
    endOnTick: false,
    title: {
      text: undefined
    },
    plotLines: [
      {
        width: 2,
        color: "green",
        value: 15,
        dashStyle: "solid"
      }
    ]
  },
  credits: {
    enabled: false
  },
  series: [
    {
      name: "Tokyo",
      data: generateRandomSeriesData()
    },
    {
      name: "New York",
      data: generateRandomSeriesData()
    },
    {
      name: "London",
      data: generateRandomSeriesData()
    }
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter() {
          return this.y === this.series.yAxis.dataMax ? "max" : "";
        }
      }
    },
    column: {
      pointPadding: 0,
      groupPadding: 0
    }
  }
});
