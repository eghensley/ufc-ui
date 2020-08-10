<template>
    <aside class="column is-one-fifth aside is-hidden-mobile">
        <nav class="menu">
            <p class="menu-label"> Fights </p>
            <ul class="menu-list" v-for="fight in pastFightMetaList" :key="fight.oid">
                <li>
                    <a v-bind:class="{ 'is-active': isFightActive(fight) }" v-on:click="switchFightAside(fight['fightId'])">
                        {{fight['fightName']}}
                        <span class="icon" v-if="isFightActive(fight)" v-on:click="toggleBoutAsideVis()">
                            <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showBouts, 'fa fa-angle-down': !showBouts }"></i>
                        </span>
                    </a>
                    <template v-if="isFightActive(fight) && showBouts">
                        <ul v-for="bout in boutList" :key="bout.oid">
                            <li>
                                <a v-on:click="switchBout(bout)" v-bind:class="{ 'is-active': evalIfBoutSelected(bout)}">
                                    <span class="icon is-small" v-if="bout.champBout">
                                        <i class="fas fa-crown"></i>
                                    </span>
                                    {{bout['fighterBoutXRefs'][0]['fighter']['fighterName']}} VS {{bout['fighterBoutXRefs'][1]['fighter']['fighterName']}}
                                </a>
                            </li>
                        </ul>
                    </template>
                </li>
            </ul>
        </nav>        
    </aside>
</template>

<script>
//import FighterModal from '@/components/FighterModal.vue'

const formatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 2,      
   maximumFractionDigits: 2,
})

export default {
    name: 'fightBoutAside',
    components: {
        //FighterModal
    },
    props: {
        boutList: {
            type: Array, default: function () { 
                return []
            }
        },
        curBoutId: {type: String, default: null},
        pastFightMetaList: {type: Array, default: function () { return []}},
        curFightId: {type: String, default: null}
    },
    data () {
        return {
            selectedFighter: {},
            isFighterModalVisible: false,
            boutDropDownVis: false,
            showBouts: true
        }
    },
    methods: {
        evalIfBoutSelected (bout) {
            if (this.curBoutId === bout.boutId) {
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
            this.$emit('switchBout', boutInfo)
        },
        toggleDropdown () {
            if (this.boutDropDownVis) {
                this.boutDropDownVis = false
            } else {
                this.boutDropDownVis = true
            }
        },
        isFightActive (fight) {
            if (fight.fightId === this.curFightId) {
                return true
            } else {
                return false
            }
        },
        switchFightAside (newFightId) {
            if (newFightId != this.curFightId){
                console.log('switch fight')
                this.$emit('switchFight', newFightId)

            }
        },
        toggleBoutAsideVis () {
            if (this.showBouts) {
                this.showBouts = false
            } else {
                this.showBouts = true
            }
        }
    }
}
</script>