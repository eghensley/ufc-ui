<template>
    <div class="card events-card is-hidden-tablet is-hidden-widescreen is-shadow-dreamy">
        <header class="card-header is-bevel">
            <p class="card-header-title">
                Bout Selection
                <progress class="progress is-medium is-dark" max="100" v-if="!isLoaded">45%</progress>
            </p>
            <h1 v-if="!isLoaded"> {{evalIfLoaded()}} </h1>
            <a class="card-header-icon" v-on:click="toggleBoutDropdown()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': isLoaded && boutDropDownVis, 'fas fa-chevron-circle-down': !(isLoaded && boutDropDownVis) }"></i>
                </span>
            </a>
        </header>
        <div class="card-table" v-if="boutDropDownVis && isLoaded">
            <!-- <div class="card-table"> -->
                <div class="content">
                    <table class="table is-fullwidth is-shadow-longer">
                        <thead>
                            <tr class="is-shadow-sharp">
                                <th></th>
                                <th>Blue Corner</th>
                                <th>Red Corner</th>
                                <!-- <th>Details</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="switchBout(bout)" class="is-shadow-inverted" v-for="bout in boutList" :key="bout.oid" v-bind:class="{'is-active': evalIfBoutSelected(bout) }">
                                <td width="5%">
                                    <span>
                                        <i class="fas fa-arrow-circle-right" v-if="evalIfBoutSelected(bout)"></i>
                                    </span>
                                    <span class="icon is-small">
                                        <i class="fas fa-crown" v-if="bout.champBout"></i>
                                    </span>
                                </td>
                                <td>
                                    <a> {{bout['fighterBoutXRefs'][0]['fighter']['fighterName']}} </a>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][0]['mlOdds'])}} </div>
                                </td>
                                <td>
                                    <a> {{bout['fighterBoutXRefs'][1]['fighter']['fighterName']}} </a>
                                    <div class="is-small"> {{convImpProbToAmerOdds(bout['fighterBoutXRefs'][1]['mlOdds'])}} </div>
                                </td>
                                <!-- <td> -->
                                    <!-- <a :disabled="evalIfBoutSelected(bout)" class="button is-small" v-bind:class="{ 'is-success': evalIfBoutSelected(bout), 'is-info': !evalIfBoutSelected(bout)}" @click="switchBout(bout)">
                                        <span class="icon">
                                            <i class="fas fa-dot-circle" v-if="evalIfBoutSelected(bout)"></i>
                                            <i class="far fa-dot-circle" v-if="!evalIfBoutSelected(bout)"></i>
                                        </span>
                                    </a>
                                    <div class="is-small"> </div>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
            <!-- </div> -->
            <FighterModal
                v-show="isFighterModalVisible"
                @closeFighter="closeFighterModal"
                :modalFighter="selectedFighter"
            />
        </div>
    </div>    
</template>

<script>

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

import FighterModal from '@/components/FighterModal.vue'

export default {
    name: 'fightBoutDropdown',
    components: {
        FighterModal
    },
    props: {
        boutList: {
            type: Array, default: function () { 
                return []
            }
        },
        selBoutId: {type: String, default: ''}
    },
    watch: {
        boutList (bouts) {
            if (bouts.length !== 0) {
                this.isLoaded = true
            } else {
                this.isLoaded = false
            }
        }
    },
    data () {
        return {
            selectedFighter: {},
            isFighterModalVisible: false,
            boutDropDownVis: true,
            isLoaded: false
        }
    },
    methods: {
        evalIfLoaded () {
            if (this.boutList.length !== 0) {
                this.isLoaded = true
            }
        },
        showFighterModal (fighterInfo) {
            this.selectedFighter = fighterInfo
            this.isFighterModalVisible = true
        },
        evalIfBoutSelected (bout) {
            if (this.selBoutId === bout.boutId) {
                return true
            } else {
                return false
            }
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


        round (inDouble) {
            return formatter.format(inDouble)
        },

        closeFighterModal () {
            this.isFighterModalVisible = false
        },

        switchBout (boutInfo) {
            if (!this.evalIfBoutSelected(boutInfo)){
                this.$emit('switchBout', boutInfo)
                this.boutDropDownVis = false
            }
        },
        toggleBoutDropdown () {
            if (this.isLoaded) {
                if (this.boutDropDownVis) {
                    this.boutDropDownVis = false
                } else {
                    this.boutDropDownVis = true
                }
            }
        }
    }    
}
</script>