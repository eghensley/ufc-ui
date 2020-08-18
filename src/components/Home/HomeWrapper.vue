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