<template>
    <main class="column main is-four-fifths">
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
                    <a @click="showRankInfoModal()">
                        <span class="icon">
                            <i class="fas fa-info-circle"></i>
                        </span>
                    </a>
                </p>
            </header>
                <!-- <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a> -->
            <div class="card-table">
                <div class="content">
                    <table class="table is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th><abbr title="Percentile of cumulative Elo ranking among weight class peers">Rating</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rank in weightClassRankings" :key="rank.oid">
                                <td width="5%">
                                    <i class="fa fa-bell-o"></i>
                                </td>
                                <td>
                                    <a @click="showFighterRankModal(rank)"> {{rank.name}} </a>
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
        <RankingFighterModal
            v-show="isFighterModalVisible"
            @closeFighterRank="closeFighterRankModal"
            :modalFighterRank="selectedFighterRank"
            :modelFighterRankSeries="selectedModelFighterRankSeries"
        />
        <RankingInfoModal
            v-show="isRankInfoModalVisible"
            @closeRankInfo="closeRankInfoModal"
        />
    </main>
</template>

<script>

import ApiService from '@/services/ApiService.js'
import RankingFighterModal from '@/components/Ranking/RankingFighterModal.vue'
import RankingInfoModal from '@/components/Ranking/RankingInfoModal.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'RankingTable',
    components: {
        RankingFighterModal, RankingInfoModal
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
            weightClassRankings: [],
            isFighterModalVisible: false,
            selectedFighterRank: {},
            isRankInfoModalVisible: false,
            selectedModelFighterRankSeries: [{name: 'test', data: []}]
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
        },
        showFighterRankModal (fighterInfo) {
            this.selectedFighterRank = fighterInfo
            this.selectedModelFighterRankSeries =[{name: fighterInfo.name, data: [fighterInfo.offStrike, fighterInfo.defStrike, fighterInfo.offGrapp, fighterInfo.defGrapp, fighterInfo.offKo, fighterInfo.defKo, fighterInfo.offSub, fighterInfo.defSub]}]
            this.isFighterModalVisible = true
        },
        closeFighterRankModal () {
            this.selectedFighterRank = {} 
            this.selectedModelFighterRankSeries = [{name: 'test', data: []}]
            this.isFighterModalVisible = false
        },
        showRankInfoModal () {
            this.isRankInfoModalVisible = true
        },
        closeRankInfoModal () {
            this.isRankInfoModalVisible = false
        }
    }
}
</script>