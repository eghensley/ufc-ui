<template>
    <div class="card events-card is-shadow-dreamy">

        <header class="card-header is-bevel">
            <p class="card-header-title">
                <!-- <span> -->
                    Bout Information
                    <progress class="progress is-medium is-dark" max="100" v-if="!isLoaded">45%</progress>
                <!-- </span> -->
            </p>
            <h1 v-if="!isLoaded"> {{evalIfLoaded()}} </h1>
            <a class="card-header-icon" v-on:click="toggleBoutStatsVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': (showBoutStats && isLoaded), 'fas fa-chevron-circle-down': !(showBoutStats && isLoaded) }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBoutStats && isLoaded">
            <div class="content">
                <div class="columns">
                    <div class="column">
                        <p class="notification is-shadow-dreamy" v-if="!isFuture">
                            <strong>{{selectedBoutInfo.finishDetails}}</strong>
                        </p>
                        <p class="notification is-shadow-dreamy is-hidden-tablet is-hidden-widescreen">
                            Rounds: <strong>{{ selectedBoutInfo['schedRounds'] }} </strong> <strong v-if="!isFuture"> ({{ selectedBoutDetails['finishRounds'] }} - {{resolveFinishTime()}})</strong>
                            <br>
                            Weight Class: <strong>{{ resolveWeightClass(selectedBoutInfo['weightClass']) }} </strong>
                        </p>
                        <p class="notification is-shadow-dreamy is-hidden-tablet is-hidden-widescreen" v-if="!isFuture && boutDetailsReady">
                            Betting Note: <strong>{{selectedBoutDetails.betInfo.notes}}</strong>
                            <br>
                            Referee: <strong>{{selectedBoutDetails.referee}}</strong>
                            <br>
                            Finish Method: <strong>{{ resolveFinishMethodDict(selectedBoutDetails['finishMethod']) }} </strong>
                        </p>
                        <div class="columns is-hidden-mobile">
                            <div class="column">
                                <p class="notification is-shadow-dreamy"> 
                                    Rounds: <strong>{{ selectedBoutInfo['schedRounds'] }} </strong> <strong v-if="!isFuture"> ({{ selectedBoutDetails['finishRounds'] }} - {{resolveFinishTime()}})</strong>
                                </p>
                            </div>
                            <div class="column">
                                <p class="notification is-shadow-dreamy">
                                    Weight Class: <strong>{{ resolveWeightClass(selectedBoutInfo['weightClass']) }} </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns" v-if="!isFuture && boutDetailsReady">
                    <div class="column is-hidden-mobile">
                        <p class="notification is-shadow-dreamy" v-if="hasNotes">
                            Betting Note: <strong>{{selectedBoutDetails.betInfo.notes}}</strong>
                        </p>
                        <div class="columns">
                            <div class="column">
                                <p class="notification is-shadow-dreamy">
                                    Referee: <strong>{{selectedBoutDetails.referee}}</strong>
                                </p>
                            </div>
                            <div class="column">
                                <p class="notification is-shadow-dreamy">Finish Method: <strong>{{ resolveFinishMethodDict(selectedBoutDetails['finishMethod']) }} </strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <p class="notification is-info is-shadow-sharp">
                            <strong>{{selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['fighterName']}}</strong>
                            <span class="icon is-right" v-if="!isFuture">
                                <!-- <i class="fas fa-dollar-sign" v-if="!isFuture && evalIfBet(selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['fighterName'])"></i> -->
                                <i class="fas fa-check" v-if="evalIfWon(selectedBoutInfo['fighterBoutXRefs'][0])"></i>
                                <i class="fas fa-times" v-if="!evalIfWon(selectedBoutInfo['fighterBoutXRefs'][0])"></i>
                            </span>
                            <span class="icon is-right" v-if="!isFuture && evalIfBet(selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['fighterName'])">
                                <i class="fas fa-dollar-sign"></i>
                            </span>
                        </p>
                        <div class="columns">
                            <div class="column is-hidden-mobile">
                                <p class="notification is-info-dark is-shadow-dreamy"> Vegas Odds: <strong>{{convImpProbToAmerOdds(selectedBoutInfo['fighterBoutXRefs'][0].mlOdds)}} </strong></p>
                            </div>
                            <div class="column is-hidden-mobile">
                                <p class="notification is-info-dark is-shadow-dreamy"> Win Probability: <strong> {{formatWinProb(selectedBoutInfo['fighterBoutXRefs'][0].expOdds)}}</strong></p>
                            </div>

                            <div class="column is-hidden-tablet is-hidden-widescreen">
                                <p class="notification is-info-dark is-shadow-dreamy"> 
                                    Vegas Odds: <strong>{{convImpProbToAmerOdds(selectedBoutInfo['fighterBoutXRefs'][0].mlOdds)}} </strong>
                                    <br>
                                    Win Probability: <strong> {{formatWinProb(selectedBoutInfo['fighterBoutXRefs'][0].expOdds)}}</strong>
                                </p>
                            </div>

                        </div>
                        <FightBoutRoundPerformance
                            v-if="!isFuture && boutDetailsReady"
                            :selectedFighterDetails="selectedBoutDetails['fighterBoutXRefs'][0]"
                            :isFuture="isFuture"
                            :blueCorner="true"
                        />
                    </div>
                    <div class="column">
                        <p class="notification is-danger is-shadow-sharp">
                            <strong>{{selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['fighterName']}}</strong>
                            <span class="icon is-right" v-if="!isFuture">
                                <i class="fas fa-check" v-if="evalIfWon(selectedBoutInfo['fighterBoutXRefs'][1])"></i>
                                <i class="fas fa-times" v-if="!evalIfWon(selectedBoutInfo['fighterBoutXRefs'][1])"></i>
                            </span>
                            <span class="icon is-right" v-if="!isFuture && evalIfBet(selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['fighterName'])">
                                <i class="fas fa-dollar-sign"></i>
                            </span>
                        </p>
                        <div class="columns">
                            <div class="column is-hidden-mobile">
                                <p class="notification is-danger-dark is-shadow-dreamy"> Vegas Odds: <strong>{{convImpProbToAmerOdds(selectedBoutInfo['fighterBoutXRefs'][1].mlOdds)}} </strong></p>
                            </div>
                            <div class="column is-hidden-mobile">
                                <p class="notification is-danger-dark is-shadow-dreamy"> Win Probability: <strong> {{formatWinProb(selectedBoutInfo['fighterBoutXRefs'][1].expOdds)}}</strong></p>
                            </div>
                            <div class="column is-hidden-tablet is-hidden-widescreen">
                                <p class="notification is-danger-dark is-shadow-dreamy"> 
                                    Vegas Odds: <strong>{{convImpProbToAmerOdds(selectedBoutInfo['fighterBoutXRefs'][1].mlOdds)}} </strong>
                                    <br>
                                    Win Probability: <strong> {{formatWinProb(selectedBoutInfo['fighterBoutXRefs'][1].expOdds)}}</strong>
                                </p>
                            </div>
                        </div>
                        <FightBoutRoundPerformance
                            v-if="!isFuture && boutDetailsReady"
                            :selectedFighterDetails="selectedBoutDetails['fighterBoutXRefs'][1]"
                            :isFuture="isFuture"
                            :blueCorner="false"
                        />
                    </div>
                </div>             
            </div>
        </div>
        <footer class="card-footer" v-if="showBoutStats && isLoaded">
            <div class="buttons is-fullwidth">
                <a :disabled="!directEloBarReady" @click="openDirectBarEloModal()" class="button card-footer-item is-primary is-fullwidth">Direct ELO Comparison</a>
                <a :disabled="!relEloRadarReady" @click="openRelRadarEloModal()" class="button is-primary card-footer-item is-fullwidth">Relative ELO Comparison</a>
                <a :disabled="!changeEloBarReady" @click="openChangeBarEloModal()" class="button is-primary card-footer-item is-fullwidth">ELO Change After Fight</a>
            </div>
        </footer>
    </div>
</template>

<script>

var weightClassDict = {
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
    'HW': 'Heavyweight',
    'CW': 'Catch Weight'
}

var finishMethodDict = {
    'KO_TKO': 'Knockout or Technical Knockout',
    'DEC_SPLIT': 'Split Decision',
    'DEC_UNAN': 'Unanimous Decision',
    'SUB': 'Submission',
    'DEC_MAJ': 'Majority Decision',
    'DOC_STOP': 'Doctor\'s Stoppage',
    'OVT': 'Overturned',
    'CNC': 'Could Not Continue',
    'DQ': 'Disqualification'
}

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

import FightBoutRoundPerformance from '@/components/Fight/Bout/FightBoutRoundPerformance.vue'

export default {
    name: 'fightBoutWrapper',
    components: {
        FightBoutRoundPerformance
    },
    props: {
        selectedBoutInfo: {type: Object},
        selectedBoutDetails: {type: Object},
        isFuture: {type: Boolean, default: true},
        directEloBarReady: {type: Boolean, default: false},
        relEloRadarReady: {type: Boolean, default: false},
        changeEloBarReady: {type: Boolean, default: false},
    },
    watch: {
        selectedBoutInfo(newInfo) {
            if (!this.isFuture) {
                this.boutDetailsReady = false
                this.isLoaded = false
            }
            if ('oid' in newInfo) {
                this.boutInfoReady = true
            } else {
                this.boutInfoReady = false
            }
        },
        selectedBoutDetails(newDetails) {
            if ('oid' in newDetails) {
                this.boutDetailsReady = true
                if (newDetails.betInfo.notes !== null) {
                    this.hasNotes = true
                }
            } else {
                this.boutDetailsReady = false
            }
        }
    },
    methods: {
        evalIfLoaded () {
            if (!this.boutInfoReady && 'oid' in this.selectedBoutInfo) {
                this.boutInfoReady = true
            }
            if (this.boutInfoReady && (this.isFuture || (!this.isFuture && this.boutDetailsReady))) {
                this.isLoaded = true
            }
        },
        openDirectBarEloModal () {
            this.$emit('displayDirectEloBarModal')
        },
        openRelRadarEloModal () {
            this.$emit('displayRelEloRadarModal')
        },
        openChangeBarEloModal () {
            this.$emit('displayChangeEloBarModal')
        },
        resolveWeightClass (myKey) {
            return weightClassDict[myKey];
        },
        resolveFinishMethodDict (myKey) {
            return finishMethodDict[myKey];
        },
        resolveFinishTime () {
            var finishSecs = this.selectedBoutDetails.finishTime - ((this.selectedBoutDetails.finishRounds - 1) * 60 * 5)
            var finishMins = Math.floor(finishSecs / 60)
            var finishSecsFinal = finishSecs - (finishMins * 60)
            var finishSecsFinalStr = finishSecsFinal.toString()
            if (finishSecsFinalStr.length === 1){
                finishSecsFinalStr = '0'+finishSecsFinalStr
            }
            var finishMinsFinalStr = finishMins.toString()    
            return finishMinsFinalStr + ':' + finishSecsFinalStr
        },
        toggleBoutStatsVis () {
            if (this.isLoaded) {
                if (this.showBoutStats){
                    this.showBoutStats = false
                } else {
                    this.showBoutStats = true
                }
            }
        },
        convImpProbToAmerOdds (impProb) {
            if (impProb === 50) {
                return '+100'
            } else if (impProb < 50) {
                return '+' + Math.round(((100 / (impProb / 100)) - 100) * 10) / 10
            } else {
                return Math.round((impProb / (1 - (impProb / 100))) * -10) / 10
            }
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        formatWinProb (prob) {
            if (prob === null) {
                return 'N/A'
            } else {
                return this.round(prob*100)+'%'
            }
        },
        evalIfWon(bout){
            if (bout.outcome === 'W') {
                return true
            } else {
                false
            }
        },
        evalIfBet (fighterName) {
            if (this.selectedBoutDetails.betInfo.bet && fighterName === this.selectedBoutDetails.betInfo.predWinner) {
                return true
            } else {
                return false
            }
        }
    },
    data () {
        return {
            showBoutStats: true,
            boutDetailsReady: false,
            boutInfoReady: false,
            isLoaded: false,
            hasNotes: false
        }
    }
}
</script>