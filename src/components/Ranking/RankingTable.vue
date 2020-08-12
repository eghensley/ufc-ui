<template>
    <div class="card events-card is-shadow-longer">
        <h1 v-if="rankingTableLoading && !rankingTableInitialized"> {{initRankPage()}} </h1>
        <header class="card-header">
            <p class="card-header-title">
                Fighters
            </p>
        </header>
        <div class="card-table">
            <div class="content">
                <table class="table is-fullwidth is-shadow-longer">
                    <thead>
                        <tr class="is-shadow-sharp">
                            <th></th>
                            <th>Name</th>
                            <th>
                                <abbr title="Percentile of cumulative Elo ranking among weight class peers">Rating</abbr>
                                <a @click="showRankInfoModal()">
                                    <span class="icon">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="is-shadow-dreamy" v-for="rank in weightClassRankings" :key="rank.oid">
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
    </div>
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