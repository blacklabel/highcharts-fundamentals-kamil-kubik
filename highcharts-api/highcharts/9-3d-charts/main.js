// Give the points a 3D feel by adding a radial gradient
Highcharts.setOptions({
  colors: Highcharts.getOptions().colors.map(() => {
    return {
      radialGradient: {
        cx: 0.4,
        cy: 0.3,
        r: 0.5,
      },
      stops: [
        [0, 'white'],
        [1, Highcharts.color('yellow').brighten(-0.2).get("rgb")]
      ]
    };
  }),
});

const chart = new Highcharts.Chart({
  chart: {
    renderTo: "container",
    height: 400,
    width: 800,
    type: "scatter3d",
    animation: false,
    backgroundColor: "black",
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 40,
      depth: 400,
      viewDistance: 4,
      fitToPlot: false,
      frame: {
        bottom: { size: 1, color: "rgba(0,0,0,0.02)" },
        back: { size: 1, color: "rgba(0,0,0,0.04)" },
        side: { size: 1, color: "rgba(0,0,0,0.06)" },
      },
    },
    events: {
      render() {
        renderer
          .path(["M", 50, 50, "L", 50, 50, "z", 50, 50])
          .attr({ 'stroke-width': 5, stroke: "#ffffff" })
          .add();
      },
    },
  },
  title: {
    text: "",
  },
  plotOptions: {
    scatter: {
      width: 10,
      height: 10,
      depth: 10,
    },
  },
  yAxis: {
    min: 0,
    max: 10,
    title: null,
    tickInterval: 2,
  },
  xAxis: {
    min: 0,
    max: 10,
    gridLineWidth: 1,
    tickInterval: 1,
  },
  zAxis: {
    min: 0,
    max: 10,
    showFirstLabel: false,
    tickInterval: 2,
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Data",
      data: [
        [5, 5, 5]
      ],
      marker: {
        radius: 20
      },
    },
  ],
});
