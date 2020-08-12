<template>
    <div class="card events-card is-shadow-dreamy">

        <header class="card-header">
            <p class="card-header-title">
                <!-- <span class="icon is-small is-hidden-mobile" v-if="selectedBoutInfo.champBout">
                    <i class="fas fa-crown"></i>
                </span> -->
                <span>
                    Bout Information
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleBoutStatsVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': showBoutStats, 'fas fa-chevron-circle-down': !showBoutStats }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBoutStats">
            <div class="content">
                <!-- <section class="container"> -->
                    <div class="columns">
                        <div class="column">
                            <p class="notification is-info-light is-shadow-dreamy" v-if="!isFuture">
                                <strong>{{selectedBoutInfo.finishDetails}}</strong>
                            </p>
                            <div class="columns is-mobile">
                                <div class="column">
                                    <p class="notification is-info-light is-shadow-dreamy"> 
                                        Rounds: <strong>{{ selectedBoutInfo['schedRounds'] }} </strong> <strong v-if="!isFuture"> ({{ selectedBoutDetails['finishRounds'] }} - {{resolveFinishTime()}})</strong>
                                    </p>
                                </div>
                                <div class="column">
                                    <p class="notification is-info-light is-shadow-dreamy">Weight Class: <strong>{{ resolveWeightClass(selectedBoutInfo['weightClass']) }} </strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns" v-if="!isFuture && boutDetailsReady">
                        <div class="column">
                            <p class="notification is-info-light is-shadow-dreamy" v-if="selectedBoutDetails.notes">
                                Betting Note: <strong>{{selectedBoutDetails.betInfo.notes}}</strong>
                            </p>
                            <div class="columns is-mobile">
                                <div class="column">
                                    <p class="notification is-info-light is-shadow-dreamy"> Referee: <strong>{{selectedBoutDetails.referee}}</strong></p>
                                </div>
                                <div class="column">
                                    <p class="notification is-info-light is-shadow-dreamy">Finish Method: <strong>{{ resolveFinishMethodDict(selectedBoutDetails['finishMethod']) }} </strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <p class="notification is-info is-shadow-dreamy">
                                <strong>{{selectedBoutInfo['fighterBoutXRefs'][0]['fighter']['fighterName']}}</strong>
                                <span class="icon is-right">
                                    <i class="fas fa-check" v-if="!isFuture && evalIfWon(selectedBoutInfo['fighterBoutXRefs'][0])"></i>
                                    <i class="fas fa-times" v-if="!isFuture && !evalIfWon(selectedBoutInfo['fighterBoutXRefs'][0])"></i>
                                </span>
                            </p>
                            <div class="columns is-mobile">
                                <div class="column">
                                    <p class="notification is-info-light is-shadow-dreamy"> Vegas Odds: <strong>{{convImpProbToAmerOdds(selectedBoutInfo['fighterBoutXRefs'][0].mlOdds)}} </strong></p>
                                </div>
                                <div class="column">
                                    <p class="notification is-info-light is-shadow-dreamy"> Win Probability: <strong> {{formatWinProb(selectedBoutInfo['fighterBoutXRefs'][0].expOdds)}}</strong></p>
                                </div>
                            </div>
                            <FightBoutRoundPerformance
                                v-if="!isFuture && boutDetailsReady"
                                :selectedFighterDetails="selectedBoutDetails['fighterBoutXRefs'][0]"
                                :isFuture="isFuture"
                            />
                        </div>
                        <div class="column">
                            <p class="notification is-danger is-shadow-dreamy">
                                <strong>{{selectedBoutInfo['fighterBoutXRefs'][1]['fighter']['fighterName']}}</strong>
                                <span class="icon is-right">
                                    <i class="fas fa-check" v-if="!isFuture && evalIfWon(selectedBoutInfo['fighterBoutXRefs'][1])"></i>
                                    <i class="fas fa-times" v-if="!isFuture && !evalIfWon(selectedBoutInfo['fighterBoutXRefs'][1])"></i>
                                </span>
                            </p>
                            <div class="columns is-mobile">
                                <div class="column">
                                    <p class="notification is-danger-light is-shadow-dreamy"> Vegas Odds: <strong>{{convImpProbToAmerOdds(selectedBoutInfo['fighterBoutXRefs'][1].mlOdds)}} </strong></p>
                                </div>
                                <div class="column">
                                    <p class="notification is-info-light is-shadow-dreamy"> Win Probability: <strong> {{formatWinProb(selectedBoutInfo['fighterBoutXRefs'][1].expOdds)}}</strong></p>
                                </div>
                            </div>
                            <FightBoutRoundPerformance
                                v-if="!isFuture && boutDetailsReady"
                                :selectedFighterDetails="selectedBoutDetails['fighterBoutXRefs'][1]"
                                :isFuture="isFuture"
                            />
                        </div>
                    </div>
                    <!-- <div class="columns is-mobile">
                        <div class="column is-one-third">
                            <div class="notification is-primary is-shadow-sharp is-inverted">
                                Statistics Comparisons
                                    <button class="button is-info"></button>
                                
                            </div>
                        </div>
                    </div> -->
                <!-- </section> -->
            <!-- <table class="table is-bordered is-striped is-narrow is-fullwidth">
                <thead>
                    <tr>
                        <th>
                            <abbr title="Fighter">Fighter</abbr>
                        </th>
                        <th>
                            <abbr title="Average money line odds across multiple sportsbooks">Vegas Odds</abbr>
                        </th>                              
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="betBout in selectedBoutInfo['fighterBoutXRefs']" :key="betBout.oid">
                        <td>
                            <i class="fas fa-check" v-if='!isFuture & evalIfWon(betBout)'></i>
                            {{betBout['fighter']['fighterName']}}</td>
                        <td>{{convImpProbToAmerOdds(betBout.mlOdds)}}</td>
                    </tr>
                </tbody>
            </table>
                <p v-if="!isFuture"> {{selectedBoutInfo['finishDetails']}} </p>
                <div class="level">
                    <div class="level-item">
                        <div>
                            <div class="heading has-text-centered"> Scheduled Rounds </div>
                            <div class="title is-5 has-text-centered"> {{ selectedBoutInfo['schedRounds'] }} </div>
                        </div>
                    </div>
                    <div class="level-item">
                        <div>
                            <div class="heading has-text-centered"> Weight Class </div>
                            <div class="title is-5 has-text-centered"> {{ resolveWeightClass(selectedBoutInfo['weightClass']) }} </div>
                        </div>
                    </div>
                </div>      -->
                
            </div>
        </div>
        <footer class="card-footer">
            <a :disabled="!directEloBarReady" @click="openDirectBarEloModal()" class="button card-footer-item is-primary">Direct ELO Comparison</a>
            <a :disabled="!relEloRadarReady" @click="openRelRadarEloModal()" class="button is-primary card-footer-item">Relative ELO Comparison</a>
            <a :disabled="!changeEloBarReady" @click="openChangeBarEloModal()" class="button is-primary card-footer-item">ELO Change After Fight</a>
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
        selectedBoutDetails(newDetails) {
            if ('oid' in newDetails) {
                this.boutDetailsReady = true
            }
        }
    },
    methods: {
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
            // if (finishMinsFinalStr.length === 1){
            //     finishMinsFinalStr = '0'+finishMinsFinalStr
            // }            
            return finishMinsFinalStr + ':' + finishSecsFinalStr
        },
        toggleBoutStatsVis () {
            if (this.showBoutStats){
                this.showBoutStats = false
            } else {
                this.showBoutStats = true
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
            return this.round(prob*100)+'%'
        },
        evalIfWon(bout){
            if (bout.outcome === 'W') {
                return true
            } else {
                false
            }
        },
        // hasNotes () {
        //     if (this.boutDetailsReady && 'notes')
        // }
    },
    data () {
        return {
            showBoutStats: true,
            boutDetailsReady: false
        }
    }
}
</script>