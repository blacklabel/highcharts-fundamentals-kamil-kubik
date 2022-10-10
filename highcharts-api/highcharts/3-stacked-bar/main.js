Highcharts.chart("container", {
  chart: {
    type: "bar",
    marginTop: 50,
    events: {
      load() {
        const chart = this;

        chart.renderer.text("Issue", 0, 35).add();
        chart.renderer.text("Record Count", chart.plotLeft, 35).add();

        const actionLabel = chart.renderer
          .text("Action", chart.plotWidth, 35)
          .add();
        chart.actionLabel = actionLabel;

        const buttons = Array.from({ length: 4 }, (_, index) =>
          chart.renderer
            .button(
              "How to fix",
              chart.plotWidth,
              chart.axes[0].getThreshold(index) + chart.marginBottom,
              () => null,
              {
                fill: "#fff",
                stroke: "blue",
                "stroke-width": 2,
              }
            )
            .add()
        );

        chart.customButtons = buttons;
      },
      render() {
        const chart = this,
          customButtons = chart.customButtons,
          actionLabel = chart.actionLabel,
          buttonsPositions = [];

        Object.values(chart.xAxis[0].ticks).forEach((tick) => {
          if (tick.pos !== -1) {
            buttonsPositions.push(
              chart.xAxis[0].toPixels(tick.pos)
            );
          }
        });

        if (customButtons && buttonsPositions.length > 0) {
          customButtons.map((button, index) =>
            button
              .attr(0)
              .translate(
                chart.plotWidth,
                buttonsPositions[index] - button.height / 2
              )
          );
        }

        if (actionLabel) {
          actionLabel.attr({ x: chart.plotWidth });
        }
      },
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["Data", "Emails", "Duplicates", "Support"],
    gridLineWidth: 1,
    lineWidth: 0,
  },
  yAxis: {
    min: 0,
    max: 400,
    tickInterval: 50,
    gridLineWidth: 0,
    title: {
      text: "Amount",
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: "bold",
      },
      format: "${total} K",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: "normal",
    },
  },
  credits: {
    enabled: false,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 768,
        },
        chartOptions: {
          yAxis: {
            max: 550,
          },
        },
      },
    ],
  },
  series: [
    {
      name: "Element v1",
      data: [35, 0, 20, 10],
      index: 0,
    },
    {
      name: "Element v2",
      data: [95, 90, 40, 45],
      index: 1,
    },
    {
      name: "Element v3",
      data: [30, 0, 30, 20],
      index: 2,
    },
    {
      name: "Element v4",
      data: [90, 110, 60, 50],
      index: 3,
    },
  ],
});
