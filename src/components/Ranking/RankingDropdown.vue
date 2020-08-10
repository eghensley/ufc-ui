<template>
    <li class="is-hidden-tablet is-hidden-desktop is-hidden-widescreen">
        <a class="dropdown" v-on:click="toggleDropdown()" v-bind:class="{ 'is-active': weightClassDropDownVis }">
            <button class="button" aria-haspopup="true" aria-controls="rank-weight-class-dropdown">
                <span><strong>{{ resolveWeightClass(activeWc) }}</strong></span>
                <span class="icon is-small">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-angle-up': weightClassDropDownVis, 'fas fa-angle-down': !weightClassDropDownVis }"></i>
                </span>
            </button>
            <div class="dropdown-menu" id="rank-weight-class-dropdown" role="menu">
                <div class="dropdown-content" v-for="weightClass in weightClasses" :key="weightClass.wc">
                    <a class="dropdown-item" v-on:click="changeWeightClass(weightClass.wc)" v-bind:class="{ 'is-active': evalIfActive(weightClass.wc) }">
                        {{ weightClass.name }}
                    </a>
                    <hr class="dropdown-divider">
                </div>
            </div>
        </a>
    </li>
</template>

<script>

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
    name: 'rankingDropdown',
    props: {
        activeWc: {type: String, default: 'FW'}
    },
    data () {
        return {
            weightClasses: [
                {'wc': 'WSW', 'name': 'Women\'s Strawweight'},
                {'wc': 'FW', 'name': 'Flyweight'},
                {'wc': 'WFW', 'name': 'Women\'s Flyweight'},
                {'wc': 'BW', 'name': 'Bantamweight'},
                {'wc': 'WBW', 'name': 'Women\'s Bantamweight'},
                {'wc': 'FFW', 'name': 'Featherweight'},
                {'wc': 'WFFW', 'name': 'Women\'s Featherweight'},
                {'wc': 'LW', 'name': 'Lightweight'},
                {'wc': 'WW', 'name': 'Welterweight'},
                {'wc': 'MW', 'name': 'Middleweight'},
                {'wc': 'LHW', 'name': 'Light Heavyweight'},
                {'wc': 'HW', 'name': 'Heavyweight'}
            ],
            weightClassDropDownVis: false
        }
    },
    methods: {
        changeWeightClass (wc) {
            this.$emit('switchWC', wc)
        },
        evalIfActive (wc) {
            if (this.activeWc === wc) {
                return true
            } else {
                return false
            }
        },
        toggleDropdown() {
            if (this.weightClassDropDownVis) {
                this.weightClassDropDownVis = false
            } else {
                this.weightClassDropDownVis = true
            }
        },
        resolveWeightClass (myKey) {
            return rankingWeightClassDict[myKey];
        },
    }
}
</script>