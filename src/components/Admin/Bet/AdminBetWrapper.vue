<template>
    <div class="column is-12"> 
        <section v-if="adminBetLoading" class="hero is-info is-small" id="loadingRibbon">
            <div class="container">
                <h1 class="title"> Loading ... </h1>
                <a class="navbar-item is--brand">
                    <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                </a>
                <h1 class="w3-xxxlarge" v-if="adminBetLoading && !adminBetInitialized"> {{adminBetInitPage()}} </h1>
            </div>
        </section>
        <AdminBetBoutTable
            v-if="updateBetBoutsVisible"
            :selectedBetFightId="betFightId"
            :adminBetBoutTablePw="betPw"
            @return="hideBouts"
        />
        <div v-if="!adminBetLoading && !updateBetBoutsVisible" class="card events-card">
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
                                    <a v-if="fight.completed" v-on:click="displayBetBoutTable(fight)" class="button is-small is-link">Bout Details</a>
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
import AdminBetBoutTable from '@/components/Admin/Bet/AdminBetBoutTable.vue'

export default {
    name: 'AdminBetWrapper',
    components: {
        AdminBetBoutTable
    },
    props: {
        betPw: {type: String}
    },
    data () {
        return {
            updateBetBoutsVisible: false,
            adminBetLoading: true,
            adminBetInitialized: false,
            pastFightMeta: [],
            betFightId: null
        }
    },
    methods: {
        adminBetInitPage () {
            console.log("init!")
            this.adminBetInitialized = true
            ApiService.getRecentFights()
                .then(
                fights => {
                    this.pastFightMeta = fights['response']//.slice(1, fights.length)
                }
                ).catch(error => console.log(error))
                .finally(
                    () => {
                        this.adminBetLoading = false 
                    }
                )
        },
        displayBetBoutTable (fight) {
            this.betFightId = fight.fightId
            this.updateBetBoutsVisible = true
        },
        hideBouts () {
            this.updateBetBoutsVisible = false
        }
    }
}
</script>