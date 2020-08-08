<template>
    <aside class="column is-2 aside is-hidden-mobile">
        <nav class="menu">
            <p class="menu-label"> Weight Classes </p>
            <ul class="menu-list" v-for="weightClass in weightClasses" :key="weightClass.wc">
                <li>
                    <a v-on:click="changeWeightClass(weightClass.wc)" v-bind:class="{ 'is-active': evalIfActive(weightClass.wc) }">
                        {{ weightClass.name }}
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
export default {
    name: 'rankingAside',
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
            ]
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
        }
    }
}
</script>