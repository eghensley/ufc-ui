<template>
    <div class="column is-12"> 
        <section v-if="rankingTableLoading" class="hero is-info is-small" id="loadingRibbon">
            <div class="container">
                <h1 class="title"> Loading ... </h1>
                <a class="navbar-item is--brand">
                    <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                </a>
                <h1 class="w3-xxxlarge" v-if="rankingTableLoading && !rankingTableInitialized"> {{initRankPage()}} </h1>
            </div>
        </section>
        <div class="card events-card">
            <header class="card-header">
                <p class="card-header-title">
                Fighters
                </p>
                <!-- <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a> -->
            </header>
            <div class="card-table">
                <div class="content">
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr v-for="rank in weightClassRankings" :key="rank.oid">
                                <td width="5%">
                                    <i class="fa fa-bell-o"></i>
                                </td>
                                <td>
                                    <div> {{rank.name}} </div>
                                </td>
                                <td>
                                    <div class="is-small"> {{round(rank.total)}} </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <footer class="card-footer">
                        <a></a>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ApiService from '@/services/ApiService.js'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'RankingTable',
    components: {
        
    },
    props: {
        weightClass: {type: String, default: 'FW'}
    },
    watch: { 
        weightClass: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            this.rankingTableLoading = true
            this.rankingTableInitialized = false
        }
    },
    data () {
        return {
            rankingTableLoading: true,
            rankingTableInitialized: false,
            weightClassRankings: []
        }
    },
    methods: {
        initRankPage () {
            this.rankingTableInitialized = true
            this.getRankings()
        },
        getRankings () {
            this.rankingTableLoading = true
            ApiService.getWeightClassRankings(this.weightClass)
                .then(
                ranks => {
                    this.weightClassRankings = ranks['response']
                }
                ).catch(error => console.log(error)).finally(
                    () => {
                        this.rankingTableLoading = false
                    }
                )
        },
        switchFight (newFightId) {
            this.fightId = newFightId
            this.getBoutsFromFightData()
        },
        round (inDouble) {
            return formatter.format(inDouble)
        }
    }
}
</script>