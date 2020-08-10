<template>
    <div class="card events-card" v-if="!isFuture">

        <header class="card-header">
            <p class="card-header-title">
                <span>
                    Stat Changes After Fight
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleBoutChangeBarVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showBoutChangeBar, 'fa fa-angle-down': !showBoutChangeBar }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBoutChangeBar">
            <div class="content">
                <div class="subtitle">
                    Changes to the fighters' Elo attributes based on their fight performance
                </div>
                <div id="bout-chart-bar" v-if="showChangeElo">
                    <apexchart type="bar" height="440" :options="chartOptions" :series="eloChangeDataSeries"></apexchart>
                </div>
                <div v-if="!showChangeElo">
                    One or both fighters lack data required to populate comparison charts
                </div>                  
            </div>
        </div>
    </div>
</template>

<script>

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'fightBoutChangeBar',
    components: {
        apexchart: VueApexCharts
    },
    props: {
        showChangeElo: {type:Boolean, default: false},
        eloChangeDataSeries: {type: Array},
        selectedBoutInfo: {type: Object},
        isFuture: {type: Boolean, default: true}
    },
    methods: {
        toggleBoutChangeBarVis () {
            if (this.showBoutChangeBar){
                this.showBoutChangeBar = false
            } else {
                this.showBoutChangeBar = true
            }
        },
        round (inDouble) {
            return formatter.format(inDouble)
        }
    },
    data () {
        return {
            showBoutChangeBar: false,
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                colors: ['#a0e3b7', '#d44446'],
                plotOptions: {
                    bar: {
                        columnWidth: '80%',
                        }
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    yaxis: {
                        title: {
                            text: 'Elo Attribute Change',
                        },
                        labels: {
                            formatter: function (y) {
                                return y + "%";
                            }
                        },
                        min: -100,
                        max: 100,
                    },
                    xaxis: {
                        categories: ['Striking Offense', 'Striking Defense', 'Grappling Offense', 'Grappling Defense', 'KO Power', 'Chin', 'Submission', 'Evasiveness'],
                        labels: {
                            rotate: -45
                        }
                    }
                },        
            }
    }
}
</script>