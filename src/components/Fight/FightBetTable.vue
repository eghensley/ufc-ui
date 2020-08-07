<template>
    <section class="section">
        <div class="container">
            <div class="card events-card">
                <header class="card-header">
                    <p class="card-header-title">
                        Algorithm's Bets
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        <div class="subtitle">
                            The model has found an edge in the following bets, based on the <strong> currently displayed Vegas odds</strong>.
                        </div>
                            As the lines move, the bets and amounts may change.  The algorithm was trained using money line odds from the day of the fight.  Click <a href="#/about">here</a> for additional information on the model, methodology, and approach.
                    </div>
                </div>
                <div class="card-content">
                    <table class="table is-bordered is-striped is-narrow is-fullwidth">
                        <thead>
                            <tr>
                                <th class="is-hidden-mobile"><abbr title="Fighters competing">Bout</abbr></th>
                                <th><abbr title="Algorithm's money line bet">Pick</abbr></th>
                                <th class="is-hidden-mobile"><abbr title="Algorithm's probability of this fighter winning">Win Probability</abbr></th>
                                <th><abbr title="Average money line odds across multiple sportsbooks">Vegas Odds</abbr></th>                              
                                <th class="is-hidden-mobile"><abbr title="Implied probability from Vegas money line odds of this fighter winning">Vegas Probability</abbr></th>
                                <th class="is-hidden-mobile"><abbr title="Algorithm's probability - Vegas implied probability (positive = advantage)">Edge</abbr></th>
                                <th><abbr title="Amount that the algorithm is betting for this bout">Bet Amount</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="betBout in boutInfo" :key="betBout.oid">
                            <template v-if="betBout.bet">
                                <td class="is-hidden-mobile">{{betBout.boutName}}</td>
                                <td>{{betBout.predWinner}}</td>
                                <td class="is-hidden-mobile">{{round(betBout.predProb)}}%</td>
                                <td>{{convImpProbToAmerOdds(betBout.vegasOdds)}}</td>
                                <td class="is-hidden-mobile">{{round(betBout.vegasOdds)}}%</td>
                                <td class="is-hidden-mobile">+{{round(betBout.oddsDiff)}}%</td>
                                <td>${{round(betBout.wagerWeight)}}</td>
                            </template>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </section>
</template>

<script>

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightBetTable',
    props: {
        boutInfo: {
            type: Array, default: function () { 
                return []
            }
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
  }
}
</script>