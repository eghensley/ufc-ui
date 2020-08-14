<template>
    <div class="container">
        <section class="section">
            <section class="container">
                <div class="columns">
                    <aside class="column is-one-fifth aside">
                        <nav class="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li><a>Bet UFC</a></li>
                                <li class="is-active">
                                    <a>Home</a>
                                </li>
                            </ul>
                        </nav>
                        <nav class="menu">
                            <p class="menu-label"> Pages </p>
                            <ul class="menu-list">
                                <li>
                                    <a class="is-active">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <router-link to="/fights">
                                        Fights
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/rankings">
                                        Rankings
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <main class="column main">
                        <section class="hero is-primary welcome is-small is-shadow-sharp" id="myHeader">
                            <div class="hero-body">
                                <div class="container">
                                    <h2 class="title" v-if="!homeScreenLoading && fightInFuture"> Upcoming Fight </h2>
                                    <h2 class="title" v-if="!homeScreenLoading && !fightInFuture"> Most Recent Fight </h2>
                                    <h2 class="subtitle" v-if="!homeScreenLoading"> {{ selectedFightName }} </h2>
                                    <!-- <h2 class="subtitle" v-if="!homeScreenLoading"> {{ convToDate(selectedFightDate) }} </h2> -->

                                    <h1 class="title" v-if="homeScreenLoading"> 
                                        Loading ... 
                                        <span class="icon">
                                            <i class="fas fa-cog fa-spin" v-if="!homeScreenLoading"></i>
                                        </span>
                                    </h1>
                                    <!-- <progress class="progress is-medium is-dark" max="100" v-if="homeScreenLoading">45%</progress> -->

                                    <!-- <a class="navbar-item is--brand" v-if="homeScreenLoading">
                                        <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                                    </a> -->
                                </div>
                                <h1 class="w3-xxxlarge" v-if="homeScreenLoading && !homeScreenInitialized"> {{initHomeMain()}} </h1>
                            </div>
                        </section>

                        <br>
                        <FightBetTable
                            :future="fightInFuture"
                            :fightId="selectedFightId"
                            :fightSelected="true"
                        />
                        <HomeWrapper

                        />
                    </main>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import FightBetTable from '@/components/Fight/FightBetTable.vue'
import HomeWrapper from '@/components/Home/HomeWrapper.vue'

export default {
    name: 'home',
    components: {
        FightBetTable, HomeWrapper
    },
    data () {
        return {
            homeScreenLoading: true,
            homeScreenInitialized: false,
            selectedFightId: '',
            selectedFightName: '',
            selectedFightDate: '',
            fightLoading: true,
            fightInFuture: true
        }
    },
    methods: {
        initHomeMain () {
            this.homeScreenInitialized = true
            ApiService.getRecentFights()
                .then(
                fights => {
                    this.fightScreenFights = fights['response']//.slice(1, fights.length)
                    this.selectedFightId = this.fightScreenFights[0].fightId
                    this.selectedFightName = this.fightScreenFights[0].fightName
                    this.selectedFightDate = this.fightScreenFights[0].fightDate
                    this.fightInFuture = this.evalIfFightInFuture(this.selectedFightDate)
                }
                ).catch(error => console.log(error))
                .finally(
                    () => {
                        this.homeScreenLoading = false
                    }
                )
        },
        convToDate (rawDate) {
            var rawDateComps = rawDate.split('T')[0].split('-')
            var date = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1]), parseInt(rawDateComps[2])) 
            return date.toLocaleDateString()
        },
        evalIfFightInFuture (fightDate) {
            var rawDateComps = fightDate.split('T')[0].split('-')
            var selectedDate = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1])-1, parseInt(rawDateComps[2]) + 1) 
            var now = new Date();
            now.setHours(0,0,0,0);
            now.setHours(5,0,0,0);
            if (selectedDate < now) {
                return false
            } else {
                return true
            }
        },
  }
}
</script>