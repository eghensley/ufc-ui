<template>
    <div class="column is-12"> 
        <section v-if="adminUpdateLoading" class="hero is-info is-small" id="loadingRibbon">
            <div class="container">
                <h1 class="title"> Loading ... </h1>
                <a class="navbar-item is--brand">
                    <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                </a>
                <h1 class="w3-xxxlarge" v-if="adminUpdateLoading && !adminUpdateInitialized"> {{adminUpdateInitPage()}} </h1>
            </div>
        </section>
        <AdminUpdateBoutTable
            v-if="updateBoutsVisible"
            :selectedFightId="fightId"
            :adminBoutTablePw="pw"
            @return="hideBouts"
        />
        <div v-if="!adminUpdateLoading && !updateBoutsVisible" class="card events-card">
            <header class="card-header">
                <p class="card-header-title">
                Fights
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
                            <tr v-for="fight in pastFightMeta" :key="fight.oid">
                                <td width="5%">
                                    <i class="fa fa-bell-o"></i>
                                </td>
                                <td>
                                    <div> {{fight['fightName']}} </div>
                                </td>
                                <td>
                                    <a v-on:click="resetFight(fight.oid)" class="button is-small" v-bind:class="{ 'is-danger': fight.completed,  'is-primary': !fight.completed  }">Clear</a>
                                    <div class="is-small"> </div>
                                </td>
                                <td>
                                    <a :disabled="fight.completed" v-on:click="addBoutsToFight(fight)" class="button is-small" v-bind:class="{ 'is-danger': fight.completed,  'is-primary': !fight.completed  }">Parse</a>
                                    <div class="is-small"> </div>
                                </td>
                                <td>
                                    <a v-if="!fight.completed" v-on:click="displayBoutTable(fight)" class="button is-small is-warning">Bout Details</a>
                                    <div class="is-small"> </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <footer class="card-footer">
                        <a>Placeholder Footer..</a>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import AdminUpdateBoutTable from '@/components/Admin/Update/AdminUpdateBoutTable.vue'

export default {
    name: 'AdminUpdateWrapper',
    components: {
        AdminUpdateBoutTable
    },
    props: {
        pw: {type: String}
    },
    data () {
        return {
            updateBoutsVisible: false,
            adminUpdateLoading: true,
            adminUpdateInitialized: false,
            pastFightMeta: [],
            fightId: null
        }
    },
    methods: {
        adminUpdateInitPage () {
            console.log("init!")
            this.adminUpdateInitialized = true
            ApiService.getRecentFights()
                .then(
                fights => {
                    this.pastFightMeta = fights['response']//.slice(1, fights.length)
                }
                ).catch(error => console.log(error))
                .finally(
                    () => {
                        this.adminUpdateLoading = false 
                    }
                )
        },
        resetFight (fightOid) {
            this.adminUpdateLoading = true
            ApiService.resetFightData(this.pw, fightOid)
                .then(
                    () => {
                        this.adminUpdateInitPage ()
                    }
                )
        },
        displayBoutTable (fight) {
            this.fightId = fight.fightId
            this.updateBoutsVisible = true
        },
        addBoutsToFight (fight) {
            if (!fight.completed) {
                this.adminUpdateLoading = true
                var selectedDate = new Date(fight.fightDate)
                var now = new Date();
                now.setHours(0,0,0,0);
                if (selectedDate < now) {
                    ApiService.addBoutsToPastFight(this.pw, fight.fightId)
                    .then(
                        () => {
                            this.adminUpdateInitPage ()
                        }
                    )
                } else {
                    ApiService.addBoutsToFutFight(this.pw, fight.fightId)
                    .then(
                        () => {
                            this.adminUpdateInitPage ()
                        }
                    )                
                }
            }
        },
        hideBouts () {
            this.updateBoutsVisible = false
        }
    }
}
</script>