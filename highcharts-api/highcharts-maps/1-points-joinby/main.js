Highcharts.mapChart('container', {
    chart: {
        map: Highcharts.maps["custom/world"]
    },
    series: [{
        type: 'map',
        data: [
            ['POL', 100],
            ['USA', 90],
            ['PER', 50],
            ['TZA', 40],
            ['AUS', 1]
        ],
        joinBy: ['iso-a3'],
        keys: ['iso-a3']
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
