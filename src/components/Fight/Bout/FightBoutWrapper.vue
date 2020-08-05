<template>
    <div class="column is-6">
        <div class="card events-card">

            <header class="card-header">
                <p class="card-header-title">
                    Bout Details
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="title"> {{ selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['fighterName']}} vs {{ selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['fighterName'] }} </div>
                    <div class="level">
                        <div class="level-item">
                            <div>
                                <div class="heading"> Scheduled Rounds </div>
                                <div class="title is-5"> {{ selectedBoutInfo['schedRounds'] }} </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <div>
                                <div class="heading"> Championship? </div>
                                <div class="title is-5"> {{ selectedBoutInfo['champBout'] }} </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <div>
                                <div class="heading"> Weight Class </div>
                                <div class="title is-5"> {{ resolveWeightClass(selectedBoutInfo['weightClass']) }} </div>
                            </div>
                        </div>
                    </div>

                    <div id="chart">
                        <apexchart type="bar" height="440" :options="chartOptions" :series="eloDataSeries"></apexchart>
                    </div>
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
    name: 'fightBoutWrapper',
    components: {
        apexchart: VueApexCharts
    },
    props: {
        selectedBoutInfo: {type: Object},
        eloDataSeries: {type: Array}
    },
    methods: {
        resolveWeightClass (myKey) {
            return weightClassDict[myKey];
        },
    },
    data () {
        return {
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
                    min: -0.1,
                    max: 0.1,
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
                    text: 'Fighter Comparison'
                },
                xaxis: {
                    categories: ['Striking Offense', 'Striking Defense', 'Grappling Offense', 'Grappling Defense', 'KO Power', 'Chin', 'Submission', 'Evasiveness'],
                    title: {
                        text: 'Elo Rating Advantage'
                    },
                    labels: {
                        formatter: function (val) {
                            return Math.abs(Math.round(val)) + '%'
                        }
                    }
                }
            }         
        }
    }
}
</script>