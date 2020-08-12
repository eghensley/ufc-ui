<template>
    <div class="is-hidden-tablet is-hidden-desktop is-hidden-widescreen">
        <a class="dropdown is-right" v-on:click="toggleDropdown()" v-bind:class="{ 'is-active': boutDropDownVis }">
            <button class="button" aria-haspopup="true" aria-controls="bout-dropdown-menu">
                <span><strong>{{ boutName }}</strong></span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
            <div class="dropdown-menu" id="bout-dropdown-menu" role="menu">
                <div class="dropdown-content" v-for="boutD in boutList" :key="boutD.oid">
                    <a class="dropdown-item" v-on:click="switchBout(boutD)" v-bind:class="{ 'is-active': evalIfBoutSelected(boutD) }">
                        {{boutD['fighterBoutXRefs'][0]['fighter']['fighterName']}} VS {{boutD['fighterBoutXRefs'][1]['fighter']['fighterName']}}
                    </a>
                </div>
            </div>
        </a>
    </div>
            <!-- </header>
            <div class="card-table">
                <div class="content">
                    <table class="table is-fullwidth is-striped">
                        <tbody>
                            <tr v-for="bout in boutList" :key="bout.oid" v-bind:class="{ 'is-hidden-mobile': !evalIfBoutSelected(bout)}">
                                <td width="5%">
                                    <span class="icon is-small">
                                        <i class="fas fa-crown" v-if="bout.champBout"></i>
                                    </span>
                                </td>
                                <td>
                                    <a @click="showFighterModal(bout['fighterBoutXRefs'][0]['fighter'])"> {{bout['fighterBoutXRefs'][0]['fighter']['fighterName']}} </a>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][0]['mlOdds'])}} </div>
                                </td>
                                <td>VS</td>
                                <td>
                                    <a @click="showFighterModal(bout['fighterBoutXRefs'][1]['fighter'])"> {{bout['fighterBoutXRefs'][1]['fighter']['fighterName']}} </a>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][1]['mlOdds'])}} </div>
                                </td>
                                <td class="is-hidden-mobile">
                                    <a class="button is-small" v-bind:class="{ 'is-success': evalIfBoutSelected(bout), 'is-info': !evalIfBoutSelected(bout)}" @click="switchBout(bout)">Details</a>
                                    <div class="is-small"> </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> -->
        <!-- <FighterModal
            v-show="isFighterModalVisible"
            @closeFighter="closeFighterModal"
            :modalFighter="selectedFighter"
        />
    </div> -->
</template>

<script>
//import FighterModal from '@/components/FighterModal.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightBoutTable',
    components: {
        //FighterModal
    },
    props: {
        boutList: {
            type: Array, default: function () { 
                return []
            }
        },
        selBout: {
            type: Object, default: function () { 
                return {'boutId': null}
            }            
        },
        boutName: {type: String, default: ''}
    },
    data () {
        return {
            selectedFighter: {},
            isFighterModalVisible: false,
            boutDropDownVis: false
        }
    },
    methods: {
        evalIfBoutSelected (bout) {
            if (this.selBout.boutId === bout.boutId) {
                return true
            } else {
                return false
            }
        },
        round (inDouble) {
            return formatter.format(inDouble)
        },
        showFighterModal (fighterInfo) {
            this.selectedFighter = fighterInfo
            this.isFighterModalVisible = true
        },
        closeFighterModal () {
            this.isFighterModalVisible = false
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
        switchBout (boutInfo) {
            this.$emit('switch', boutInfo)
        },
        toggleDropdown () {
            if (this.boutDropDownVis) {
                this.boutDropDownVis = false
            } else {
                this.boutDropDownVis = true
            }
        }
    }    
}
</script>