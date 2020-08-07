<template>
    <div class="columns is-multiline">
        <div class=column>
            <span class = "is-size-5">
               Advantageous Bets
            </span>
            <br>
            <table class="table is-bordered is-striped is-narrow is-fullwidth">
                <thead>
                    <tr>
                        <th class="is-hidden-mobile"><abbr title="Fighters">Bout</abbr></th>
                        <th><abbr title="Predicted Winner">Pred Winner</abbr></th>
                        <th class="is-hidden-mobile"><abbr title="Predicted Odds">Pred Prob</abbr></th>
                        <th class="is-hidden-mobile"><abbr title="Vegas Odds">Odds</abbr></th>
                        <th class="is-hidden-mobile"><abbr title="Odds Difference">Pred Adv</abbr></th>
                        <th><abbr title="Amount to bet based on model">Wager Weight</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="betBout in boutInfo" :key="betBout.oid">
                    <template v-if="betBout.bet">
                        <td class="is-hidden-mobile">{{betBout.boutName}}</td>
                        <td>{{betBout.predWinner}}</td>
                        <td class="is-hidden-mobile">{{round(betBout.predProb)}}%</td>
                        <td class="is-hidden-mobile">{{round(betBout.vegasOdds)}}%</td>
                        <td class="is-hidden-mobile">+{{round(betBout.oddsDiff)}}%</td>
                        <td>${{round(betBout.wagerWeight)}}</td>
                    </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
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
    }
  }
}
</script>