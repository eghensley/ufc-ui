<template>
  <div class="nextFight">
        <!-- <section class="container">
            <FightDropdown
                :pastFightMetaList="fightMetaList"
                :curFightId="fightId"
                :curFightName="fightName"
                @switchFight="newFight"
            />
            <FightBoutTable
                :boutList="boutData['bouts']"
                :selBout="selectedBout"
                @switch="changeBout"
                :boutName="selectedBoutName"
                :curBoutId="selectedBoutId"
            />
        </section> -->
        <section class="container">
            <div class="columns">

                <main class="column main">
                    <section v-if="fightLoading" class="hero is-info is-small" id="loadingRibbon">
                        <div class="container">
                            <h1 class="title"> Loading ... </h1>
                            <a class="navbar-item is--brand">
                                <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                            </a>
                            <h1 class="w3-xxxlarge" v-if="fightLoading"> {{initFightPage()}} </h1>
                        </div>
                    </section>
                    <FightInfo
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
                    
                    <FightBoutWrapper
                        :selectedBoutInfo="selectedBout"
                        :isFuture="isFutureFight"
                    />

                    <FightBoutBar
                        :eloDataSeries="eloSeries"
                        :showEloChart="eloChartReady"
                        :isFuture="isFutureFight"
                    />

                    <FightBoutRadar
                        :boutRankSeries="selectedBoutRankSeries"
                        :showRankChart="rankChartReady"
                        :isFuture="isFutureFight"
                    />

                    <FightBoutChangeBar
                        :v-if="!isFutureFight"
                        :eloChangeDataSeries="eloChangeSeries"
                        :showChangeElo="eloChangeChartReady"
                        :isFuture="isFutureFight"
                    />

                </main>
            </div>
        </section>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import FightBetTable from '@/components/Fight/FightBetTable.vue'
import FightBoutTable from '@/components/Fight/FightBoutTable.vue'
import FightBoutAside from '@/components/Fight/FightBoutAside.vue'
import FightBoutWrapper from '@/components/Fight/Bout/FightBoutWrapper.vue'
import FightBoutRadar from '@/components/Fight/Bout/FightBoutRadar.vue'
import FightBoutBar from '@/components/Fight/Bout/FightBoutBar.vue'
import FightInfo from '@/components/Fight/FightInfo.vue'
import FightBoutChangeBar from '@/components/Fight/Bout/FightBoutChangeBar.vue'

import FightDropdown from '@/components/FightDropdown.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightWrapper',
    components: {
        FightBetTable, FightBoutTable, FightBoutAside, FightBoutWrapper, FightDropdown, FightBoutRadar, FightBoutBar, FightInfo, FightBoutChangeBar
    },
    props: {
        fightId: {type: String, default: 'dde70a112e053a6c'},
        fightName: {type: String, default: ''},
        fightMetaList: {type: Array, default: function () { return []}}
    },
    watch: { 
        fightId: function() { // watch it
            this.fightLoading = true
            this.rankChartReady = false
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
            eloChangeSeries: [
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
            fighter1EloChangeLoaded: false,
            fighter2EloChangeLoaded: false,
            eloChartReady: false,
            eloChangeChartReady: false,
            rankChartReady: false,
            fighter1Elo: {},
            fighter2Elo: {},
            selectedBoutName: '',
            abbrevBoutName: '',
            selectedBoutId: '',
            isFutureFight: true,
            totBet: 0,
            totResult: 0,
            selectedBoutRankSeries: [
                {
                    name: 'Fighter 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Fighter 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
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
        getBoutsFromFightData () {
            this.fightLoading = true
            ApiService.getBasicBoutsFromFight(this.fightId)
                .then(
                bouts => {
                    this.boutData = bouts['response']
                    this.isFutureFight = this.evalIfFightInFuture(this.boutData.fightDate)
                    this.selectedBout = bouts['response']['bouts'][0]
                    this.selectedBoutName = this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName'] + ' VS '+ this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName']
                    this.abbrevBoutName = this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName'].split(' ')[this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName'].split(' ').length -1] + ' vs '+ this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName'].split(' ')[this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName'].split(' ').length - 1]
                    this.selectedBoutId = this.selectedBout.boutId
                    if (this.isFutureFight) {
                        this.pullFighterWcRanking()
                    }
                    this.fightOid = bouts['response']['oid']
                }
                ).catch(error => console.log(error))
                .finally(
                    () => { 
                            this.fighter1EloLoaded = false
                            this.fighter2EloLoaded = false
                            this.eloChartReady = false
                            this.getFirstFighterElo(this.selectedBout['fighterBoutXRefs'][0]['fighter']['oid'], this.selectedBout['fighterBoutXRefs'][1]['fighter']['oid'])
                            if (!this.isFutureFight) {
                                this.eloChangeSeries = [
                                    {
                                        name: 'Fighter 1',
                                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                                    },
                                    {
                                        name: 'Fighter 2',
                                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                                    }
                                ]
                                this.getFirstFighterEloChange(this.selectedBout['fighterBoutXRefs'][0]['fighter']['oid'], this.selectedBout['fighterBoutXRefs'][1]['fighter']['oid'])
                            }
                            this.fightLoading = false 
                        }
                )
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        calcPercChange(x1, x2) {
            return this.round(((x2-x1)/x1) * 100)
        },
        getSecondFighterEloChange (fighterOid2) {
            ApiService.getFighterFightEloStats(fighterOid2, this.fightOid)
                .then(
                    fighterStats => {
                        this.fighter1Elo = fighterStats['response']
                        this.eloChangeSeries[1]['name'] = this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName']
                        this.eloChangeSeries[1]['data'] = [this.calcPercChange(fighterStats['response']['offStrikeEloPre'], fighterStats['response']['offStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defStrikeEloPre'], fighterStats['response']['defStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['offGrapplingEloPre'], fighterStats['response']['offGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defGrapplingEloPre'], fighterStats['response']['defGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['powerStrikeEloPre'], fighterStats['response']['powerStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['chinStrikeEloPre'], fighterStats['response']['chinStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['subGrapplingEloPre'], fighterStats['response']['subGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['evasGrapplingEloPre'], fighterStats['response']['evasGrapplingEloPost'])
                                                           ]                        
                        this.fighter2EloChangeLoaded = true
                    }
                ).finally (
                    () => {
                        this.eloChangeChartReady = true
                    }
                )
        },
        getFirstFighterEloChange (fighterOid1, fighterOid2) {
            ApiService.getFighterFightEloStats(fighterOid1, this.fightOid)
                .then(
                    fighterStats => {
                        this.fighter1Elo = fighterStats['response']
                        this.eloChangeSeries[0]['name'] = this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName']
                        this.eloChangeSeries[0]['data'] = [this.calcPercChange(fighterStats['response']['offStrikeEloPre'], fighterStats['response']['offStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defStrikeEloPre'], fighterStats['response']['defStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['offGrapplingEloPre'], fighterStats['response']['offGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defGrapplingEloPre'], fighterStats['response']['defGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['powerStrikeEloPre'], fighterStats['response']['powerStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['chinStrikeEloPre'], fighterStats['response']['chinStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['subGrapplingEloPre'], fighterStats['response']['subGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['evasGrapplingEloPre'], fighterStats['response']['evasGrapplingEloPost'])
                                                           ]                        
                        this.fighter1EloChangeLoaded = true
                    }
                ).finally (
                    () => {
                        this.getSecondFighterEloChange (fighterOid2)
                    }
                )
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
        pullSecondFighterWcRanking () {
            var toLoad = true
            ApiService.getWeightClassFighterRanking(this.selectedBout.weightClass, this.selectedBout['fighterBoutXRefs'][1]['fighter']['oid'])
                .then(
                    fighterRank2 => {
                        if ('response' in fighterRank2) {
                            this.selectedBoutRankSeries[1] = {name: fighterRank2['response'].name, data: [fighterRank2['response'].offStrike, fighterRank2['response'].defStrike, fighterRank2['response'].offGrapp, fighterRank2['response'].defGrapp, fighterRank2['response'].offKo, fighterRank2['response'].defKo, fighterRank2['response'].offSub, fighterRank2['response'].defSub]}
                        } else {
                            toLoad = false
                        }
                    }
                ).catch(() => {
                        console.log('fighter 2 rank failed')
                        toLoad = false
                    }
                ).finally (
                    () => {
                        this.rankChartReady = toLoad
                    }                    
                )
        },
        pullFighterWcRanking () {
            var toLoad = true
            ApiService.getWeightClassFighterRanking(this.selectedBout.weightClass, this.selectedBout['fighterBoutXRefs'][0]['fighter']['oid'])
                .then(
                    fighterRank1 => {
                            this.selectedBoutRankSeries[0] = {name: fighterRank1['response'].name, data: [fighterRank1['response'].offStrike, fighterRank1['response'].defStrike, fighterRank1['response'].offGrapp, fighterRank1['response'].defGrapp, fighterRank1['response'].offKo, fighterRank1['response'].defKo, fighterRank1['response'].offSub, fighterRank1['response'].defSub]}
                    }
                ).catch(() => {
                    console.log('fighter 1 rank failed')
                    toLoad = false
                    }
                ).finally(
                    () => {
                        if (toLoad) {
                            this.pullSecondFighterWcRanking()
                        } else {
                            this.rankChartReady = false
                        }
                    }
                )
        },
        changeBout (boutInfo) {
            this.eloSeries = [
                {
                    name: 'Fighter 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Fighter 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
            this.eloChangeSeries = [
                {
                    name: 'Fighter 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: 'Fighter 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                }
            ]
            this.fighter1EloLoaded = false
            this.fighter2EloLoaded = false
            this.fighter1EloChangeLoaded = false
            this.fighter2EloChangeLoaded = false
            this.rankChartReady = false
            this.eloChangeChartReady = false
            this.selectedBout = boutInfo
            this.selectedBoutName = this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName'] + ' VS '+ this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName']
            this.abbrevBoutName = this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName'].split(' ')[this.selectedBout['fighterBoutXRefs'][0]['fighter']['fighterName'].split(' ').length -1] + ' vs '+ this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName'].split(' ')[this.selectedBout['fighterBoutXRefs'][1]['fighter']['fighterName'].split(' ').length - 1]
            this.selectedBoutId = this.selectedBout.boutId
            if (this.isFutureFight) {
                this.selectedBoutRankSeries = [
                    {
                        name: 'Fighter 1',
                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        name: 'Fighter 2',
                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ],
                
                this.pullFighterWcRanking()
            } else {
                this.getFirstFighterEloChange(this.selectedBout['fighterBoutXRefs'][0]['fighter']['oid'], this.selectedBout['fighterBoutXRefs'][1]['fighter']['oid'])
            }

            this.eloChartReady = false
            this.getFirstFighterElo(this.selectedBout['fighterBoutXRefs'][0]['fighter']['oid'], this.selectedBout['fighterBoutXRefs'][1]['fighter']['oid'])
        },
        newFight (newFightId) {
            this.$emit('newFightId', newFightId)
        },
        abbrevFightName () {
            return this.fightName.split(':')[1]
        },
    convToDate (rawDate) {
        var rawDateComps = rawDate.split('T')[0].split('-')
        var date = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1]), parseInt(rawDateComps[2])) 
        // var date = Date.parse(.replace())//.replace('T', ''))
        return date.toLocaleDateString()
    }
    }
}
</script>