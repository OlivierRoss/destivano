
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
            size: '40%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -20
            }
        }, {
            name: 'Versions',
            data: versionsData,
            size: '60%',
            innerSize: '40%',
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
    Highcharts.chart('prevision-demande', {
        title: {
            text: 'Prévision de la demande',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: 'Année'
            },
            categories: [2013, 2014, 2015, 2016, 2017, 2018]
        },
        yAxis: {
            title: {
                text: 'Demande historique et prévue'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '$'
        },
        //legend: {
        //    layout: 'vertical',
        //    align: 'right',
        //    verticalAlign: 'middle',
        //    borderWidth: 0
        //},
        series: [{
            name: 'Demande',
            data: [372237783, 340210113, 342845567, 348852012, 350388137, 400000000]
        }]
    });
});

// Stock disponible
$(function () {
    Highcharts.chart('stock-disponible', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stock disponible'
        },
        xAxis: {
            categories: [10, 20, 30, 40, 50, 60, 70]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Stock cuir disponible'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            enabled: false,
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Beige',
            color: '#997E55',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Blanc',
            color: 'white',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Cacao',
            color: '#695C3B',
            data: [3, 4, 4, 2, 5]
        }, {
            name: 'Ébène',
            color: '#2D3230',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Gris',
            color: '#5B6469',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Ivoire',
            color: '#E7CA8C',
            data: [3, 4, 4, 2, 5]
        }, {
            name: 'Noir',
            color: 'black',
            data: [3, 4, 4, 2, 5]
        }, {
            name: 'Sable',
            color: '#EEE6C0',
            data: [3, 4, 4, 2, 5]
        }]
    });
});

////// FINANCE //////



////// COMPATIBILITE //////



////// GRH //////



////// MARKETING //////
