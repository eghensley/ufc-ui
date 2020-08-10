<template>
    <div class="card events-card">

        <header class="card-header">
            <p class="card-header-title">
                <span class="icon is-small is-hidden-mobile" v-if="selectedBoutInfo.champBout">
                    <i class="fas fa-crown"></i>
                </span>
                <span>
                    General Bout Information
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleBoutStatsVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showBoutStats, 'fa fa-angle-down': !showBoutStats }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBoutStats">
            <table class="table is-bordered is-striped is-narrow is-fullwidth">
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
            <div class="content">
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
                </div>     
                
            </div>
        </div>
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

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightBoutWrapper',
    components: {

    },
    props: {
        selectedBoutInfo: {type: Object},
        isFuture: {type: Boolean, default: true}
    },
    methods: {
        resolveWeightClass (myKey) {
            return weightClassDict[myKey];
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
        }
    },
    data () {
        return {
            showBoutStats: true   
        }
    }
}
</script>