const generateData = () => {
  const min = 1500,
    max = 2000;

  return Array.from({ length: 100 }, (_, index) => [
    new Date().getTime() + (index / 2) * 1000000000,
    Math.floor(Math.random() * (max + min)) + min,
  ]);
};

console.info(generateData());

Highcharts.stockChart("container", {
  chart: {
    height: 800,
    events: {
      load() {
        const chart = this,
          xAxis = chart.xAxis[0];

        xAxis.setExtremes(
          xAxis.min + 60 * 60 * 24 * 1000 * 120,
          xAxis.max,
          false
        );

        document.addEventListener("mousewheel", (event) => {
          const firstXPoint = Math.min(
              ...xAxis.series.map((series) => series.points[0].x)
            ),
            interval = 60 * 60 * 24 * 1000;

          if (event.deltaY <= 0) {
            xAxis.setExtremes(xAxis.min + interval, xAxis.max, false);
          } else {
            if (xAxis.min >= firstXPoint) {
              xAxis.setExtremes(xAxis.min - interval, xAxis.max, false);
            }
          }

          chart.redraw(false);
        });

        chart.redraw(false);
      },
      render() {
        const chart = this,
          yAxis = chart.yAxis[0],
          xAxis = chart.xAxis[0],
          yAxisExtremes = yAxis.getExtremes();

        // console.info(yAxis);
        // console.info(yAxisExtremes);

        yAxisHelper = chart.renderer
          .rect(chart.plotWidth - 20, chart.plotTop, 40, chart.plotHeight)
          .attr("id", "helper-rect")
          .css({ cursor: "ns-resize", fill: "transparent", zIndex: 50 })
          .add(yAxis.labelGroup);

        yAxisHelper.on("mouseup", () => {
          console.info('mouseup');
          yAxis.active = false;
        });

        yAxisHelper.on("mousedown", () => {
          console.info('mousedown');
          yAxis.active = true;
        });

        yAxisHelper.on("mouseout", (event) => {
          console.info('mouseout', event.target.id);

          // if (event.target.id !== 'helper-rect') {
          //   yAxis.active = false;
          // }
        });

        yAxisHelper.on("mousemove", (event) => {
          if (event.target.id === "helper-rect" && yAxis.active) {
            console.info(event.target.id);

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
  // xAxis: {
  //   overscroll: 2000000000,
  // },
  yAxis: {
    // min: 0,
    // max: 10000,
    tickInterval: 100,
    labels: {
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
