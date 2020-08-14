<template>
  <transition name="modal-fade">
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Direct Elo Comparison</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">



    <!-- <div class="card events-card is-shadow-dreamy"> -->

        <!-- <header class="card-header">
            <p class="card-header-title">
                <span>
                    Direct Stat Comparison
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleBoutBarVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': showBoutBar, 'fas fa-chevron-circle-down': !showBoutBar }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBoutBar"> -->
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
        <!-- </div> -->
    <!-- </div> -->


            </section>
            <footer class="modal-card-foot">
                <!-- <button class="button is-success">Save changes</button> -->
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
    </div>
  </transition>
</template>

<script>

const rounder = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

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
        },
        close () {
            this.$emit('closeDirectEloModal')
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
                colors: ['#5bc0de70', '#ee605b71'],
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
                        style: {
                            color: '#fafafa'
                        }
                    },
                    labels: {
                        style: {
                            colors: '#fafafa'
                        }
                    }
                },
                tooltip: {
                    theme: 'dark',
                    shared: false,
                    x: {
                        formatter: function (val) {
                            return val
                        }
                    },
                    y: {
                        formatter: function (val) {
                            return '+' + rounder.format(Math.abs(val * 100)) + '%'
                        }
                    }
                },
                title: {
                    text: ''
                },
                legend: {
                    labels: {
                        colors: '#fafafa'
                    }
                },
                xaxis: {
                    categories: ['Striking Offense', 'Striking Defense', 'Grappling Offense', 'Grappling Defense', 'KO Power', 'Chin', 'Submission', 'Evasiveness'],
                    title: {
                        text: 'Elo Rating Advantage',
                        style: {
                            color: '#fafafa'
                        }
                    },
                    labels: {
                        formatter: function (val) {
                            val = ""
                            return val 
                            // return Math.abs(Math.round(val)) 
                        },
                        style: {
                            colors: '#fafafa'
                        }
                    }
                }
            }         
        }
    }
}
</script>

<style scoped>
  .modal {
    background: #5bc0de70;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
</style>