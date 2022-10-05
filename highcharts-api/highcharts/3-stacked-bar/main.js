Highcharts.chart("container", {
  chart: {
    type: "bar",
  },
  title: {
    text: undefined,
  },
  xAxis: {
    categories: ["Data", "Emails", "Duplicates", "Support"],
  },
  yAxis: {
    min: 0,
    tickInterval: 50,
    title: {
      text: "Amount",
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: "bold",
      },
    },
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
    },
    {
      name: "Element v2",
      data: [95, 90, 40, 45],
    },
    {
      name: "Element v3",
      data: [30, 0, 30, 20],
    },
    {
      name: "Element v4",
      data: [90, 110, 60, 50],
    },
  ],
});
