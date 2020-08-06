<template>
  <div class="container">
    <section class="hero is-info welcome is-small" id="myHeader">
      <div class="hero-body">
        <div class="container">
            <h2 class="title" v-if="!homeScreenLoading"> {{ selectedFightName }} </h2>
            <h2 class="subtitle" v-if="!homeScreenLoading"> {{ convToDate(selectedFightDate) }} </h2>

            <h1 class="title" v-if="homeScreenLoading"> Loading ... </h1>
            <a class="navbar-item is--brand" v-if="homeScreenLoading">
                <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
            </a>
        </div>
        <h1 class="w3-xxxlarge" v-if="homeScreenLoading && !homeScreenInitialized"> {{initHomeMain()}} </h1>
      </div>
    </section>
    <FightBetTable
      v-if="!fightLoading"
      :boutInfo="betData"
    />
    <HomeWrapper

    />
  </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import FightBetTable from '@/components/Fight/FightBetTable.vue'
import HomeWrapper from '@/components/Home/HomeWrapper.vue'

export default {
    name: 'home',
    components: {
        FightBetTable, HomeWrapper
    },
    data () {
        return {
            homeScreenLoading: true,
            homeScreenInitialized: false,
            selectedFightId: null,
            selectedFightName: '',
            selectedFightDate: '',
            fightLoading: true,
            betData: []
        }
    },
    methods: {
        initHomeMain () {
            this.homeScreenInitialized = true
            ApiService.getRecentFights()
                .then(
                fights => {
                    this.fightScreenFights = fights['response']//.slice(1, fights.length)
                    this.selectedFightId = this.fightScreenFights[0].fightId
                    this.selectedFightName = this.fightScreenFights[0].fightName
                    this.selectedFightDate = this.fightScreenFights[0].fightDate
                    this.getBetsFromFightData()
                }
                ).catch(error => console.log(error))
                .finally(
                    () => {
                        this.homeScreenLoading = false
                    }
                )
            console.log('init fights page')
        },
        convToDate (rawDate) {
            var date = new Date(rawDate)
            return date.toLocaleDateString()
        },
        getBetsFromFightData () {
            this.fightLoading = true
            ApiService.getBetsFromFight(this.selectedFightId)
                .then(
                bets => {
                    this.betData = bets['response']
                }
                ).catch(error => console.log(error))
                .finally(
                    () => { 
                        this.fightLoading = false 
                        }
                )
        }
  }
}
</script>