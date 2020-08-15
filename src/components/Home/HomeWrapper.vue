<template>
    <div class="card events-card is-shadow-longer">
        <header class="card-header is-bevel">
            <p class="card-header-title">
                Algorithm's Performance
            </p>
            <a class="card-header-icon" v-on:click="toggleHomeChartVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': showHomeChart, 'fas fa-chevron-circle-down': !showHomeChart }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showHomeChart">
            <div class="content">
                Event and rolling total results
                <apexchart v-if="!homeChartLoading" type="line" height="440" :options="chartOptions" :series="betSeries"></apexchart>

        <!-- <apexchart type="line" height="350" :options="ex2ChartOptions" :series="ex2Series"></apexchart> -->

            </div>
        </div>
    </div>
</template>

<script>

const rounder = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

import VueApexCharts from 'vue-apexcharts'
import ApiService from '@/services/ApiService.js'

export default {
    name: 'homeWrapper',
    components: {
        apexchart: VueApexCharts
    },
    created () {
        console.log('init home chart')
        ApiService.getBetInfo()
            .then(
            fights => {
                this.betData = fights['response']//.slice(1, fights.length)
            }
            ).catch(error => console.log(error))
            .finally(
                () => {
                    var bank = 0
                    var i
                    for (i = 0; i < this.betData.length; i++) {
                        bank += this.betData[i].result
                        this.betSeries[0].data.push(bank)
                        this.betSeries[1].data.push(this.betData[i].result)
                        this.chartOptions.xaxis.categories.push(this.betData[i].fightName.split(':')[1])
                    }
                    this.homeChartLoading = false
                }
            )
    },
    data () {
        return {
            homeChartLoading: true,
            betData: [],
            betSeries: [
                {
                    name: 'Net Results',
                    data: [],
                    type: 'line'
                },
                {
                    name: 'Fight Results',
                    data: [],
                    type: 'bar'
                }
            ],
            showHomeChart: true,
            chartOptions: {
                grid: {
                    
                },
                theme: {
                    palette: 'palette3', 
                },
                title: {
                    text: '',
                    style: {
                        color: '#fafafa'
                    }
                },
                legend: {
                    labels: {
                        colors: '#fafafa'
                    }
                },
                xaxis: {
                    categories: [],
                    title: {
                        text: 'Event',
                        style: {
                            color: '#fafafa'
                        }
                    },
                    labels: {
                        formatter: function (val) {
                            return val//.split(";")[1]
                        },
                        rotateAlways: true,
                        style: {
                            colors: '#aaa'
                        }
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    title: {
                        text: 'Balance',
                        style: {
                            color: '#fafafa'
                        },
                        offsetX: 10
                    },
                    labels: {
                        formatter: function (val) {
                            if (val < 0) {
                                return '-$'+(rounder.format(val) * -1)
                            } else {
                                return '$'+rounder.format(val)
                            }
                        },
                        style: {
                            colors: '#aaa'
                        }
                    }
                },
                tooltip: {
                    theme: 'dark'
                }
            },
            
                    
                    
                    

//          ex2Series: [
             
//              {'name': 'Cumulative Confidence',
//                 'type': 'area',
//                 'data': [-0.031402769563075916,
//                     -0.013406375457908182,
//                     0.005241234889522828,
//                     -0.015063460193800227,
//                     0.005276746064047266,
//                     0.025846480817463102,
//                     0.046597202903743695,
//                     0.06860802196250215,
//                     0.0916625148698128,
//                     0.13784391632681947,
//                     0.051044535243640665]
//                 }, 

// {'name': 'Feature Impact',
//  'type': 'bar',
//  'data': [-0.031402769563075916,
//   0.017996394105167735,
//   0.01864761034743101,
//   -0.020304695083323054,
//   0.020340206257847493,
//   0.020569734753415836,
//   0.020750722086280593,
//   0.022010819058758457,
//   0.023054492907310653,
//   0.046181401457006666,
//   -0.0867993810831788]},





//   ],
//           ex2ChartOptions: {
//             chart: {
//               height: 350,
//               type: 'line',
//             },
//             stroke: {
//               curve: 'smooth'
//             },
//             fill: {
//               type:'solid',
//               opacity: [.5, .75],
//             },
//             colors: ['#fafafa', '#4d6470'],
//             labels: ['24 other features', 'off_ko_diff',
//                     'eff_strike_diff',
//                     'prev_fights_1',
//                     'eff_strike_2',
//                     'off_ko_1',
//                     'def_strike_diff',
//                     'off_ko_share',
//                     'def_ko_1',
//                     'eff_strike_share',
//                     'age_diff'],
//                 legend: {
//                     labels: {
//                         colors: '#fafafa'
//                     }
//                 },
//             markers: {
//               size: 0
//             },
//             yaxis: [
//               {
//                 min: -.25,
//                 max: .25,
//                 title: {
//                   text: 'Red Corner Winning Confidence',
//                         style: {
//                             color: '#fafafa'
//                         },
//                 },
//                 labels: {
//                     formatter: function (val) {
//                         return (rounder.format(val * 100) * -1) + '%'
//                     },
//                     style: {
//                         colors: '#aaa'
//                     }
//                 }
//               },
//               {
//                 min: -.1,
//                 max: .1,
//                 title: {
//                   text: 'Feature Impact',
//                         style: {
//                             color: '#fafafa'
//                         },
//                 },
//                 opposite: true,
//                     labels: {
//                         formatter: function (val) {
//                             return (rounder.format(val * 100) * -1) + '%'
//                         },
//                         style: {
//                             colors: '#aaa'
//                         }
//                     }
//               },
//             ],
//             xaxis: {
//                 categories: [],
//                 title: {
//                     text: 'Feature',
//                     style: {
//                         color: '#fafafa'
//                     }
//                 },
//                 labels: {
//                     formatter: function (val) {
//                         return val//.split(";")[1]
//                     },
//                     rotateAlways: true,
//                     style: {
//                         colors: '#aaa'
//                     }
//                 },
//                 tooltip: {
//                     enabled: false
//                 }
//             },
//             tooltip: {
//                 theme: 'dark',
//                 shared: true,
//                 y: {
//                     formatter: function (val) {
//                         return rounder.format(val * 100) + '%'
//                     }
//                 }
//             },
//           },


        }
    },
    methods: {
        toggleHomeChartVis () {
            if (this.showHomeChart) {
                this.showHomeChart = false
            } else {
                this.showHomeChart = true
            }
        }
    }
}
</script>