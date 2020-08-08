<template>
  <div class="container">
    <section class="hero is-info welcome is-small" id="myHeader">
      <div class="hero-body">
        <div class="container">
            <h2 class="title" v-if="!homeScreenLoading && fightInFuture"> Upcoming Fight </h2>
            <h2 class="title" v-if="!homeScreenLoading && !fightInFuture"> Most Recent Fight </h2>
            <h2 class="subtitle" v-if="!homeScreenLoading"> {{ selectedFightName }} </h2>
            <h2 class="subtitle" v-if="!homeScreenLoading"> {{ convToDate(selectedFightDate) }} </h2>

            <h1 class="title" v-if="homeScreenLoading"> Loading ... </h1>
            <a class="navbar-item is--brand" v-if="homeScreenLoading">
                <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
            </a>
        </div>
        <h1 class="w3-xxxlarge" v-if="homeScreenLoading && !homeScreenInitialized"> {{initHomeMain()}} </h1>
      </div>
    </section>

    <!-- <section class="container">

    </section> -->

    <FightBetTable
      v-if="!fightLoading"
      :boutInfo="betData"
      :future="fightInFuture"
      :totalBet="totBet"
      :totalResult="totResult"
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
            fightInFuture: true,
            betData: [],
            totBet: 0,
            totResult: 0
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
                    this.fightInFuture = this.evalIfFightInFuture(this.selectedFightDate)
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
            var rawDateComps = rawDate.split('T')[0].split('-')
            var date = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1]), parseInt(rawDateComps[2])) 
            // var date = Date.parse(.replace())//.replace('T', ''))
            return date.toLocaleDateString()
        },
        getBetsFromFightData () {
            this.fightLoading = true
            if (this.fightInFuture) {
                ApiService.getBetsFromFight(this.selectedFightId)
                    .then(
                    bets => {
                        this.betData = bets['response']
                        var i;
                        for (i = 0; i < this.betData.length; i++) {
                            this.totBet += this.betData[i]['wagerWeight']
                        }
                    }
                    ).catch(error => console.log(error)).finally(
                    () => { 
                        this.fightLoading = false 
                        }
                )           
            } else {
                ApiService.getBetsFromPastFight(this.selectedFightId)
                    .then(
                    bets => {
                        this.betData = bets['response']
                        var i;
                        for (i = 0; i < this.betData.length; i++) {
                            this.totBet += this.betData[i]['wagerWeight']
                            this.totResult += this.betData[i]['betResult']
                        }
                    }
                    ).catch(error => console.log(error)).finally(
                    () => { 
                        this.fightLoading = false 
                        }
                )     
            } 
        },
        evalIfFightInFuture (fightDate) {
            var rawDateComps = fightDate.split('T')[0].split('-')
            var selectedDate = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1])-1, parseInt(rawDateComps[2]) + 1) 
            var now = new Date();
            now.setHours(0,0,0,0);
            now.setHours(5,0,0,0);
            if (selectedDate < now) {
                return false
            } else {
                return true
            }
        },
  }
}
</script>