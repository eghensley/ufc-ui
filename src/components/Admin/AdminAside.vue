<template>
    <aside class="column is-2 aside">
        <nav class="menu">
            <p class="menu-label"> Functions </p>
            <ul class="menu-list">
                <li>
                    <a v-on:click="displayMainAdmin" v-bind:class="{ 'is-active': mainActive }">
                        <span class="icon is-small">
                            <i class="fa fa-desktop"></i>
                        </span>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a v-on:click="displayOddsAdmin" v-bind:class="{ 'is-active': oddsActive }">
                        <span class="icon is-small">
                            <i class="fa fa-calculator"></i>
                        </span>
                        Odds
                    </a>
                </li>
                <li>
                    <a v-on:click="displayUpdateAdmin" v-bind:class="{ 'is-active': updateActive }">
                        <span class="icon is-small">
                            <i class="fa fa-wrench"></i>
                        </span>
                        Update
                    </a>
                </li>
                <li>
                    <a v-on:click="displayBetAdmin" v-bind:class="{ 'is-active': betActive }">
                        <span class="icon is-small">
                            <i class="fa fa-suitcase"></i>
                        </span>
                        Bets
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
export default {
    name: 'adminAside',
    data () {
        return {
            mainActive: true,
            oddsActive: false,
            updateActive:false,
            betActive: false
        }
    },
    methods: {
        displayMainAdmin () {
            this.betActive = false
            this.oddsActive = false
            this.updateActive = false
            this.mainActive = true
            this.$emit('showMain')
        },
        displayOddsAdmin () {
            this.betActive = false
            this.mainActive = false
            this.updateActive = false
            this.oddsActive = true
            this.$emit('showOdds')
        },
        displayUpdateAdmin () {
            this.betActive = false
            this.mainActive = false
            this.oddsActive = false
            this.updateActive = true
            this.$emit('showUpdate')
        },
        displayBetAdmin () {
            this.mainActive = false
            this.oddsActive = false
            this.updateActive = false
            this.betActive = true
            this.$emit('showBet')
        }
    }
}
</script>