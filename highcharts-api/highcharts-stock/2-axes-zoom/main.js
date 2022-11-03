const generateData = () => {
  const min = 2000,
    max = 5000;

  return Array.from({ length: 75 }, (_, index) => [
    new Date().getTime() + index * 1000000000,
    Math.floor(Math.random() * (max + min)) + min,
  ]);
};

Highcharts.stockChart("container", {
  chart: {
    events: {
      render() {
        const chart = this,
          yAxis = chart.yAxis[0];

        // (yAxes = chart.yAxis.filter(
        //   (p) => p.userOptions.id !== "navigator-y-axis"
        // )),
        //   (xAxis = chart.xAxis[0]);

        console.info(chart);

        // chart.yAxis.forEach((yAxis) => {
        //   yAxis.axisRect = chart.renderer
        //     .rect()
        //     .attr({ width: 30, height: yAxis.height, fill: "transparent" })
        //     .css({ cursor: "n-resize" })
        //     .add(yAxis.labelGroup);

        //   yAxis.axisRect.on("mousedown", () => {
        //     console.info("event");
        //     yAxis.drag = true;
        //   });
        //   yAxis.axisRect.on("mouseover", () => {
        //     console.info("event");
        //     xAxis.scaleMode = "max";
        //   });
        //   yAxis.axisRect.on("mouseout", () => {
        //     console.info("event");
        //     xAxis.scaleMode = null;
        //   });
        // });

        yAxis.axisRect = chart.renderer
          .rect()
          .attr({ width: 30, height: yAxis.height, fill: "black" })
          .css({ cursor: "ns-resize" })
          .add(yAxis.labelGroup);

        // document.addEventListener("mousemove", (event) =>
        //   onMouseMove(yAxes, event)
        // );
        // document.addEventListener("mouseup", () => onMouseUp(yAxes));
        // document.addEventListener("wheel", (event) => onWheel(xAxis, event));

        // xAxis.axisRect = chart.renderer
        //   .rect()
        //   .attr({ fill: "transparent" })
        //   .css({ cursor: "w-resize" })
        //   .add();
      },
    },
  },
  title: {
    text: "",
  },
  // yAxis: {
  //   //minRange: 5,
  //   labels: {
  //     style: {
  //       cursor: "ns-resize",
  //     },
  //     events: {
  //       mousedown() {
  //         console.info("drag");
  //       },
  //     },
  //   },
  // },
  series: [
    {
      id: "series",
      name: "Demo series",
      data: generateData(),
    },
  ],
});
