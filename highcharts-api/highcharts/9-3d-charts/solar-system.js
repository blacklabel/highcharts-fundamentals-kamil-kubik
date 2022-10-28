const radialGradient = (color) => ({
  radialGradient: {
    cx: 0.4,
    cy: 0.3,
    r: 0.5,
  },
  stops: [
    [0, "white"],
    [1, Highcharts.color(color).brighten(-0.2).get("rgb")],
  ],
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
      load() {
        const chart = this,
          cos = Math.cos,
          sin = Math.sin,
          PI = Math.PI;
        let interval = 1;

        setInterval(() => {
          x = 5;
          y = 5;
          z = 4.3;
          x += 1 * cos((interval * 2 * PI) / 60);
          z += 2 * sin((interval * 2 * PI) / 60);
          chart.series[0].points[1].update([x, y, z], false);

          x += 0.5 * cos((interval * 2 * PI) / 30);
          z += 0.5 * sin((interval * 2 * PI) / 30);
          chart.series[0].points[2].update([x, y, z], false);

          chart.redraw(false);

          interval++;
        }, 40);
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
    series: {
      planeProjection: {
        enabled: true,
        byPoint: true,
      },
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
      name: "Demo series",
      data: [
        {
          x: 5,
          y: 5,
          z: 5,
          marker: {
            radius: 16,
            fillColor: radialGradient("yellow"),
          },
          color: "yellow",
        },
        {
          x: 5,
          y: 5,
          z: 2,
          marker: {
            radius: 12,
            symbol: "circle",
            fillColor: radialGradient("blue"),
          },
          color: "blue",
        },
        {
          x: 5,
          y: 5,
          z: 0,
          marker: {
            radius: 6,
            symbol: "circle",
            fillColor: radialGradient("gray"),
          },
          color: "brown",
        },
      ],
    },
  ],
});
