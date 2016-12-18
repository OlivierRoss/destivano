
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

// Commandes par pays
$(function () {
    Highcharts.chart('commandes-pays', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Commandes par pays',
            align: 'center',
            verticalAlign: 'middle',
            y: 120
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Pays',
            innerSize: '50%',
            data: [
                ['Europe', 59.1],
                ['Canada', 9.97],
                ['États-Unis', 30.97]
            ]
        }]
    });
});

// Stock utilise
$(function () {
    Highcharts.chart('stock-disponible', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stock utilise'
        },
        xAxis: {
            categories: [10, 20, 30, 40, 50, 60, 70]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Stock cuir utilise'
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
            data: [0, 222491, 849864, 58368, 0, 0 ,0]
        }, {
            name: 'Blanc',
            color: 'white',
            data: [351390, 276894, 507634, 0, 0, 0, 0]
        }, {
            name: 'Cacao',
            color: '#695C3B',
            data: [0, 0, 0, 0, 0, 0, 0]
        }, {
            name: 'Ébène',
            color: '#2D3230',
            data: [425423, 838224, 230509, 162928, 343616, 93114, 0]
        }, {
            name: 'Gris',
            color: '#5B6469',
            data: [ 624641, 197571, 227582, 0, 0, 0, 0]
        }, {
            name: 'Ivoire',
            color: '#E7CA8C',
            data: [0, 560678, 672781, 230128, 387156, 0, 0]
        }, {
            name: 'Lilas',
            color: 'purple',
            data: [0, 0, 0, 230944, 0, 0, 0]
        }, {
            name: 'Noir',
            color: 'black',
            data: [419945, 316613, 365568, 510510, 0 , 0, 0]
        }, {
            name: 'Sable',
            color: '#EEE6C0',
            data: [0, 955960, 788805, 224720, 530432, 0, 0]
        }]
    });
});

// Coûts production


////// FINANCE //////



////// COMPATIBILITE //////

// MCV

$(function () {

    Highcharts.chart('mcv', {

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'Pourcentage de marge sur coûts variables'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: '%'
                },
                plotBands: [{
                    from: 0,
                    to: 30,
                    color: '#DF5353' // red
                }, {
                    from: 30,
                    to: 50,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 50,
                    to: 100,
                    color: '#55BF3B' // green
                }]
            },

            series: [{
                name: 'MCV',
                data: [57],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]

        },
        // Add some life
        function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].data[0],
                        newVal,
                        inc = 0;

                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }

                    point.update(newVal);

                }, 3000);
            }
        });
});

////// GRH //////

// Retards
$(function () {
    Highcharts.chart('retards', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Retards selon départements'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Retards',
            colorByPoint: true,
            data: [{
                name: 'Administration',
                y: 0.03
            }, {
                name: 'Approvisionnement',
                y: 0.03
            }, {
                name: 'Qualité ',
                y: 0.06
            }, {
                name: 'Comptabilité',
                y: 0.02
            }, {
                name: 'Design',
                y: 0.05
            }, {
                name: 'Distribution',
                y: 0.07
            }, {
                name: 'Maintenance',
                y: 0.04
            }, {
                name: 'Marketing',
                y: 0.05
            }, {
                name: 'Finances',
                y: 0.04
            }, {
                name: 'Planification',
                y: 0.01
            }, {
                name: 'Production',
                y: 0.37
            }, {
                name: 'R & D',
                y: 0.02
            }, {
                name: 'Réception',
                y: 0.02
            }, {
                name: 'Ressources humaines',
                y: 0.03
            }, {
                name: 'Système support et dev',
                y: 0.04
            }, {
                name: 'Trafic',
                y: 0.03
            }, {
                name: 'Ventes',
                y: 0.09
            }]
        }]
    });
});

// Pyramide des ages
$(function () {
    // Age categories
    var categories = ['- 26', '26 - 30', '31 - 35', '36 - 40', '41 - 45', '46 - 50', '51 - 55', '56 - 60', '61 - 65', '65 + '];
    $(document).ready(function () {
        Highcharts.chart('pyramide-ages', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Pyramide des âges des techniciens de finition'
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
                name: 'Hommes',
                data: [-52, -28, -23, -36, -26, -13, -11, -21, -2]
            }, {
                name: 'Femmes',
                data: [30, 13, 25, 26, 19, 18, 21, 15, 8]
            }]
        });
    });

});

// Absences
$(function () {
    Highcharts.chart('absences', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Absences selon départements'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Absences',
            colorByPoint: true,
            data: [{
                name: 'Qualité ',
                y: 0.316
            }, {
                name: 'Comptabilité',
                y: 0.002
            }, {
                name: 'Design',
                y: 0.012
            }, {
                name: 'Distribution',
                y: 0.002
            }, {
                name: 'Maintenance',
                y: 0.002
            }, {
                name: 'Marketing',
                y: 0.002
            },{
                name: 'Planification',
                y: 0.301
            }, {
                name: 'Production',
                y: 0.326
            }, {
                name: 'Ressources humaines',
                y: 0.034
            }]
        }]
    });
});

// Vacances
$(function () {
    Highcharts.chart('vacances', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Vacances selon départements'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Vacances',
            colorByPoint: true,
            data: [{
                name: 'Administration',
                y: 0.033
            }, {
                name: 'Approvisionnement',
                y: 0.046
            }, {
                name: 'Qualité ',
                y: 0.048
            }, {
                name: 'Comptabilité',
                y: 0.023
            }, {
                name: 'Design',
                y: 0.044
            }, {
                name: 'Distribution',
                y: 0.053
            }, {
                name: 'Maintenance',
                y: 0.044
            }, {
                name: 'Marketing',
                y: 0.009
            }, {
                name: 'Finances',
                y: 0.020
            }, {
                name: 'Planification',
                y: 0.031
            }, {
                name: 'Production',
                y: 0.471
            }, {
                name: 'R & D',
                y: 0.031
            }, {
                name: 'Réception',
                y: 0.013
            }, {
                name: 'Ressources humaines',
                y: 0.036
            }, {
                name: 'Système support et dev',
                y: 0.042
            }, {
                name: 'Trafic',
                y: 0.012
            }, {
                name: 'Ventes',
                y: 0.044
            }]
        }]
    });
});

////// MARKETING //////

// Budget market / gamme
$(function () {

    $(document).ready(function () {

        // Build the chart
        Highcharts.chart('budget-marketing', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Répartition du budget marketing'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Ballerines',
                    y: 6.33
                }, {
                    name: 'Bottes',
                    y: 14.94
                }, {
                    name: 'Bottillons',
                    y: 11.75
                }, {
                    name: 'Bottines ouvertes',
                    y: 4.70
                }, {
                    name: 'Chaussures loisirs',
                    y: 10.22
                }, {
                    name: 'Souliers standards',
                    y: 22.96
                }, {
                    name: 'Souliers talon haut',
                    y: 22.15
                }, {
                    name: 'Escarpins',
                    y: 6.95
                }]
            }]
        });
    });
});

// Parts de marche
$(function () {
    Highcharts.chart('part-marche', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Parts de marché de Destivano par région'
        },
        xAxis: {
            categories: ['2015', '2016', '2017', '2018'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: '%'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' %'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Canada',
            data: [0.23, 0.22, 0.21, 0.21]
        }, {
            name: 'USA',
            data: [0.13, 0.11, 0.11, 0.10]
        }, {
            name: 'Europe',
            data: [0.37, 0.36, 0.37, 0.35]
        }]
    });
});

// valeur-client
$(function () {
    // Create the chart
    Highcharts.chart('valeur-client', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Valeur et coûts moyen d\'un client'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Valeur'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}$'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}$</b> of total<br/>'
        },

        series: [{
            name: 'Indicateurs',
            colorByPoint: true,
            data: [{
                name: 'Coût moyen d\'atteinte',
                y: 80.3
            }, {
                name: 'Valeur moyenne brute client',
                y: 624
            }, {
                name: 'Coût d\'acquisition client',
                y: 542
            }, {
                name: 'Profit moyen / client',
                y: 25
            }]
        }]
    });
});