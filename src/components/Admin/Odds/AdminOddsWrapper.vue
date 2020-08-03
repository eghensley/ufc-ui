<template>
    <div class="column is-12"> 
        <section v-if="loading" class="hero is-info is-small" id="loadingRibbon">
            <div class="container">
                <h1 class="title"> Loading ... </h1>
                <a class="navbar-item is--brand">
                    <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                </a>
                <h1 class="w3-xxxlarge" v-if="loading && !initialized"> {{initPage()}} </h1>
            </div>
        </section>
        <div class="card events-card">
            <header class="card-header">
                <p class="card-header-title">
                {{ boutData['fightName'] }}
                </p>
                <FightDropdown
                    :pastFightMetaList="pastFightMeta"
                    :curFightId="fightId"
                    @newFightId="switchFight"
                />
            </header>
            <header class="card-header">
                <p class="card-header-title">
                Bouts
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                </span>
                </a>
            </header>
            <div class="card-table">
                <div class="content">
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr v-for="bout in boutData['bouts']" :key="bout.oid">
                                <td width="5%">
                                    <i class="fa fa-bell-o"></i>
                                </td>
                                <td>
                                    <div> {{bout['fighterBoutXRefs'][0]['fighter']['fighterName']}} </div>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][0]['mlOdds'])}} </div>
                                </td>
                                <td>VS</td>
                                <td>
                                    <div> {{bout['fighterBoutXRefs'][1]['fighter']['fighterName']}} </div>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][1]['mlOdds'])}} </div>
                                </td>
                                <td>
                                    <a class="button is-small is-link" @click="showOddsModal(bout)">Open</a>
                                    <div class="is-small"> </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <footer class="card-footer">
                        <a v-on:click="addOnlineOdds">Update Odds Using Online Average</a>
                    </footer>
                </div>
            </div>
        </div>
        <OddsModal
            v-show="isOddsModalVisible"
            @closeOdds="closeOddsModal"
            :bout="selectedBout"
            :oddsModalPw="pw"
        />
    </div>
</template>

<script>
import FightDropdown from '@/components/FightDropdown.vue'

import OddsModal from '@/components/UpdateOddsModal.vue'
import ApiService from '@/services/ApiService.js'

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
    name: 'AdminOddsWrapper',
    components: {
        OddsModal, FightDropdown
    },
    props: {
        pw: {type: String}
    },
    data () {
        return {
            isOddsModalVisible: false,
            loading: true,
            initialized: false,
            fightId: '',
            fightOid: null,
            boutData: {
                'oid': null,
                'fightName': null,
                'fightId': null,
                'bouts': []
            },
            selectedBout: {
                        'fighterBoutXRefs':[
                            {
                                'fighter': {
                                    'oid': 'null',
                                    'fighterId': 'null',
                                    'fighterName': 'null',
                                    'reach': null,
                                    'height': null,
                                    'dob': 'null',
                                    'stance': 'null'
                                },
                                'mlOdds': null
                            },
                            {
                                'fighter': {
                                    'oid': 'null',
                                    'fighterId': 'null',
                                    'fighterName': 'null',
                                    'reach': null,
                                    'height': null,
                                    'dob': 'null',
                                    'stance': 'null'
                                },
                                'mlOdds': null
                            }
                        ]
                    },
            pastFightMeta: []
        }
    },
    methods: {
        initPage () {
            console.log("init!")
            this.initialized = true
            ApiService.getRecentFights()
                .then(
                fights => {
                    this.pastFightMeta = fights['response']//.slice(1, fights.length)
                    this.fightId = this.pastFightMeta[0].fightId
                }
                ).catch(error => console.log(error))
                .finally(
                    () => {
                        this.getBoutsFromFightData()
                    }
                )
        },
        showOddsModal (bout) {
            this.selectedBout = bout
            this.isOddsModalVisible = true
        },
        closeOddsModal () {
            this.isOddsModalVisible = false
            this.loading = true
            this.getBoutsFromFightData()
        },
        getRecentFightInfo () {
            ApiService.getRecentFights()
                .then(
                fights => {
                    this.pastFightMeta = fights['response'].slice(1, fights.length)
                    this.nextFightMeta = fights['response'][0]
                }
                ).catch(error => console.log(error))
        },
        switchFight (newFightId) {
            this.fightId = newFightId
            this.getBoutsFromFightData()
        },
        getBoutsFromFightData () {
            ApiService.getBoutsFromFight(this.fightId)
                .then(
                bouts => {
                    this.boutData = bouts['response']
                    this.selectedBout = bouts['response']['bouts'][0]
                    this.fightOid = bouts['response']['oid']
                }
                ).catch(error => console.log(error))
                .finally(
                () => { 
                    this.loading = false 
                    }
                )
        },
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
        addOnlineOdds () {
            this.loading = true
            ApiService.addFightOdds(this.fightId, this.pw)
                .then(resp => {
                    if (resp.status === 'OK') {
                        this.getBoutsFromFightData()
                    }
                }
            ).catch(error => console.log(error))
        },
        resolveWeightClass (myKey) {
            return weightClassDict[myKey];
        }
    }
}
</script>