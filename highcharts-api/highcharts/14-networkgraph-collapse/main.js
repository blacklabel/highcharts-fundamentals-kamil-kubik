const disableVisibility = (link) => {
  link.graphic.hide();
  link.toNode.graphic.css({
    opacity: 0,
  });
  link.toNode.dataLabel.css({
    opacity: 0,
  });
  link.toNode.isHidden = true;

  if (link.toNode.linksFrom.length > 0) {
    link.toNode.linksFrom.forEach((innerLink) => {
      disableVisibility(innerLink);
    });
  }
};

Highcharts.chart("container", {
  chart: {
    type: "networkgraph",
    events: {
      load() {
        this.series[0].points.forEach((point) => {
          disableVisibility(point);
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
              if (link.toNode.isHidden) {
                link.graphic.show();
                link.toNode.graphic.css({
                  opacity: 1,
                });
                link.toNode.dataLabel.css({
                  opacity: 1,
                });
                link.toNode.isHidden = false;
              } else {
                disableVisibility(link);
              }
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
        ["anousha", "shahzob"],
        ["anousha", "sidra"],
      ],
    },
  ],
});
