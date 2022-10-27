const generateData = () => {
  const min = 1,
    max = 100;

  return Array.from({ length: 150 }, (_, index) => [
    new Date().getTime() + index * 1000000,
    Math.floor(Math.random() * (max + min)) + min,
  ]);
};

Highcharts.stockChart("container", {
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
