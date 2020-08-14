<template>
    <div class="card events-card is-shadow-longer">
        <h1 v-if="topRankingTableLoading && !topRankingTableInitialized"> {{initTopRankPage()}} </h1>
        <header class="card-header is-bevel">
            <p class="card-header-title">
                Weight Class Selection
            </p>
            <a class="card-header-icon is-link" v-on:click="toggleTopRankTableVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': showTopRankTable, 'fas fa-chevron-circle-down': !showTopRankTable }"></i>
                </span>
            </a>
        </header>
        <div class="card-table" v-if="showTopRankTable">
            <div class="content">
                <table class="table is-fullwidth is-shadow-longer">
                    <thead>
                        <tr class="is-shadow-sharp is-left">
                            <th></th>
                            <th>Weight Class</th>
                            <th>
                                Top Ranked Fighter
                            </th>
                        </tr>
                    </thead>
                    <tbody class="is-shadow-inverted">
                        <tr v-for="rank in topWeightClassRankings" :key="rank.wc">
                            <td width="5%">
                                <i class="fa fa-bell-o"></i>
                            </td>
                            <td>
                                <a @click="activateWc(rank.wc)"> {{resolveWeightClass(rank.wc)}} </a>
                            </td>
                            <td>
                                <div class="is-small"> {{rank.top.name}} </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <footer class="card-footer">
                    <a></a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>

import ApiService from '@/services/ApiService.js'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

const rankingWeightClassDict = {
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
    'HW': 'Heavyweight'
}

export default {
    name: 'TopRankingTable',
    components: {
        
    },
    props: {
        weightClass: {type: String, default: 'FW'}
    },
    watch: { 
        weightClass: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            this.rankingTableLoading = true
            this.rankingTableInitialized = false
        }
    },
    data () {
        return {
            topRankingTableLoading: true,
            topRankingTableInitialized: false,
            topWeightClassRankings: [],
            showTopRankTable: true
        }
    },
    methods: {
        initTopRankPage () {
            this.topRankingTableInitialized = true
            this.getTopRankings()
        },
        toggleTopRankTableVis () {
            if (this.showTopRankTable) {
                this.showTopRankTable = false
            } else {
                this.showTopRankTable = true
            }
        },
        getTopRankings () {
            this.topRankingTableLoading = true
            ApiService.getTopWeightClassRankings()
                .then(
                    ranks => {
                        this.topWeightClassRankings = ranks['response']
                    }
                ).catch(error => console.log(error)).finally(
                    () => {
                        this.topRankingTableLoading = false
                    }
                )
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        activateWc (wc) {
            this.$emit('switchWC', wc)
        },
        resolveWeightClass (myKey) {
            return rankingWeightClassDict[myKey];
        }
    }
}
</script>