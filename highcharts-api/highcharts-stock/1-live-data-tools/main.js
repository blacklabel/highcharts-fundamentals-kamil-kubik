const generateData = () =>
  Array.from({ length: 150 }, () => Math.floor(Math.random() * (100 + 1)) + 1);

console.info(generateData());

const defaultButtons = [
  "indicators",
  "separator",
  "simpleShapes",
  "lines",
  "crookedLines",
  "measure",
  "advanced",
  "toggleAnnotations",
  "separator",
  "verticalLabels",
  "flags",
  "separator",
  "zoomChange",
  "fullScreen",
  "typeChange",
  "separator",
  "currentPriceIndicator",
  "saveChart",
];

Highcharts.stockChart("container", {
  title: {
    text: "",
  },
  yAxis: [
    {
      height: "50%",
    },
    {
      top: "50%",
      height: "50%",
    },
  ],
  series: [
    {
      id: "series",
      name: "Demo series",
      data: generateData(),
    },
    {
      type: "bb",
      linkedTo: "series",
      dataGrouping: {
        anchor: "middle",
        forced: true,
      },
    },
    {
      yAxis: 1,
      type: "ema",
      linkedTo: "series",
      dataGrouping: {
        forced: true,
      },
    },
  ],
});

Highcharts.stockChart("container-2", {
  title: {
    text: "",
  },
  series: [
    {
      id: "series",
      name: "Demo series",
      data: generateData(),
    },
  ],
});
