<template>
  <transition name="modal-fade">
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Fighter Info</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <h2> {{ modalFighterRank['name'] }} </h2>
                </div>
                
                <VueApexCharts type="radar" height="450" :options="chartOptions" :series="modelFighterRankSeries"></VueApexCharts>

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

import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'fighterRankModal',
    props: {
        modalFighterRank : {
            type: Object, default: function () { 
                return {
                    'defGrapp': 88.23529411764706,
                    'defStrike': 76.47058823529412,
                    'name': 'Deiveson Figueiredo',
                    'offGrapp': 70.58823529411765,
                    'offStrike': 100,
                    'oid': '9cc644cf-94ef-476c-9610-479c711097d6',
                    'total': 100
                }
            }
        },
        modelFighterRankSeries: {
            type: Array, default: function () { 
                return [
                    {
                        'name': 'test',
                        'data': [0,0,0,0,0,0,0,0]
                    }
                ]
            }            
        }
    },
    components: {
        VueApexCharts
    },
    data () {
        return {
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'radar',
                },
                title: {
                    text: 'Elo Rank Breakdown'
                },
                xaxis: {
                    categories: ['Striking Offense', 'Striking Defense', 'Grappling Offense', 'Grappling Defense', 'K/O Power', 'Chin', 'Submission', 'Evasiveness']
                }
            }
        }
    },
    methods: {
        close () {
            this.$emit('closeFighterRank')
        }
    }
}
</script>

<style scoped>
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
</style>