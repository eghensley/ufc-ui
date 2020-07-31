<template>
    <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Fights</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <div v-for="fight in pastFightMetaList" :key="fight.oid">
                    <a class="dropdown-item" v-bind:class="{ 'is-active': isFightActive(fight) }" v-on:click="newfight(fight['fightId'])">{{fight['fightName']}}</a>
                    <hr class="dropdown-divider">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "fightDropdown",
    props: {
        pastFightMetaList: {type: Array, default: function () { return []}},
        curFightId: {type: String, default: null}
    },
    methods: {
        isFightActive (fight) {
            if (fight.fightId === this.curFightId) {
                return true
            } else {
                return false
            }
        },
        newfight (newFightId) {
            this.$emit('newFightId', newFightId)
        }
    }
}
</script>