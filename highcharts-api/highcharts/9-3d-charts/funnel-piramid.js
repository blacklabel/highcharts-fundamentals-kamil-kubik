Highcharts.chart("container", {
  chart: {
    width: 400,
    options3d: {
      enabled: true,
      alpha: 10,
      depth: 50,
      viewDistance: 50,
    },
  },
  title: {
    text: "Highcharts Funnel/pyramid3D Chart",
  },
  series: [
    {
      name: "Pyramid series",
      type: "pyramid3d",
      data: [15, 4, 3, 2, 1],
      height: "25%",
      center: ["50%", "42.5%"],
    },
    {
      name: "Funnel series",
      type: "funnel3d",
      data: [15, 4, 3, 2, 1],
      height: "40%",
      center: ["50%", "75%"],
      zIndex: 1,
    },
  ],
});
