<template>
  <div class="container">
    <h1 class="w3-xxxlarge" v-if="rankingScreenLoading && !rankingScreenInitialized"> {{initRankingMain()}} </h1>
    <section class="section">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <router-link to="/">    
                        Bet UFC
                    </router-link>
                </li>
                <li v-bind:class="{ 'is-active': !evalIfWeightClassSelected() }">
                    <a @click="resetSelectedWeightClass()">Rankings</a>
                </li>
                <li class="is-active" v-if="evalIfWeightClassSelected()"   >
                    <a>{{resolveWeightClass(selectedWeightClass)}}</a>
                </li>
            </ul>
        </nav>
        <div class="container">
            <div class="columns">
                <RankingAside
                    :activeWc="selectedWeightClass"
                    @switchWC="switchWeightClass"
                />
                <main class="column main is-four-fifths">
                    <section class="hero is-primary welcome is-small is-shadow-sharp" id="myHeader">
                        <div class="hero-body">
                            <div class="container">
                                <h2 class="title"> Fighter Rankings </h2>
                                <h2 class="subtitle" v-if="evalIfWeightClassSelected()"> {{resolveWeightClass(selectedWeightClass)}} </h2>
                                <h2 class="subtitle" v-if="!evalIfWeightClassSelected()"> Please select a weight class </h2>
                            </div>
                            
                        </div>
                    </section>

                    <br>
                    <RankingTable
                        v-if="!rankingScreenLoading && evalIfWeightClassSelected()"
                        :weightClass="selectedWeightClass"
                        @switchWC="switchWeightClass"
                    />
                    <TopRankingTable
                        v-if="!rankingScreenLoading && !evalIfWeightClassSelected()"
                        :weightClass="selectedWeightClass"
                        @switchWC="switchWeightClass"
                    />
                </main>
                
            </div>
        </div>
    </section>
  </div>    
</template>

<script>

import RankingAside from '@/components/Ranking/RankingAside.vue'
import TopRankingTable from '@/components/Ranking/TopRankingTable.vue'
import RankingTable from '@/components/Ranking/RankingTable.vue'

// import RankingDropdown from '@/components/Ranking/RankingDropdown.vue'

const rankingWeightClassDict = {
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
    'HW': 'Heavyweight'
}

export default {
    name: 'rankings',
    components: {
        RankingAside, TopRankingTable, RankingTable
    },
    data () {
        return {
            rankingScreenLoading: true,
            rankingScreenInitialized: false,
            selectedWeightClass: ''
        }
    },
    methods: {
        resolveWeightClass (myKey) {
            return rankingWeightClassDict[myKey];
        },
        initRankingMain () {
            this.rankingScreenLoading = false
        },
        switchWeightClass (wc) {
            this.selectedWeightClass = wc
        },
        evalIfWeightClassSelected () {
            if (this.selectedWeightClass === '') {
                return false
            } else {
                return true
            }
        },
        resetSelectedWeightClass () {
            this.selectedWeightClass = ''
        }
    }
}
</script>