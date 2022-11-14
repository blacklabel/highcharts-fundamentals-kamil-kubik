const generateData = () => {
  const min = 1500,
    max = 2000;

  return Array.from({ length: 100 }, (_, index) => [
    new Date().getTime() + (index / 2) * 1000000000,
    Math.floor(Math.random() * (max + min)) + min,
  ]);
};

console.info(generateData());

const onMouseWheel = (event, axis) => {
  console.info(event, axis);

  if (
    event.target.id === "x-helper-rect" ||
    event.target.id === "y-helper-rect"
  ) {
    const firstXPoint = Math.min(
        ...axis.series.map((series) => series.points[0].x)
      ),
      interval = 60 * 60 * 24 * 1000 * 6;

    if (event.deltaY <= 0) {
      axis.setExtremes(axis.min + interval, axis.max, false);
    } else {
      if (axis.min >= firstXPoint) {
        axis.setExtremes(axis.min - interval, axis.max, false);
      }
    }
  }
};

Highcharts.stockChart("container", {
  chart: {
    height: 800,
    events: {
      load() {
        const chart = this,
          xAxis = chart.xAxis[0],
          yAxis = chart.yAxis[0];

        xAxis.setExtremes(
          xAxis.min + 60 * 60 * 24 * 1000 * 120,
          xAxis.max,
          false
        );

        const xAxisHelper = chart.renderer
          .rect(xAxis.labelGroup.getBBox())
          .attr("id", "x-helper-rect")
          .css({ cursor: "w-resize", fill: "black" })
          .add(xAxis.labelGroup)
          .toFront();

        // xAxisHelper.attr(xAxis.labelGroup.getBBox()).toFront();

        document.addEventListener("mousewheel", (event) => {
          onMouseWheel(event, xAxis);
          chart.redraw(false);
        });

        chart.redraw(false);

        document.addEventListener("mouseup", () => {
          yAxis.active = false;
        });
      },
      render() {
        const chart = this,
          yAxis = chart.yAxis[0],
          yAxisExtremes = yAxis.getExtremes();

        const yAxisHelper = chart.renderer
          .rect(chart.plotWidth - 20, chart.plotTop, 40, chart.plotHeight)
          .attr("id", "y-helper-rect")
          .css({ cursor: "ns-resize", fill: "transparent" })
          .add();

        // yAxisHelper.attr(yAxis.labelGroup.getBBox()).toFront();

        yAxisHelper.on("mousedown", () => {
          yAxis.active = true;
        });

        yAxisHelper.on("mousemove", (event) => {
          if (event.target.id === "y-helper-rect" && yAxis.active) {
            if (event.y < yAxis.prevCursorPosition) {
              yAxis.setExtremes(
                yAxisExtremes.userMin
                  ? yAxisExtremes.userMin + 25
                  : yAxis.min + 25,
                yAxisExtremes.userMax
                  ? yAxisExtremes.userMax - 25
                  : yAxis.max - 25,
                false
              );
            } else {
              yAxis.setExtremes(
                yAxisExtremes.userMin
                  ? yAxisExtremes.userMin - 25
                  : yAxis.min - 25,
                yAxisExtremes.userMax
                  ? yAxisExtremes.userMax + 25
                  : yAxis.max + 25,
                false
              );
            }

            chart.redraw(false);
          } else {
            yAxis.active = false;
          }

          yAxis.prevCursorPosition = event.y;
        });
      },
    },
  },
  title: {
    text: "",
  },
  yAxis: {
    // tickInterval: 100,
    labels: {
      id: "labels",
      style: {
        cursor: "ns-resize",
      },
    },
  },
  series: [
    {
      id: "series",
      name: "Demo series",
      data: generateData(),
    },
  ],
});
