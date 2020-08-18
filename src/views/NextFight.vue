<template>
  <div class="container">
    <h1 v-if="fightScreenLoading && !fightScreenInitialized"> {{initFightMain()}} </h1>
    <section class="section">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li>
                <router-link to="/">
                    Bet UFC
                </router-link>
            </li>

            <li v-bind:class="{ 'is-active': !fightSelected }">
                <a @click="resetSelectedFight()">Fights</a>
            </li>

            <li class="is-hidden-mobile" v-if="fightSelected" v-bind:class="{'is-active': !boutSelected}">
                <a @click="resetSelectedBout()">{{selectedFightName}}</a>
            </li>

            <li class="is-hidden-tablet is-hidden-widescreen" v-if="fightSelected" v-bind:class="{'is-active': !boutSelected}">
                <a @click="resetSelectedBout()">{{abbrevFightName}}</a>
            </li>
            
            <li class="is-hidden-mobile is-active" v-if="boutSelected">
                <a>{{selectedBoutName}}</a>
            </li>

            <li class="is-hidden-tablet is-hidden-widescreen is-active" v-if="boutSelected">
                <a>{{abbrevBoutName}}</a>
            </li>
        </ul>
      </nav>
      <section class="container">
          <div class="columns">
              <aside class="column is-one-fifth aside is-hidden-mobile">
                <FightBoutAside
                    v-if="!fightScreenLoading"
                    :pastFightMetaList="fightScreenFights"
                    :boutList="fightBouts"
                    @switchBout="switchFightScreenBout"
                    @switchFight="switchFightScreenFight"
                    :curFightId="selectedFightId"
                    :curBoutId="selectedBoutId"
                />
              </aside>
              <main class="column main">
                  <FightLandingHeader
                    :selectedFightName="selectedFightName"
                    :selectedFightDate="selectedFightDate"
                    :fightSelected="fightSelected"
                  />
                  <br>
                  <FightDropdown
                      :pastFightMetaList="fightScreenFights"
                      :curFightId="selectedFightId"
                      :curFightName="selectedFightName"
                      @switchFight="switchFightScreenFight"
                  />
                  <FightBetTable
                      :future="isFutureFight"
                      :fightId="selectedFightId"
                      :fightSelected="fightSelected"
                  />

                  <FightBoutDropdown
                      v-if="fightSelected"
                      :boutList="fightBouts"
                      :selBoutId="selectedBoutId"
                      @switchBout="switchFightScreenBout"
                  />

                  <FightBoutWrapper
                      v-if="boutSelected"
                      :selectedBoutDetails="selectedBoutDetails"
                      :selectedBoutInfo="selectedBoutInfo"
                      :isFuture="isFutureFight"
                      :directEloBarReady="eloBar.eloChartReady"
                      :relEloRadarReady="eloRadar.eloRadarChartReady"
                      :changeEloBarReady="eloChange.eloChartReady"
                      :boutModelBarReady="boutModel.eloChartReady"
                      @displayDirectEloBarModal="openDirectEloBarModal"
                      @displayRelEloRadarModal="openRelEloRadarModal"
                      @displayChangeEloBarModal="openChangeEloBarModal"
                      @displayBoutModelBarModal="openBoutModelModal"
                  />

                  <FightBoutBar
                      v-if="eloBar.showDirectEloBarModal"
                      :eloDataSeries="eloBar.eloSeries"
                      :showEloChart="eloBar.eloChartReady"
                      :isFuture="isFutureFight"
                      @closeDirectEloModal="closeDirectEloBarModal"
                  />

                  <FightBoutRadar
                      v-if="eloRadar.showRelEloRankModal"
                      :boutRankSeries="eloRadar.eloSeries"
                      :showRankChart="eloRadar.eloRadarChartReady"
                      :isFuture="isFutureFight"
                      @closeRelEloModal="closeRelEloRadarModal"
                  />

                  <FightBoutChangeBar
                      v-if="eloChange.showEloChangeModal"
                      :eloChangeDataSeries="eloChange.eloSeries"
                      :showChangeElo="eloChange.eloChartReady"
                      :isFuture="isFutureFight"
                      @closeEloChangeModal="closeChangeEloBarModal"
                  />

                  <FightBoutModelBar
                      v-if="boutModel.showBoutModelModal"
                      :showBoutModelChart="boutModel.eloChartReady"
                      :isFuture="isFutureFight"
                      :modelBoutDataSeries="boutModel.eloSeries"
                      :modelColumns="boutModel.statCols"
                      @closeBoutModelModal="closeBoutModelModal"
                  />
              </main>
          </div>
      </section>
    </section>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import FightBoutAside from '@/components/Fight/FightBoutAside.vue'
import FightLandingHeader from '@/components/Fight/FightLandingHeader.vue'
import FightBetTable from '@/components/Fight/FightBetTable.vue'
import FightDropdown from '@/components/FightDropdown.vue'
import FightBoutDropdown from '@/components/Fight/Bout/FightBoutDropdown.vue'
import FightBoutWrapper from '@/components/Fight/Bout/FightBoutWrapper.vue'
import FightBoutBar from '@/components/Fight/Bout/FightBoutBar.vue'
import FightBoutRadar from '@/components/Fight/Bout/FightBoutRadar.vue'
import FightBoutChangeBar from '@/components/Fight/Bout/FightBoutChangeBar.vue'
import FightBoutModelBar from '@/components/Fight/Bout/FightBoutModelBar.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})


export default {
    name: 'fight',
    components: {
      FightBoutAside, FightLandingHeader, FightBetTable, FightDropdown, FightBoutDropdown, FightBoutWrapper, FightBoutBar, FightBoutRadar, FightBoutChangeBar, FightBoutModelBar
    },
    data () {
      return {
        fightScreenLoading: true,
        fightScreenInitialized: false,
        selectedFightId: null,
        selectedFightOid: null,
        selectedFightName: '',
        fightSelected: false,
        abbrevFightName: '',
        selectedFightDate: '',
        fightScreenFights: [],
        fightScreenSummaries: {},
        selectedBoutId: '',
        selectedBoutName: '',
        abbrevBoutName: '',
        boutSelected: false,
        fightBouts: [],
        isFutureFight: true,
        selectedBoutInfo: {},
        selectedBoutDetails: {},
        eloBar:{
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
          eloChartReady: true,
          showDirectEloBarModal: false
        },
        eloRadar: {
          eloSeries: [
                {
                    name: 'Fighter 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Fighter 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
          eloRadarChartReady: true,
          showRelEloRankModal: false
        },
        eloChange: {
          eloSeries: [
                {
                    name: 'Fighter 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Fighter 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
          eloChartReady: true,
          showEloChangeModal: false
        },
        boutModel: {
          eloSeries: [
                {
                    name: 'Fighter 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Fighter 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
          eloChartReady: true,
          showBoutModelModal: false,
          statCols: [],
        }
      }
    },
    methods: {
        initFightMain () {
          this.fightScreenInitialized = true
          ApiService.getRecentFights()
              .then(
                fights => {
                    this.fightScreenFights = fights['response']//.slice(1, fights.length)
                    var i = 0
                    for (i = 0; i < this.fightScreenFights.length; i++) {
                      this.fightScreenSummaries[this.fightScreenFights[i]['fightId']] = {'fightName': this.fightScreenFights[i]['fightName'], 'fightDate': this.fightScreenFights[i]['fightDate'], 'oid': this.fightScreenFights[i]['oid']}
                    }
                }
              ).catch(error => console.log(error))
              .finally(
                  () => {
                      this.fightScreenLoading = false
                  }
              )
        },
        initBoutDetails () {
          ApiService.getBoutInfo(this.selectedBoutId)
            .then(
              bout => {
                this.selectedBoutDetails = bout['response']
              }
            )
        },
        switchFightScreenFight (newFightId) {
            this.fightBouts = []
            this.resetSelectedBout()
            this.selectedFightId = newFightId
            this.selectedFightOid = this.fightScreenSummaries[this.selectedFightId].oid
            this.selectedFightName = this.fightScreenSummaries[this.selectedFightId].fightName
            this.abbrevFightName = this.selectedFightName.split(':')[1]
            this.selectedFightDate = this.fightScreenSummaries[this.selectedFightId].fightDate
            this.isFutureFight = this.evalIfFightInFuture(this.selectedFightDate)
            this.fightSelected = true
            this.getBoutsFromFightData()
        },
        switchFightScreenBout (newBout) {
          this.selectedBoutId = newBout.boutId
          this.eloBar.eloChartReady = false
          this.eloRadar.eloRadarChartReady = false
          this.eloChange.eloChartReady = false
          this.boutModel.eloChartReady = false
          this.boutModel.statCols = []
          this.boutModel.eloSeries = []
          this.initBoutDetails()
          this.getModelBoutExplainability()
          this.getFirstFighterElo(newBout['fighterBoutXRefs'][0]['fighter']['oid'], newBout['fighterBoutXRefs'][1]['fighter']['oid'])
          this.selectedBoutInfo = newBout
          if (this.isFutureFight) {
            this.eloRadar.eloSeries = [
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
            this.eloChange.eloSeries = [                {
                    name: 'Fighter 1',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: 'Fighter 2',
                    data: [0, 0, 0, 0, 0, 0, 0, 0],
                }
            ]
            this.getFirstFighterEloChange(this.selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['oid'], this.selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['oid'])
          }
          this.selectedBoutName = newBout['fighterBoutXRefs'][0]['fighter']['fighterName'] + ' VS '+ newBout['fighterBoutXRefs'][1]['fighter']['fighterName']
          this.abbrevBoutName = newBout['fighterBoutXRefs'][0]['fighter']['fighterName'].split(' ')[newBout['fighterBoutXRefs'][0]['fighter']['fighterName'].split(' ').length -1] + ' vs '+ newBout['fighterBoutXRefs'][1]['fighter']['fighterName'].split(' ')[newBout['fighterBoutXRefs'][1]['fighter']['fighterName'].split(' ').length - 1]
          this.boutSelected = true
        },
        resetSelectedFight () {
            this.fightBouts = []
            this.resetSelectedBout()
            this.selectedFightId = ''
            this.selectedFightName = ''
            this.selectedFightOid = ''
            this.selectedFightDate = ''
            this.fightSelected = false
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
        getBoutsFromFightData () {
            this.fightLoading = true
            ApiService.getBasicBoutsFromFight(this.selectedFightId)
                .then(
                  bouts => {
                      this.fightBouts = bouts['response'].bouts
                  }
                ).catch(error => console.log(error))
                .finally(
                    () => { 
                            this.fightLoading = false
                        }
                )
        },
        resetSelectedBout () {
            if (this.boutSelected) {
              this.boutSelected = false
              this.selectedBoutName = ''
              this.selectedBoutId = ''
              this.abbrevBoutName = ''
              this.selectedBoutDetails = {}
              this.selectedBoutInfo = {}
           }
        },
        closeDirectEloBarModal () {
          this.eloBar.showDirectEloBarModal = false
        },
        openDirectEloBarModal () {
          if (this.eloBar.eloChartReady){
            this.eloBar.showDirectEloBarModal = true
          }
        },
        closeBoutModelModal () {
            this.boutModel.showBoutModelModal = false
        },
        openBoutModelModal () {
          if (this.boutModel.eloChartReady){
            this.boutModel.showBoutModelModal = true
          }
        },
        closeChangeEloBarModal () {
          this.eloChange.showEloChangeModal = false
        },
        openChangeEloBarModal () {
          if (this.eloChange.eloChartReady){
            this.eloChange.showEloChangeModal = true
          }
        },
        closeRelEloRadarModal () {
          this.eloRadar.showRelEloRankModal = false
        },
        openRelEloRadarModal () {
          if (this.eloRadar.eloRadarChartReady){
            this.eloRadar.showRelEloRankModal = true
          }
        },
        getModelBoutExplainability () {
            ApiService.getBoutModelExplainability (this.selectedBoutId)
                .then(
                    explainability => {
                        this.boutModel.eloSeries = explainability.response.boutArray
                        this.boutModel.statCols = explainability.response.statCols
                        this.boutModel.eloChartReady = true
                    }
                ).catch(() => {
                        console.log('bout explainability failed')
                        this.boutModel.eloChartReady = false
                    }
                )
        },
        getFirstFighterElo (fighterOid1, fighterOid2) {
            ApiService.getFighterEloStats(fighterOid1, this.selectedFightOid)
                .then(
                    fighterStats => {
                        this.fighter1Elo = fighterStats['response']
                        this.eloBar.eloSeries[0]['name'] = this.selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['fighterName']
                        this.eloBar.eloSeries[0]['data'] = [fighterStats['response']['offStrikeEloPost'], fighterStats['response']['defStrikeEloPost'], fighterStats['response']['offGrapplingEloPost'], fighterStats['response']['defGrapplingEloPost'], fighterStats['response']['powerStrikeEloPost'], fighterStats['response']['chinStrikeEloPost'], fighterStats['response']['subGrapplingEloPost'], fighterStats['response']['evasGrapplingEloPost']]                        
                    }
                ).finally (
                    () => {
                        this.getSecondFighterElo(fighterOid2)
                    }
                )
        },
        getSecondFighterElo (fighterOid) {
            ApiService.getFighterEloStats(fighterOid, this.selectedFightOid)
                .then(
                    fighterStats => {
                        this.fighter2Elo = fighterStats['response']
                        this.eloBar.eloSeries[1]['name'] = this.selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['fighterName']
                        this.eloBar.eloSeries[1]['data'] = [fighterStats['response']['offStrikeEloPost'], fighterStats['response']['defStrikeEloPost'], fighterStats['response']['offGrapplingEloPost'], fighterStats['response']['defGrapplingEloPost'], fighterStats['response']['powerStrikeEloPost'], fighterStats['response']['chinStrikeEloPost'], fighterStats['response']['subGrapplingEloPost'], fighterStats['response']['evasGrapplingEloPost']]
                    }
                ).finally(
                    () => {
                        var i
                        var toLoad = true
                        for (i = 0; i < 8; i++) {
                            if (this.eloBar.eloSeries[0]['data'][i] === null || this.eloBar.eloSeries[1]['data'][i] === null) {
                                toLoad = false
                                break
                            }
                            if (this.eloBar.eloSeries[0]['data'][i] > this.eloBar.eloSeries[1]['data'][i]) {
                                this.eloBar.eloSeries[0]['data'][i] = (this.eloBar.eloSeries[0]['data'][i] - this.eloBar.eloSeries[1]['data'][i]) * -1
                                this.eloBar.eloSeries[1]['data'][i] = 0
                            } else {
                                this.eloBar.eloSeries[1]['data'][i] = this.eloBar.eloSeries[1]['data'][i] - this.eloBar.eloSeries[0]['data'][i]
                                this.eloBar.eloSeries[0]['data'][i] = 0
                            }
                        }      
                        this.eloBar.eloChartReady = toLoad  
                    }
                )
        },
        pullSecondFighterWcRanking () {
            var toLoad = true
            ApiService.getWeightClassFighterRanking(this.selectedBoutInfo.weightClass, this.selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['oid'])
                .then(
                    fighterRank2 => {
                        if ('response' in fighterRank2) {
                            this.eloRadar.eloSeries[1] = {name: fighterRank2['response'].name, data: [fighterRank2['response'].offStrike, fighterRank2['response'].defStrike, fighterRank2['response'].offGrapp, fighterRank2['response'].defGrapp, fighterRank2['response'].offKo, fighterRank2['response'].defKo, fighterRank2['response'].offSub, fighterRank2['response'].defSub]}
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
                        this.eloRadar.eloRadarChartReady = toLoad
                    }                    
                )
        },
        pullFighterWcRanking () {
            var toLoad = true
            ApiService.getWeightClassFighterRanking(this.selectedBoutInfo.weightClass, this.selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['oid'])
                .then(
                    fighterRank1 => {
                            this.eloRadar.eloSeries[0] = {name: fighterRank1['response'].name, data: [fighterRank1['response'].offStrike, fighterRank1['response'].defStrike, fighterRank1['response'].offGrapp, fighterRank1['response'].defGrapp, fighterRank1['response'].offKo, fighterRank1['response'].defKo, fighterRank1['response'].offSub, fighterRank1['response'].defSub]}
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
                            this.eloRadar.eloRadarChartReady = false
                        }
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
            ApiService.getFighterFightEloStats(fighterOid2, this.selectedFightOid)
                .then(
                    fighterStats => {
                        this.eloChange.eloSeries[1]['name'] = this.selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['fighterName']
                        this.eloChange.eloSeries[1]['data'] = [this.calcPercChange(fighterStats['response']['offStrikeEloPre'], fighterStats['response']['offStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defStrikeEloPre'], fighterStats['response']['defStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['offGrapplingEloPre'], fighterStats['response']['offGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defGrapplingEloPre'], fighterStats['response']['defGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['powerStrikeEloPre'], fighterStats['response']['powerStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['chinStrikeEloPre'], fighterStats['response']['chinStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['subGrapplingEloPre'], fighterStats['response']['subGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['evasGrapplingEloPre'], fighterStats['response']['evasGrapplingEloPost'])
                                                           ]                        
                    }
                ).finally (
                    () => {
                        this.eloChange.eloChartReady = true
                    }
                )
        },
        getFirstFighterEloChange (fighterOid1, fighterOid2) {
            ApiService.getFighterFightEloStats(fighterOid1, this.selectedFightOid)
                .then(
                    fighterStats => {
                        this.eloChange.eloSeries[0]['name'] = this.selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['fighterName']
                        this.eloChange.eloSeries[0]['data'] = [this.calcPercChange(fighterStats['response']['offStrikeEloPre'], fighterStats['response']['offStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defStrikeEloPre'], fighterStats['response']['defStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['offGrapplingEloPre'], fighterStats['response']['offGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['defGrapplingEloPre'], fighterStats['response']['defGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['powerStrikeEloPre'], fighterStats['response']['powerStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['chinStrikeEloPre'], fighterStats['response']['chinStrikeEloPost']),
                                                           this.calcPercChange(fighterStats['response']['subGrapplingEloPre'], fighterStats['response']['subGrapplingEloPost']),
                                                           this.calcPercChange(fighterStats['response']['evasGrapplingEloPre'], fighterStats['response']['evasGrapplingEloPost'])
                                                           ]                        
                    }
                ).finally (
                    () => {
                        this.getSecondFighterEloChange (fighterOid2)
                    }
                )
        },
    }
}
</script>
