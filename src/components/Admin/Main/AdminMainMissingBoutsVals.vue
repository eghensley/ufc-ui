<template>
    <div class="container">
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-vertical">
                <div class="tile is-parent" v-if="compLoading">
                    <article class="tile is-child box">
                        <p class="subtitle"> Loading </p>
                        <img class="navbar-brand-logo" src="@/assets/loading.gif" alt="Loading">
                        <h1 v-if="ifLoggedIn && !compInitialized"> {{getMissingValues()}} </h1>
                    </article>
                </div>

                <div class="tile is-parent" v-if="!haveMissing && !compLoading">
                    <article class="tile is-child box notification is-success">
                        <p class="subtitle"> Fights Missing Bout Info </p>
                        <p class="title"> 0 </p>
                    </article>
                </div>

                <div class="tile" v-if="haveMissing && !compLoading">
                    <div class="tile is-parent is-vertical" v-for="missingFight in missingValues['fights']" :key="missingFight.oid">
                        <article class="tile is-child notification is-danger">
                            <p class="title">{{missingFight[0]}}</p>
                            <p class="subtitle">{{missingFight[1]}} Missing Bouts</p>
                        </article>
                    </div>
                </div>    
            </div>   
        </div>         
    </div>
</template>

<script>

import ApiService from '@/services/ApiService.js'

export default {
    name: 'adminMainMissingBoutInfo',
    props: {
        pw: {type: String},
        ifLoggedIn: {type: Boolean, default: false}
    },
    data () {
        return {
            missingValues: {
                fights: [] 
            },
            haveMissing: false,
            compLoading: true,
            compInitialized: false
        }
    },
    methods: {
        evalIfMissing () {
            if (this.missingValues.fights.length > 0) {
                return true
            } else {
                return false
            }
        },
        getMissingValues () {
            if (this.ifLoggedIn) {
                this.compInitialized = true
                ApiService.getIncompleteBoutsCount(this.pw)
                    .then(
                        incompleteBouts => {
                            this.missingValues.fights = incompleteBouts['response']
                            if (this.evalIfMissing()) {
                                this.haveMissing = true
                            }
                        }
                    )
                this.compLoading = false  
            }          
        }
    }
}
</script>