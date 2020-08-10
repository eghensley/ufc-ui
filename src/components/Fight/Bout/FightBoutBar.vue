<template>
    <div class="card events-card">

        <header class="card-header">
            <p class="card-header-title">
                <span>
                    Direct Stat Comparison
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleBoutBarVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showBoutBar, 'fa fa-angle-down': !showBoutBar }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBoutBar">
            <div class="content">
                <div class="subtitle">
                    Direct comparison of fighter scores across 8 Elo attributes at the time of the fight.
                </div>
                <ul>
                    <li> Not scaled to rank within weight class </li>
                </ul>
                <div id="bout-chart-bar" v-if="showEloChart">
                    <apexchart type="bar" height="440" :options="chartOptions" :series="eloDataSeries"></apexchart>
                </div>
                <div v-if="!showEloChart">
                    One or both fighters lack data required to populate comparison charts
                </div>                  
            </div>
        </div>
    </div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'fightBoutBar',
    components: {
        apexchart: VueApexCharts
    },
    props: {
        selectedBoutInfo: {type: Object},
        eloDataSeries: {type: Array},
        showEloChart: {type: Boolean, default: true},
        isFuture: {type: Boolean, default: true}
    },
    methods: {
        toggleBoutBarVis () {
            if (this.showBoutBar){
                this.showBoutBar = false
            } else {
                this.showBoutBar = true
            }
        }
    },
    data () {
        return {
            showBoutBar: false,
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 440,
                    stacked: true
                },
                colors: ['#a0e3b7', '#d44446'],
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                yaxis: {
                    min: -.2,
                    max: .2,
                    title: {

                    }
                },
                tooltip: {
                    shared: false,
                    x: {
                        formatter: function (val) {
                            return val
                        }
                    },
                    y: {
                        formatter: function (val) {
                            return Math.abs(val) + '%'
                        }
                    }
                },
                title: {
                    text: ''
                },
                xaxis: {
                    categories: ['Striking Offense', 'Striking Defense', 'Grappling Offense', 'Grappling Defense', 'KO Power', 'Chin', 'Submission', 'Evasiveness'],
                    title: {
                        text: 'Elo Rating Advantage'
                    },
                    labels: {
                        formatter: function (val) {
                            val = ""
                            return val 
                            // return Math.abs(Math.round(val)) 
                        }
                    }
                }
            }         
        }
    }
}
</script>