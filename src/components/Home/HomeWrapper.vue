<template>
    <div class="card events-card">
        <header class="card-header">
            <p class="card-header-title">
                Algorithm's Performance
            </p>
            <a class="card-header-icon" v-on:click="toggleHomeChartVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showHomeChart, 'fa fa-angle-down': !showHomeChart }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showHomeChart">
            <div class="content">
                <apexchart v-if="!homeChartLoading" type="line" height="440" :options="chartOptions" :series="betSeries"></apexchart>
            </div>
        </div>
    </div>
</template>

<script>

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
                        console.log(this.betData[i].fightName)
                        console.log(this.betData[i].result)
                        bank += this.betData[i].result
                        this.betSeries[0].data.push(bank)
                        this.betSeries[1].data.push(this.betData[i].result)
                        this.chartOptions.xaxis.categories.push(this.betData[i].fightName.split(':')[1])
                    }

                    console.log(this.betSeries)
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
                // tooltip: {
                //     shared: false,
                //     x: {
                //         formatter: function (val) {
                //             return val
                //         }
                //     },
                //     y: {
                //         formatter: function (val) {
                //             return '$'+val
                //         }
                //     }
                // },
                title: {
                    text: 'Event and rolling total results'
                },
                xaxis: {
                    categories: [],
                    title: {
                        text: 'Event'
                    },
                    labels: {
                        formatter: function (val) {
                            return val//.split(";")[1]
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Balance'
                    },
                    labels: {
                        formatter: function (val) {
                            if (val < 0) {
                                return '-$'+(val * -1)
                            } else {
                                return '$'+val
                            }
                        }
                    }
                }
            }         
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