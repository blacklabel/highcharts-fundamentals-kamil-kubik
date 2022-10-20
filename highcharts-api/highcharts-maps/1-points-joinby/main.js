Highcharts.mapChart('container', {
    chart: {
        map: Highcharts.maps["custom/world"]
    },
    series: [{
        type: 'map',
        data: [
            ['pl', 1],
            ['us', 2],
            ['pe', 3],
            ['tz', 4],
            ['au', 5]
        ]
    }, {
        type: 'mapbubble',
        data: [
            ['gl', 1],
            ['in', 2],
            ['gb', 3],
            ['ao', 4]
        ]
    }]
});
