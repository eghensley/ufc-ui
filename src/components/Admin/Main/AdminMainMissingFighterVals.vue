<template>
    <div class="container">
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-horizontal info-tiles">
                <div class="tile is-parent" v-if="compLoading">
                    <article class="tile is-child box">
                        <p class="subtitle"> Loading </p>
                        <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                        <h1 v-if="ifLoggedIn && !compInitialized"> {{getMissingValues()}} </h1>
                    </article>
                </div>

                <div class="tile is-parent" v-if="!compLoading">
                    <article class="tile is-child box notification" v-bind:class="{ 'is-success': missingValues.fighterMissingAge.success,  'is-warning': missingValues.fighterMissingAge.warning}">
                        <p class="subtitle"> Fighters Missing Age </p>
                        <p class="title"> {{missingValues.fighterMissingAge.count}} </p>
                    </article>
                </div>

                <div class="tile is-parent" v-if="!compLoading">
                    <article class="tile is-child box notification" v-bind:class="{ 'is-success': missingValues.fighterMissingHeight.success,  'is-warning': missingValues.fighterMissingHeight.warning}">
                        <p class="subtitle"> Fighters Missing Height </p>
                        <p class="title"> {{missingValues.fighterMissingHeight.count}} </p>
                    </article>
                </div>

                <div class="tile is-parent" v-if="!compLoading">
                    <article class="tile is-child box notification" v-bind:class="{ 'is-success': missingValues.fighterMissingReach.success,  'is-warning': missingValues.fighterMissingReach.warning}">
                        <p class="subtitle"> Fighters Missing Reach </p>
                        <p class="title"> {{missingValues.fighterMissingReach.count}} </p>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ApiService from '@/services/ApiService.js'

export default {
    name: 'adminMainMissingFighterInfo',
    props: {
        pw: {type: String},
        ifLoggedIn: {type: Boolean, default: false}
    },
    data () {
        return {
            missingValues: {
                fighterMissingAge: {
                    count: 99,
                    danger: false,
                    warning: true,
                    success: false
                },
                fighterMissingHeight: {
                    count: 99,
                    danger: false,
                    warning: true,
                    success: false
                },
                fighterMissingReach: {
                    count: 99,
                    danger: false,
                    warning: true,
                    success: false
                }
            },
            compLoading: true,
            compInitialized: false
        }
    },
    methods: {
        getMissingValues () {
            if (this.ifLoggedIn) {
                this.compInitialized = true
                ApiService.getFightersMissingAgeCount(this.pw)
                    .then(
                        ageCount => {
                            this.missingValues.fighterMissingAge.count = ageCount['response']
                            if (ageCount['response'] > 0) {
                                this.missingValues.fighterMissingAge.warning = true
                                this.missingValues.fighterMissingAge.success = false
                            } else {
                                this.missingValues.fighterMissingAge.warning = false
                                this.missingValues.fighterMissingAge.success = true                                
                            }
                        }
                    )
                ApiService.getFightersMissingHeightCount(this.pw)
                    .then(
                        heightCount => {
                            this.missingValues.fighterMissingHeight.count = heightCount['response']
                            if (heightCount['response'] > 0) {
                                this.missingValues.fighterMissingHeight.warning = true
                                this.missingValues.fighterMissingHeight.success = false
                            } else {
                                this.missingValues.fighterMissingHeight.warning = false
                                this.missingValues.fighterMissingHeight.success = true                                
                            }
                        }
                    )
                ApiService.getFightersMissingReachCount(this.pw)
                    .then(
                        reachCount => {
                            this.missingValues.fighterMissingReach.count = reachCount['response']
                            if (reachCount['response'] > 0) {
                                this.missingValues.fighterMissingReach.warning = true
                                this.missingValues.fighterMissingReach.success = false
                            } else {
                                this.missingValues.fighterMissingReach.warning = false
                                this.missingValues.fighterMissingReach.success = true                                
                            }
                        }
                    )
                this.compLoading = false  
            }          
        }
    }
}
</script>