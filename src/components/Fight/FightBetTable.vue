<template>
    <div class="card events-card is-shadow-dreamy" v-if="fightSelected">
        <header class="card-header">
            <p class="card-header-title">
                Algorithm's Bets
            </p>
            <a class="card-header-icon is-link" v-on:click="toggleBetTableVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': showBetTable, 'fas fa-chevron-circle-down': !showBetTable }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showBetTable">
            <div class="content" v-if="future">
                <div class="subtitle">
                    The model has found an edge in the following bets, based on the <strong> currently displayed Vegas odds</strong>.
                </div>
                    As the lines move, the bets and amounts may change.  The algorithm was trained using money line odds from the day of the fight.  Click <a href="#/about">here</a> for additional information on the model, methodology, and approach.
            </div>
            <div class="content" v-if="!future">
                <div class="subtitle">
                    The model predicted advantages and made the following bets.  The odds listed are reflective of the odds at the time of the fight.
                </div>
                    Click <a href="#/about">here</a> for additional information on the model, methodology, and approach.
            </div>
        </div>
        <div class="card-content" v-if="showBetTable">
            <table class="table is-bordered is-narrow is-fullwidth is-shadow-longer">
                <thead>
                    <tr class="is-shadow-sharp">
                        <th class="is-hidden-mobile" v-bind:class="{ 'is-hidden': !future }"><abbr title="Fighters competing">Bout</abbr></th>
                        <th><abbr title="Algorithm's money line bet">Pick</abbr></th>
                        <th class="is-hidden-mobile"><abbr title="Algorithm's probability of this fighter winning">Win Probability</abbr></th>
                        <th><abbr title="Average money line odds across multiple sportsbooks">Vegas Odds</abbr></th>                              
                        <th class="is-hidden-mobile"><abbr title="Implied probability from Vegas money line odds of this fighter winning">Vegas Probability</abbr></th>
                        <th class="is-hidden-mobile"><abbr title="Algorithm's probability - Vegas implied probability (positive = advantage)">Edge</abbr></th>
                        <th><abbr title="Amount that the algorithm is betting for this bout">Bet Amount</abbr></th>
                        <th v-bind:class="{ 'is-hidden': future }"><abbr title="Result from bet">Result</abbr></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th class="is-hidden-mobile" v-bind:class="{ 'is-hidden': !future }"></th>
                        <th></th>
                        <th class="is-hidden-mobile"></th>
                        <th></th>                              
                        <th class="is-hidden-mobile"></th>
                        <th class="is-hidden-mobile"></th>
                        <th><abbr title="Total amount that the algorithm is betting for this fight">{{convToDollarStr(round(totalBet))}}</abbr></th>
                        <th v-bind:class="{ 'is-hidden': future }"><abbr title="Total Results from bets">{{convToDollarStr(round(totalResult))}}</abbr></th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr class="is-shadow-dreamy" v-for="betBout in betData" :key="betBout.oid">
                    <template v-if="betBout.bet">
                        <td class="is-hidden-mobile" v-bind:class="{ 'is-hidden': !future }">{{betBout.boutName}}</td>
                        <td>{{betBout.predWinner}}</td>
                        <td class="is-hidden-mobile">{{round(betBout.predProb)}}%</td>
                        <td>{{convImpProbToAmerOdds(betBout.vegasOdds)}}</td>
                        <td class="is-hidden-mobile">{{round(betBout.vegasOdds)}}%</td>
                        <td class="is-hidden-mobile">+{{round(betBout.oddsDiff)}}%</td>
                        <td>${{round(betBout.wagerWeight)}}</td>
                        <td v-bind:class="{ 'is-hidden': future }">{{convToDollarStr(round(betBout.betResult))}}</td>
                    </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightBetTable',
    props: {
        fightId: {type: String, default: ''},
        future: {type: Boolean, default: true},
        fightSelected: {type: Boolean, default: false}
    },
    watch: { 
        fightId: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            this.totalBet = 0
            this.totalResult = 0
            if (this.fightId !== '') {
                this.getBetsFromFightData()
            }
        }
    },
    data () {
        return {
            showBetTable: true,
            betData: [],
            totalBet: 0,
            totalResult: 0
        }
    },
    methods: {
        round (inDouble) {
            return formatter.format(inDouble)
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
        convToDollarStr (result) {
            if (result >= 0) {
                return '$'+result
            } else {
                return '-$' + (result*-1)
            }
        },
        toggleBetTableVis () {
            if (this.showBetTable) {
                this.showBetTable = false
            } else {
                this.showBetTable = true
            }
        },
        getBetsFromFightData () {
            this.totalBet = 0
            this.totalResult = 0
            if (this.future) {
                ApiService.getBetsFromFight(this.fightId)
                    .then(
                        bets => {
                            this.betData = bets['response']
                            var i;
                            for (i = 0; i < this.betData.length; i++) {
                                if (this.betData[i]['bet']) {
                                    this.totalBet += this.betData[i]['wagerWeight']
                                }
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
                                this.totalBet += this.betData[i]['wagerWeight']
                                this.totalResult += this.betData[i]['betResult']
                            }
                        }
                    ).catch(error => console.log(error))        
            } 
        },
    }
}
</script>