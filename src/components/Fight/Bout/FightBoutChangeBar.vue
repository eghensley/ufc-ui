<template>

  <transition name="modal-fade">
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">ELO Changes Following Fight</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
    <!-- <div class="card events-card" v-if="!isFuture">

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
        <div class="card-content" v-if="showBoutChangeBar"> -->
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
        <!-- </div>
    </div> -->

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
        },
        close () {
            this.$emit('closeEloChangeModal')
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
                colors: ['#5bc0de70', '#ee605b71'],
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
                                                    style: {
                            color: '#fafafa'
                        }
                        },
                        labels: {
                            formatter: function (y) {
                                return y + "%";
                            },
                        style: {
                            colors: '#fafafa'
                        }
                        },
                        min: -100,
                        max: 100,
                    },
                legend: {
                    labels: {
                        colors: '#fafafa'
                    }
                },
                    xaxis: {
                        categories: ['Striking Offense', 'Striking Defense', 'Grappling Offense', 'Grappling Defense', 'KO Power', 'Chin', 'Submission', 'Evasiveness'],
                        labels: {
                            rotate: -45,
                                                    style: {
                            colors: '#fafafa'
                        }
                        }
                    },
                tooltip: {
                    theme: 'dark'
                }
                },        
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