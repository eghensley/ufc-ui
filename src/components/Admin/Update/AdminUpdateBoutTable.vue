<template>
    <div class="card events-card">
        <header class="card-header" v-if="!adminUpdateBoutTableLoading">
            <p class="card-header-title">
            {{ boutInfo['fightName'] }}
            </p>
            <a v-on:click="backToUpdate()" class="button is-link">Return</a>
        </header>
        <header class="card-header" v-if="!adminUpdateBoutTableLoading">
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label"> Odds URL </label>
                </div>
                <div class="field-body">
                    <div class="field has-addons">
                        <p class="control is-expanded">
                            <input class="input" v-bind:class="{ 'is-danger': fightUrlMissing}" id="fightOddsUrl" v-model="fightOddsUrl" type="text" :placeholder="{fightOddsUrl}">
                        </p>
                        <p class="control">
                            <a @click="resetFightUrl" class="button is-light">Reset</a>
                        </p>
                        <p class="control">
                            <a @click="submitFightUrl" class="button is-primary" v-bind:class="{ 'is-loading': updatingOddsUrl}">Update</a>
                        </p>
                    </div>
                </div>
            </div>
        </header>
        <header class="card-header" v-if="adminUpdateBoutTableLoading">
            <p class="card-header-title">
                <img src="@/assets/loading.gif" alt="Loading">
            </p>
            <h1 class="w3-xxxlarge" v-if="adminUpdateBoutTableLoading && !adminUpdateBoutTableInitialized"> {{initAdminUpdateBoutTable()}} </h1>
        </header>
        <div class="card-table" v-if="!adminUpdateBoutTableLoading">
            <div class="content">
                <AdminUpdateBoutTableRow
                    v-for="bout in boutInfo['bouts']" :key="bout.oid"
                    :bout="bout"
                    :adminBoutRowPw="adminBoutTablePw"
                    :champBout="bout.champBout"
                    :schedRounds="bout.schedRounds"
                    />
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import AdminUpdateBoutTableRow from '@/components/Admin/Update/AdminUpdateBoutTableRow.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'AdminUpdateBoutTable',
    components: {
        AdminUpdateBoutTableRow
    },
    props: {
        adminBoutTablePw: {type: String},
        selectedFightId: {type: String}
    },
    data () {
        return {
            adminUpdateBoutTableLoading: true,
            adminUpdateBoutTableInitialized: false,
            boutInfo: {'fightName': null},
            selectedBout: {},
            fightOid: null,
            fightOddsUrl: null,
            fightUrlMissing: true,
            updatingOddsUrl: false
        }
    },
    methods: {
        initAdminUpdateBoutTable () {
            console.log("init!")
            this.adminUpdateBoutTableInitialized = true
            ApiService.getBoutsFromFight(this.selectedFightId)
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
                    this.adminUpdateBoutTableLoading = false 
                    }
                )
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        backToUpdate () {
            this.$emit('return')
        },
        submitFightUrl () {
            this.updatingOddsUrl = true
            ApiService.addFightOddsUrl(this.adminBoutTablePw, this.selectedFightId, this.fightOddsUrl.replace("https://www.bestfightodds.com/events/", ""))
            .then(
                () => {
                    
                }
                ).catch(error => console.log(error))
                .finally(
                    () => {
                        this.updatingOddsUrl = false
                    }
                )
        },
        resetFightUrl () {
            this.fightOddsUrl = ''
        }
    }
}
</script>