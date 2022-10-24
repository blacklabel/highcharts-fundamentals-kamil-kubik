const changeVisibility = (link, isHidden) => {
  link.toNode.graphic.css({
    opacity: Number(!isHidden),
  });
  link.toNode.dataLabel.css({
    opacity: Number(!isHidden),
  });
  link.toNode.isHidden = isHidden;

  if (isHidden) {
    link.graphic.hide();
  } else {
    link.graphic.show();
  }

  link.toNode.linksFrom.forEach((innerLink) => {
    changeVisibility(innerLink, true);
  });
};

Highcharts.chart("container", {
  chart: {
    type: "networkgraph",
    events: {
      load() {
        this.series[0].points.forEach((point) => {
          changeVisibility(point, true);
        });
      },
    },
  },
  plotOptions: {
    networkgraph: {
      inactiveOtherPoints: false,
      states: {
        hover: {
          enabled: false,
        },
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  series: [
    {
      item: {
        animation: {
          duration: 0,
        },
      },
      point: {
        events: {
          click() {
            this.linksFrom.forEach((link) => {
              changeVisibility(link, !link.toNode.isHidden);
            });
          },
        },
      },
      dataLabels: {
        enabled: true,
        linkFormat: "",
      },
      marker: {
        radius: 18,
      },
      data: [
        ["Mueed", "Brother"],
        ["Mueed", "Sister"],
        ["Mueed", "Mother"],
        ["Mueed", "Father"],
        ["Mueed", "Brotherinlaw"],
        ["Mueed", "motherinlaw"],
        ["Mueed", "son"],
        ["Mueed", "spouse"],
        ["Brother", "Ali"],
        ["Brother", "hanzila"],
        ["Sister", "sana"],
        ["Sister", "ayesha"],
        ["son", "ahmed"],
        ["Father", "anwar"],
        ["Mother", "sidra"],
        ["spouse", "anousha"],
        ["Brotherinlaw", "nabeel"],
        ["Brotherinlaw", "shahzob"],
      ],
    },
  ],
});
