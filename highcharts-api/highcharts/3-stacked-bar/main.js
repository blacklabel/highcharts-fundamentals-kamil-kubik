Highcharts.chart("container", {
  chart: {
    type: "bar",
    marginTop: 50,
    events: {
      load() {
        this.renderer.text("Issue", 0, 35).add();
        this.renderer.text("Record Count", this.plotLeft, 35).add();
        this.renderer.text("Action", this.plotWidth, 35).add();

        const buttonStyles = {
          fill: "#fff",
          stroke: "blue",
          "stroke-width": 2,
        };

        const buttons = Array.from({ length: 4 }, (_, index) =>
          this.renderer
            .button(
              "How to fix",
              this.plotWidth,
              this.axes[0].getThreshold(index) + this.marginBottom,
              () => null,
              buttonStyles,
              buttonStyles
            )
            .attr(buttonStyles)
            .add()
        );

        this.customButtons = buttons;
      },
      render() {
        const customButtons = this.customButtons;

        if (Array.isArray(customButtons) && customButtons.length > 0) {
          customButtons.map((button, index) =>
            button
              .attr(0)
              .translate(
                this.plotWidth,
                this.axes[0].getThreshold(index) +
                  this.marginBottom -
                  button.height / 2
              )
          );
        }
      },
    },
  },
  title: {
    text: undefined,
  },
  xAxis: {
    categories: ["Data", "Emails", "Duplicates", "Support"],
    gridLineWidth: 1,
    lineWidth: 0,
  },
  yAxis: {
    min: 0,
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
      formatter() {
        return `${this.total} K`;
      },
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
