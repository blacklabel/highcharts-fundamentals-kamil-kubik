Highcharts.chart("container", {
  chart: {
    type: "bar",
    marginTop: 50,
    events: {
      render() {
        console.info(this);

        this.renderer.text('Issue', 0, 35).add();
        this.renderer.text('Record Count', this.plotLeft, 35).add();
        this.renderer.text('Action', this.plotWidth, 35).add();

        console.info(this.axes[0].getThreshold(0));

        this.renderer.button('How to fix 1', this.plotWidth, this.axes[0].getThreshold(0) + this.marginBottom).add();
        this.renderer.text('How to fix 2', this.plotWidth, this.axes[0].getThreshold(1) + this.marginBottom).add();
        this.renderer.text('How to fix 3', this.plotWidth, this.axes[0].getThreshold(2) + this.marginBottom).add();
        this.renderer.text('How to fix 4', this.plotWidth, this.axes[0].getThreshold(3) + this.marginBottom).add();
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
