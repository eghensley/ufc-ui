<template>
  <transition name="modal-fade">
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Model Prediction Explanation</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
            <div class="content">
                <div class="subtitle">
                    Decompostion of the features which lead to the model's prediction
                </div>
                <div id="bout-chart-bar" v-if="showBoutModelChart">
                    <apexchart type="bar" height="350" :options="chartOptions" :series="modelBoutDataSeries"></apexchart>
                </div>
                <div v-if="!showBoutModelChart">
                    One or both fighters lack data required to populate comparison charts
                </div>                  
            </div>

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
    name: 'fightBoutModelBar',
    components: {
        apexchart: VueApexCharts
    },
    props: {
        showBoutModelChart: {type: Boolean, default: true},
        isFuture: {type: Boolean, default: true},
        modelBoutDataSeries: {type: Object},
        modelColumns: {type: Array}
    },
    methods: {
        close () {
            this.$emit('closeBoutModelModal')
        }
    },
    data () {
        return {

            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 440,
                    stacked: true
                },
                colors: ['#ee605b71', '#5bc0de70'],
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
                    categories: this.modelColumns,
                    
                    // ['24 other features', 'off_ko_diff',
                    // 'eff_strike_diff',
                    // 'prev_fights_1',
                    // 'eff_strike_2',
                    // 'off_ko_1',
                    // 'def_strike_diff',
                    // 'off_ko_share',
                    // 'def_ko_1',
                    // 'eff_strike_share',
                    // 'age_diff'],

                    title: {
                        text: 'Feature Impact',
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