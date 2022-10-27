const generateData = () => {
  const min = 2000,
    max = 5000;

  return Array.from({ length: 50 }, (_, index) => [
    new Date().getTime() + index * 1000000000,
    Math.floor(Math.random() * (max + min)) + min,
  ]);
};

Highcharts.stockChart("container", {
  title: {
    text: "",
  },
  yAxis: {
    //minRange: 5,
    labels: {
      style: {
        cursor: 'ns-resize',
      },
      events: {
        mousedown() {
            console.info('drag');
        }
      }
    }
  },
  series: [
    {
      id: "series",
      name: "Demo series",
      data: generateData(),
    },
  ],
});
