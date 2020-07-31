<template>
    <div class="column is-6">
        <div class="card events-card">
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
                            <tr v-for="bout in boutList" :key="bout.oid">
                                <td width="5%"><i class="fa fa-bell-o"></i></td>
                                <td>
                                    <a @click="showFighterModal(bout['fighterBoutXRefs'][0]['fighter'])"> {{bout['fighterBoutXRefs'][0]['fighter']['fighterName']}} </a>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][0]['mlOdds'])}} </div>
                                </td>
                                <td>VS</td>
                                <td>
                                    <a @click="showFighterModal(bout['fighterBoutXRefs'][1]['fighter'])"> {{bout['fighterBoutXRefs'][1]['fighter']['fighterName']}} </a>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][1]['mlOdds'])}} </div>
                                </td>
                                <td>
                                    <a class="button is-small" v-bind:class="{ 'is-success': evalIfBoutSelected(bout), 'is-info': !evalIfBoutSelected(bout)}" @click="switchBout(bout)">Details</a>
                                    <div class="is-small"> </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <FighterModal
        v-show="isFighterModalVisible"
        @closeFighter="closeFighterModal"
        :modalFighter="selectedFighter"
        />
    </div>
</template>

<script>
import FighterModal from '@/components/FighterModal.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightBoutTable',
    components: {
        FighterModal
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
        }
    },
    data () {
        return {
            selectedFighter: {},
            isFighterModalVisible: false
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
        }
    }    
}
</script>