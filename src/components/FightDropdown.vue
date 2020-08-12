<template>
    <div class="card events-card is-hidden-tablet is-hidden-widescreen">
        <header class="card-header ">
            <p class="card-header-title">
                Fight Selection
            </p>
            <a class="card-header-icon" v-on:click="toggleDropdown()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': fightDropDownVis, 'fas fa-chevron-circle-down': !fightDropDownVis }"></i>
                </span>
            </a>
        </header>

        <div class="card-table" v-if="fightDropDownVis">
            <!-- <div class="card-table"> -->
                <table class="table is-fullwidth is-shadow-longer">
                    <thead>
                        <tr class="is-shadow-sharp">
                            <th></th>
                            <th>Fight Name</th>
                            <th>Date</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="newfight(fight.fightId)" class="is-shadow-dreamy" v-for="fight in pastFightMetaList" :key="fight.oid" v-bind:class="{'is-active': isFightActive(fight) }">
                            <td width="5%">
                                <span class="icon">
                                 <i class="fas fa-arrow-circle-right" v-if="isFightActive(fight)"></i>
                                 </span>   
                            </td>
                            <td>
                                <a :disabled="isFightActive(fight)"> 
                                    {{abbrevFight(fight.fightName) }}
                                    <!-- <span class="icon">
                                        <i class="fas fa-plus-square" v-if="!isFightActive(fight)"></i>
                                        <i class="far fa-dot-circle" v-if="!isFightActive(fight)"></i> 
                                    </span>  -->                               
                                </a>
                            </td>
                            <td>
                                <div class="is-small"> {{convToDate(fight.fightDate)}} </div>
                            </td>
                            <td>
                                <!-- <a :disabled="isFightActive(fight)" class="button is-small" v-bind:class="{ 'is-link': isFightActive(fight), 'is-link': !isFightActive(fight)}" @click="newfight(fight.fightId)">
                                    <span class="icon">
                                        <i class="fas fa-plus-square" v-if="isFightActive(fight)"></i>
                                        <i class="far fa-dot-circle" v-if="!isFightActive(fight)"></i>
                                    </span>
                                </a>
                                <div class="is-small"> </div> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <footer class="card-footer">
                    <a></a>
                </footer>
            <!-- </div> -->
        </div>

    </div>
    <!-- <div class="dropdown is-left" v-on:click="toggleDropdown()" v-bind:class="{ 'is-active': fightDropDownVis }">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="fight-dropdown-menu">
                <span>Change Fight</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="fight-dropdown-menu" role="menu">
            <div class="dropdown-content">
                <div v-for="fight in pastFightMetaList" :key="fight.oid">
                    <a class="dropdown-item" v-bind:class="{ 'is-active': isFightActive(fight) }" v-on:click="newfight(fight['fightId'])">{{fight['fightName']}}</a>
                    <hr class="dropdown-divider">
                </div>
            </div>
        </div>
    </div> -->
</template>

<script>
export default {
    name: "fightDropdown",
    props: {
        pastFightMetaList: {type: Array, default: function () { return []}},
        curFightId: {type: String, default: null},
        curFightName: {type: String, default: null}
    },
    data () {
        return {
            fightDropDownVis: true
        }
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
            this.$emit('switchFight', newFightId)
            this.fightDropDownVis = false
        },
        toggleDropdown() {
            if (this.fightDropDownVis) {
                this.fightDropDownVis = false
            } else {
                this.fightDropDownVis = true
            }
        },
        abbrevFight (name) {
            return name.split(':')[1]
        },
        convToDate (rawDate) {
            var rawDateComps = rawDate.split('T')[0].split('-')
            var date = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1]), parseInt(rawDateComps[2])) 
            return date.toLocaleDateString()
        }
    }
}
</script>