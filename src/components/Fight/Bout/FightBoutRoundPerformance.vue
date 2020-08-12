<template>
    <div class="card events-card is-shadow-sharp">
        <header class="card-header">
            <p class="card-header-title">
                <span>
                    Round Performance
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleRoundStatsVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showRoundStats, 'fa fa-angle-down': !showRoundStats }"></i>
                </span>
            </a>
        </header>
        <div class="card-table" v-if="showRoundStats">
            <div class="content">
                <table class="table is-fullwidth">
                    <thead>
                        <tr class='is-shadow-sharp'>
                            <th></th>
                            <th>Round</th>
                            <th>KO Score</th>
                            <th>Sub Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="roundDetail in selectedFighterDetails.boutDetails" :key="roundDetail.oid">
                            <td width="5%">
                            </td>
                            <td>
                                {{roundDetail.round}}
                            </td>
                            <td>
                                {{formatStatProb(roundDetail.koScore)}}
                            </td>
                            <td>
                                {{formatStatProb(roundDetail.submissionScore)}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>    
</template>

<script>

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightBoutRoundPerformance',
    props: {
        selectedFighterDetails: {type: Object},
        isFuture: {type: Boolean, default: true}
    },
    watch: {
        selectedFighterDetails() {
            this.showRoundStats = false
        }
    },
    data () {
        return {
            showRoundStats: false
        }
    },
    methods: {
        formatStatProb (prob) {
            return this.round(prob*100)+'%'
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        toggleRoundStatsVis () {
            if (this.showRoundStats){
                this.showRoundStats = false
            } else {
                this.showRoundStats = true
            }
        },
    }

}
</script>