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
  "saveChart"
];

const liveDataDefiniton = {
  liveData: {
    className: "live-data-btn"
  }
};

const generateData = () => {
  const min = 1,
    max = 100;

  return Array.from({ length: 150 }, (_, index) => [
    new Date().getTime() + index * 1000000,
    Math.floor(Math.random() * (max + min)) + min
  ]);
};

const updateChartOptions = (chart, options) => {
  chart.series[0].update(options);
};

function handleLiveData(button) {
  const chart = this.chart,
    liveDataInterval = chart.liveDataInterval;

  if (!liveDataInterval) {
    chart.liveDataInterval = setInterval(() => {
      const series = chart.series[0],
        min = 1,
        max = 100,
        x = new Date().getTime() + series.points.length * 1000000,
        y = Math.floor(Math.random() * (max + min)) + min;

      series.addPoint([x, y]);
    }, 1000);
  } else {
    chart.liveDataInterval = clearInterval(liveDataInterval);
  }

  if (button) {
    Highcharts.fireEvent(this, "deselectButton", {
      button
    });
  }
};

Highcharts.stockChart("container", {
  chart: {
    events: {
      load() {
        this.liveDataInterval = null
      }
    }
  },
  title: {
    text: ""
  },
  yAxis: [
    {
      height: "50%"
    },
    {
      top: "50%",
      height: "50%"
    }
  ],
  series: [
    {
      id: "series",
      name: "Demo series",
      data: generateData()
    },
    {
      type: "bb",
      linkedTo: "series",
      dataGrouping: {
        anchor: "middle",
        forced: true
      }
    },
    {
      yAxis: 1,
      type: "ema",
      linkedTo: "series",
      dataGrouping: {
        forced: true
      }
    }
  ],
  stockTools: {
    gui: {
      buttons: ["liveData", ...defaultButtons],
      definitions: liveDataDefiniton,
    }
  },
  navigation: {
    bindings: {
      liveData: {
        className: "live-data-btn",
        init: handleLiveData
      }
    }
  }
});

Highcharts.stockChart("container-2", {
  chart: {
    events: {
      load() {
        this.liveDataInterval = null
      }
    }
  },
  title: {
    text: ""
  },
  series: [
    {
      id: "series",
      name: "Demo series",
      data: generateData()
    }
  ],
  stockTools: {
    gui: {
      buttons: ["liveData", "openingList", ...defaultButtons],
      definitions: {
        openingList: {
          items: ["dataGrouping", "dataGrouping2"],
          dataGrouping: {
            className: "data-grouping-btn"
          },
          dataGrouping2: {
            className: "data-grouping-btn-2"
          }
        },
        ...liveDataDefiniton
      }
    }
  },
  navigation: {
    bindings: {
      dataGrouping: {
        className: "data-grouping-btn",
        init() {
          updateChartOptions(this.chart, {
            dataGrouping: {
              groupPixelWidth: 10
            }
          });
        }
      },
      dataGrouping2: {
        className: "data-grouping-btn-2",
        init() {
          updateChartOptions(this.chart, {
            dataGrouping: {
              groupPixelWidth: 80
            }
          });
        }
      },
      liveData: {
        className: "live-data-btn",
        init: handleLiveData
      }
    }
  }
});
