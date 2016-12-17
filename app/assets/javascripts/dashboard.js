
////// PRODUCTION //////

// Distribution de la production
$(function () {

    var colors = Highcharts.getOptions().colors,
        categories = ['Chine', 'CA - Destivano', 'CA - sous-traitant'],
        data = [{
            y: 37.6,
            color: colors[0],
            drilldown: {
                name: 'Chine',
                categories: ['Ballerine', 'Bottilon', 'Bottine Ouverte', 'Chaussure Loisir', 'Soulier Standard', 'Soulier Talon Haut', 'Escarpin'],
                data: [2.9, 1.9, 1.8, 6.6, 10.3, 7.1, 7.0],
                color: colors[0]
            }
        }, {
            y: 34.7,
            color: colors[1],
            drilldown: {
                name: 'CA',
                categories: ['Botte', 'Bottilon', 'Bottine Ouverte', 'Chaussure Loisir', 'Soulier Standard'],
                data: [19.9, 9.9, 2.9, 1.3, 2.76, 2.1],
                color: colors[1]
            }
        }, {
            y: 27.7,
            color: colors[2],
            drilldown: {
                name: 'ST',
                categories: ['Ballerine', 'Chaussure Loisir', 'Soulier Standard', 'Soulier Talon Haut'],
                data: [3.4, 2.3, 10.5, 11.5],
                color: colors[2]
            }
        }],
        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    Highcharts.chart('distribution-production', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Distribution de la production'
        },
        //subtitle: {
        //    text: 'Source: <a href="http://netmarketshare.com/">netmarketshare.com</a>'
        //},
        yAxis: {
            title: {
                text: 'Pourcentage de la distribution de la production'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Pays',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: 'Versions',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }]
    });
});

// Prevision de la demande
$(function () {
    Highcharts.chart('container', {
        title: {
            text: 'Prévision de la demande',
            x: -20 //center
        },
        xAxis: {
            categories: ['']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});


////// FINANCE //////



////// COMPATIBILITE //////



////// GRH //////



////// MARKETING //////
