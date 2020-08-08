<template>
  <div class="container">
    <section class="hero is-info welcome is-small" id="myHeader">
      <div class="hero-body">
        <div class="container">
          <h2 class="title"> {{resolveWeightClass(selectedWeightClass)}} </h2>
          <h2 class="subtitle"> Fighter Rankings </h2>
        </div>
        <h1 class="w3-xxxlarge" v-if="rankingScreenLoading && !rankingScreenInitialized"> {{initRankingMain()}} </h1>
      </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="columns">
                <RankingAside
                    :activeWc="selectedWeightClass"
                    @switchWC="switchWeightClass"
                />
                <RankingDropdown
                    :activeWc="selectedWeightClass"
                    @switchWC="switchWeightClass"
                />
                <main class="column main">
                    <RankingTable
                        v-if="!rankingScreenLoading"
                        :weightClass="selectedWeightClass"
                    />
                </main>
            </div>
        </div>
    </section>
  </div>    
</template>

<script>

import RankingAside from '@/components/Ranking/RankingAside.vue'
import RankingTable from '@/components/Ranking/RankingTable.vue'
import RankingDropdown from '@/components/Ranking/RankingDropdown.vue'

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
        RankingAside, RankingTable, RankingDropdown
    },
    data () {
        return {
            rankingScreenLoading: true,
            rankingScreenInitialized: false,
            selectedWeightClass: 'FW',
        }
    },
    methods: {
        resolveWeightClass (myKey) {
            return rankingWeightClassDict[myKey];
        },
        initRankingMain () {
            console.log('init rankings')
            this.rankingScreenLoading = false
        },
        switchWeightClass (wc) {
            this.selectedWeightClass = wc
        }
    }
}
</script>