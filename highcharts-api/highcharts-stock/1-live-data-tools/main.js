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

const generateData = () => {
  const min = 1,
    max = 100;

  return Array.from(
    { length: 150 },
    () => Math.floor(Math.random() * (max + min)) + min
  );
};

const updateChartOptions = (chart, options) => {
  chart.series[0].update(options);
};

function startLiveData(chart) {
  const series = chart.series[0],
    x = new Date().getTime(),
    y = Math.round(Math.random() * 100);

  series.addPoint([x, y]);
}

const handleLiveData = (chart, index) => {
  let liveData = [];

  if (!liveData[index]) {
    liveData[index] = setInterval(() => {
      startLiveData(chart);
    }, 1);
  } else {
    clearInterval(liveData[index]);
    liveData[index] = null;
  }
}

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
  stockTools: {
    gui: {
      buttons: ["liveData", "openingList", ...defaultButtons],
      definitions: {
        openingList: {
          items: ["dataGrouping", "dataGrouping2"],
          dataGrouping: {
            className: "data-grouping-btn",
          },
          dataGrouping2: {
            className: "data-grouping-btn-2",
          },
        },
        liveData: {
          className: "live-data-btn",
        },
      },
    },
  },
  navigation: {
    bindings: {
      dataGrouping: {
        className: "data-grouping-btn",
        init() {
          updateChartOptions(this.chart, {
            dataGrouping: {
              groupPixelWidth: 10,
            },
          });
        },
      },
      dataGrouping2: {
        className: "data-grouping-btn-2",
        init() {
          updateChartOptions(this.chart, {
            dataGrouping: {
              groupPixelWidth: 80,
            },
          });
        },
      },
      liveData: {
        className: "live-data-btn",
        init() {
          const { chart, index } = this;
          handleLiveData(chart, index);
        },
      },
    },
  },
});
