<template>
    <div class="card events-card" v-if="isFuture">

        <header class="card-header">
            <p class="card-header-title">
                <span>
                    Relative Elo Rank Breakdown
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleBoutRadarVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showBoutRadar, 'fa fa-angle-down': !showBoutRadar }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBoutRadar">
            <div class="content">
                <div class="subtitle">
                    Comparison of 8 Elo attributes for each fighter, scaled for rank relative to active fighters in the weight class.
                </div>
                <ul>
                    <li> 0: Lowest attribute score among active fighters in the weight class </li>
                    <li> 50: Average attribute score among active fighters in the weight class </li>
                    <li> 100: Highest attribute score among active fighters in the weight class </li>
                </ul>
                <div id="bout-chart-radar" v-if="showRankChart">
                    <apexchart type="radar" height="450" :options="radarChartOptions" :series="boutRankSeries"></apexchart>
                </div>
                <div v-if="!showRankChart">
                    One or both fighters lack data in the <strong>weight class</strong> required to populate a relative comparison
                </div>                    
            </div>
        </div>
    </div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

var weightClassDict = {
    'WW': 'Welterweight',
    'FW': 'Flyweight',
    'WSW': 'Women\'s Strawweight',
    'WFW': 'Women\'s Flyweight',
    'BW': 'Bantamweight',
    'WBW': 'Women\'s Bantamweight',
    'FFW': 'Featherweight',
    'WFFW': 'Women\'s Featherweight',
    'LW': 'Lightweight',
    'MW': 'Middleweight',
    'LHW': 'Light Heavyweight',
    'HW': 'Heavyweight',
    'CW': 'Catch Weight'
}

export default {
    name: 'fightBoutRadar',
    components: {
        apexchart: VueApexCharts
    },
    props: {
        selectedBoutInfo: {type: Object},
        boutRankSeries: {type: Array},
        showRankChart: {type: Boolean, default: true},
        showEloChart: {type: Boolean, default: true},
        isFuture: {type: Boolean, default: true}
    },
    methods: {
        resolveWeightClass (myKey) {
            return weightClassDict[myKey];
        },
        toggleBoutRadarVis () {
            if (this.showBoutRadar){
                this.showBoutRadar = false
            } else {
                this.showBoutRadar = true
            }
        }
    },
    data () {
        return {
            showBoutRadar: false,
            radarChartOptions: {
                chart: {
                    height: 350,
                    type: 'radar',
                },
                colors: ['#a0e3b7', '#d44446'],
                title: {
                    text: ''
                },
                xaxis: {
                    categories: ['Striking Offense', 'Striking Defense', 'Grappling Offense', 'Grappling Defense', 'K/O Power', 'Chin', 'Submission', 'Evasiveness']
                },
                yaxis: {
                    min: 0,
                    max: 100
                }
            }   
        }
    }
}
</script>