<template>
    <div class="card events-card">
        <header class="card-header" v-if="!adminBetBoutTableLoading">
            <p class="card-header-title">
                {{ boutInfo['fightName'] }}
            </p>
            <a v-on:click="backToUpdate()" class="button is-link">Return</a>
        </header>
        <header class="card-header" v-if="adminBetBoutTableLoading">
            <p class="card-header-title">
                <img src="@/assets/loading.gif" alt="Loading">
            </p>
            <h1 class="w3-xxxlarge" v-if="adminBetBoutTableLoading && !adminBetBoutTableInitialized"> {{initBetUpdateBoutTable()}} </h1>
        </header>
        <div class="card-table" v-if="!adminBetBoutTableLoading">
            <div class="content" v-for="bout in boutInfo['bouts']" :key="bout.oid">
                <AdminBetBoutTableRow
                    :betBout="bout"
                    :adminBetBoutRowPw="adminBetBoutTablePw"
                    />
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import AdminBetBoutTableRow from '@/components/Admin/Bet/AdminBetBoutTableRow.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'AdminBetBoutTable',
    components: {
        AdminBetBoutTableRow
    },
    props: {
        adminBetBoutTablePw: {type: String},
        selectedBetFightId: {type: String}
    },
    data () {
        return {
            adminBetBoutTableLoading: true,
            adminBetBoutTableInitialized: false,
            boutInfo: {'fightName': null},
            selectedBout: {},
            fightOid: null,
            fightOddsUrl: null,
            fightUrlMissing: true,
            updatingOddsUrl: false
        }
    },
    methods: {
        initBetUpdateBoutTable () {
            console.log("init!")
            this.adminBetBoutTableInitialized = true
            ApiService.getBoutBetsFromFight(this.selectedBetFightId)
                .then(
                bouts => {
                    this.boutInfo = bouts['response']
                    this.selectedBout = bouts['response']['bouts'][0]
                    this.fightOid = bouts['response']['oid']
                    if (bouts['response']['bestFightOddsUrl']){
                        this.fightOddsUrl = bouts['response']['bestFightOddsUrl']
                        this.fightUrlMissing = false
                    } else {
                        this.fightOddsUrl = ''
                    }
                }
                ).catch(error => console.log(error))
                .finally(
                () => { 
                    this.adminBetBoutTableLoading = false 
                    }
                )
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        backToUpdate () {
            this.$emit('return')
        },
        resetFightUrl () {
            this.fightOddsUrl = ''
        }
    }
}
</script>