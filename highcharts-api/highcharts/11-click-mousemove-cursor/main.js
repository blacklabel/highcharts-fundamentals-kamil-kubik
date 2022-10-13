Highcharts.chart('container', {
    title: {
        text: 'Chart title'
    },
    series: [{
        name: 'Series 1',
        data: [200, 150, 130, 210, 190, 170, 200, 120],
    }]
}, ({ container, renderer }) => {
    const cursorCircle = renderer.circle(-50, -50, 5).attr({ fill: 'blue' }).add();

    if (container) {
        container.addEventListener('click', ({ chartX, chartY }) => {
            renderer.circle(chartX, chartY, 5).attr({ fill: 'blue' }).add()
        });
    
        container.addEventListener('mousemove', ({ chartX, chartY }) => {
            cursorCircle.attr({ x: chartX, y: chartY });
        });
    }
});
