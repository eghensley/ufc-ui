<template>
    <div class="card events-card is-hidden-tablet is-hidden-widescreen">
        <header class="card-header is-bevel">
            <p class="card-header-title">
                Fight Selection
                <progress class="progress is-medium is-dark" max="100" v-if="!isLoaded">45%</progress>
            </p>
            <h1 v-if="!isLoaded"> {{evalIfLoaded()}} </h1>
            <a class="card-header-icon" v-on:click="toggleDropdown()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fas fa-chevron-circle-up': (fightDropDownVis && isLoaded), 'fas fa-chevron-circle-down': !(fightDropDownVis && isLoaded) }"></i>
                </span>
            </a>
        </header>
        

        <div class="card-table" v-if="fightDropDownVis && isLoaded">
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
                    <tr @click="newfight(fight.fightId)" class="is-shadow-inverted" v-for="fight in pastFightMetaList" :key="fight.oid" v-bind:class="{'is-active': isFightActive(fight) }">
                        <td width="5%">
                            <span class="icon">
                                <i class="fas fa-arrow-circle-right" v-if="isFightActive(fight)"></i>
                                </span>   
                        </td>
                        <td>
                            <a :disabled="isFightActive(fight)"> 
                                {{abbrevFight(fight.fightName) }}                           
                            </a>
                        </td>
                        <td>
                            <div class="is-small"> {{convToDate(fight.fightDate)}} </div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer class="card-footer">
                <a></a>
            </footer>
        </div>
    </div>
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
            fightDropDownVis: true,
            isLoaded: false
        }
    },
    methods: {
        evalIfLoaded () {
            if (this.pastFightMetaList.length !== 0) {
                this.isLoaded = true
            } 
        },
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
            if (this.isLoaded) {
                if (this.fightDropDownVis) {
                    this.fightDropDownVis = false
                } else {
                    this.fightDropDownVis = true
                }
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