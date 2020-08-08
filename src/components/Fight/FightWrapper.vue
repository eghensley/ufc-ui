<template>
  <div class="nextFight">
    <section v-if="fightLoading" class="hero is-info is-small" id="loadingRibbon">
      <div class="container">
        <h1 class="title"> Loading ... </h1>
        <a class="navbar-item is--brand">
          <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
        </a>
        <h1 class="w3-xxxlarge" v-if="fightLoading"> {{initFightPage()}} </h1>
      </div>
    </section>

    <FightTiles
      v-if="!fightLoading"
      :fightLocation="boutData['location']"
    />

    <FightBetTable
      v-if="!fightLoading"
      :boutInfo="betData"
      :future="isFutureFight"
      :totalBet="totBet"
      :totalResult="totResult"
    />

    <div v-if="!fightLoading" class="columns">
      <FightBoutTable
        :boutList="boutData['bouts']"
        :selBout="selectedBout"
        @switch="changeBout"
      />
      <FightBoutWrapper
        v-if="fighter1EloLoaded && fighter2EloLoaded"
        :selectedBoutInfo="selectedBout"
        :eloDataSeries="eloSeries"
        :showEloChart="eloChartReady"
      />
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import FightTiles from '@/components/Fight/FightTiles.vue'
import FightBetTable from '@/components/Fight/FightBetTable.vue'
import FightBoutTable from '@/components/Fight/FightBoutTable.vue'
import FightBoutWrapper from '@/components/Fight/Bout/FightBoutWrapper.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightWrapper',
    components: {
        FightTiles, FightBetTable, FightBoutTable, FightBoutWrapper
    },
    props: {
        fightId: {type: String, default: 'dde70a112e053a6c'}
    },
    watch: { 
        fightId: function() { // watch it
            this.fightLoading = true
            this.totResult = 0
            this.totBet = 0
        }
    },
    data () {
        return {
        fightLoading: true,
        fightOid: null,
        boutData: {},
        betData: [],
        selectedBout: {},
        eloSeries: [
            {
                name: 'Fighter 1',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: 'Fighter 2',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
            }
        ],
        fighter1EloLoaded: false,
        fighter2EloLoaded: false,
        eloChartReady: false,
        fighter1Elo: {},
        fighter2Elo: {},
        isFutureFight: true,
        totBet: 0,
        totResult: 0
        }
    },
    methods: {
        initFightPage () {
            this.getBoutsFromFightData()
            this.getBetsFromFightData()
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
        standardizeElo (val, idx) {
            // if (idx === 0) {
            //     val /= 0.0904132486198668
            // } else if (idx === 1) {
            //     val /= 0.91567115525423
            // } else if (idx === 2) {
            //     val /= 0.0513865870621742
            // } else if (idx === 3) {
            //     val /= 0.952223713796887
            // } else if (idx === 4) {
            //     val /= 0.0657570703407838
            // } else if (idx === 5) {
            //     val /= 0.048189049780901
            // } else if (idx === 6) {
            //     val /= 0.0912629429440298
            // } else if (idx === 7) {
            //     val /= 0.397719813625663
            // }
            idx += 0
            return val + idx - idx
        },
        getBetsFromFightData () {
            if (this.isFutureFight) {
                ApiService.getBetsFromFight(this.fightId)
                    .then(
                    bets => {
                        this.betData = bets['response']
                        var i;
                        for (i = 0; i < this.betData.length; i++) {
                            this.totBet += this.betData[i]['wagerWeight']
                        }
                    }
                    ).catch(error => console.log(error))           
            } else {
                ApiService.getBetsFromPastFight(this.fightId)
                    .then(
                    bets => {
                        this.betData = bets['response']
                        var i;
                        for (i = 0; i < this.betData.length; i++) {
                            this.totBet += this.betData[i]['wagerWeight']
                            this.totResult += this.betData[i]['betResult']
                        }
                    }
                    ).catch(error => console.log(error))        
            } 
        },
        getBoutsFromFightData () {
            this.fightLoading = true
            ApiService.getBasicBoutsFromFight(this.fightId)
                .then(
                bouts => {
                    this.boutData = bouts['response']
                    this.isFutureFight = this.evalIfFightInFuture(this.boutData.fightDate)
                    this.selectedBout = bouts['response']['bouts'][0]
                    this.fightOid = bouts['response']['oid']
                }
                ).catch(error => console.log(error))
                .finally(
                    () => { 
                        this.fighter1EloLoaded = false
                        this.fighter2EloLoaded = false
                        this.eloChartReady = false
                        this.getFirstFighterElo(this.selectedBout['fighterBoutXRefs'][0]['fighter']['oid'], this.selectedBout['fighterBoutXRefs'][1]['fighter']['oid'])
                        this.fightLoading = false 
                        }
                )
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        getFirstFighterElo (fighterOid1, fighterOid2) {
            ApiService.getFighterEloStats(fighterOid1, this.fightOid)
                .then(
                    fighterStats => {
                        this.fighter1Elo = fighterStats['response']
                        this.eloSeries[0]['name'] = this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName']
                        this.eloSeries[0]['data'] = [fighterStats['response']['offStrikeEloPost'], fighterStats['response']['defStrikeEloPost'], fighterStats['response']['offGrapplingEloPost'], fighterStats['response']['defGrapplingEloPost'], fighterStats['response']['powerStrikeEloPost'], fighterStats['response']['chinStrikeEloPost'], fighterStats['response']['subGrapplingEloPost'], fighterStats['response']['evasGrapplingEloPost']]                        
                        this.fighter1EloLoaded = true
                    }
                ).finally (
                    () => {
                        this.getSecondFighterElo(fighterOid2)
                    }
                )
        },
        getSecondFighterElo (fighterOid) {
            ApiService.getFighterEloStats(fighterOid, this.fightOid)
                .then(
                    fighterStats => {
                        this.fighter2Elo = fighterStats['response']
                        this.eloSeries[1]['name'] = this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName']
                        this.eloSeries[1]['data'] = [fighterStats['response']['offStrikeEloPost'], fighterStats['response']['defStrikeEloPost'], fighterStats['response']['offGrapplingEloPost'], fighterStats['response']['defGrapplingEloPost'], fighterStats['response']['powerStrikeEloPost'], fighterStats['response']['chinStrikeEloPost'], fighterStats['response']['subGrapplingEloPost'], fighterStats['response']['evasGrapplingEloPost']]
                    }
                ).finally(
                    () => {
                        var i
                        var toLoad = true
                        for (i = 0; i < 8; i++) {
                            if (this.eloSeries[0]['data'][i] === null || this.eloSeries[1]['data'][i] === null) {
                                toLoad = false
                                break
                            }
                            if (this.eloSeries[0]['data'][i] > this.eloSeries[1]['data'][i]) {
                                this.eloSeries[0]['data'][i] = (this.standardizeElo(this.eloSeries[0]['data'][i] - this.eloSeries[1]['data'][i], i)) * -1
                                this.eloSeries[1]['data'][i] = 0
                            } else {
                                this.eloSeries[1]['data'][i] = this.standardizeElo(this.eloSeries[1]['data'][i] - this.eloSeries[0]['data'][i], i)
                                this.eloSeries[0]['data'][i] = 0
                            }
                        }      
                        this.eloChartReady = toLoad     
                        this.fighter2EloLoaded = true             
                    }
                )
        },
        changeBout (boutInfo) {
            this.eloSeries = [{
                name: 'Fighter 1',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Fighter 2',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }]
            this.fighter1EloLoaded = false
            this.fighter2EloLoaded = false
            this.selectedBout = boutInfo
            this.eloChartReady = false
            this.getFirstFighterElo(this.selectedBout['fighterBoutXRefs'][0]['fighter']['oid'], this.selectedBout['fighterBoutXRefs'][1]['fighter']['oid'])
        }
    }
}
</script>