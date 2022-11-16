const generateData = () => {
  const min = 1500,
    max = 2000;

  return Array.from({ length: 100 }, (_, index) => [
    new Date().getTime() + (index / 2) * 1000000000,
    Math.floor(Math.random() * (max + min)) + min,
  ]);
};

const onMouseWheel = (event, axis) => {
  const interval = 60 * 60 * 24 * 1000 * 6,
    isScrollUp = event.deltaY <= 0;

  if (event.target.parentNode.id === "y-axis-label") {
    if (isScrollUp) {
      axis.setExtremes(axis.min + interval, axis.max - interval, false);
    } else {
      axis.setExtremes(axis.min - interval, axis.max + interval, false);
    }
  } else if (
    event.target.id === "x-helper-rect" ||
    event.target.id === "y-helper-rect"
  ) {
    const firstXPoint = Math.min(
      ...axis.series.map((series) => series.points[0].x)
    );

    if (isScrollUp) {
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

        yAxis.labelGroup.attr("id", "y-axis-label");

        document.addEventListener("mousewheel", (event) => {
          onMouseWheel(event, xAxis);
          chart.redraw(false);
        });

        document.addEventListener("mouseup", () => {
          yAxis.active = false;
        });
      },
      render() {
        const chart = this,
          xAxis = chart.xAxis[0],
          yAxis = chart.yAxis[0],
          xAxisHelper = xAxis.xAxisHelper,
          yAxisExtremes = yAxis.getExtremes();

        if (!xAxisHelper) {
          xAxis.xAxisHelper = chart.renderer
            .rect(xAxis.labelGroup.getBBox())
            .attr("id", "x-helper-rect")
            .css({ cursor: "w-resize", fill: "transparent" })
            .add(xAxis.labelGroup);
        } else {
          xAxisHelper.toFront();
        }

        const yAxisHelper = chart.renderer
          .rect(chart.plotWidth + 10, chart.plotTop, 40, chart.plotHeight)
          .attr("id", "y-helper-rect")
          .css({ cursor: "ns-resize", fill: "transparent" })
          .add();

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
    tickInterval: 300,
    offset: 30,
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
