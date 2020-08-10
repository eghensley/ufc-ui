<template>
    <div class="card events-card">

        <header class="card-header">
            <p class="card-header-title">
                <span>
                    Fight Location
                </span>
            </p>
            <a class="card-header-icon" v-on:click="toggleFightInfoVis()">
                <span class="icon">
                    <i aria-hidden="true" v-bind:class="{ 'fa fa-angle-up': showFightInfo, 'fa fa-angle-down': !showFightInfo }"></i>
                </span>
            </a>
        </header>
        <div class="card-content" v-if="showFightInfo">
            <div class="content">
                <section class="info-tiles" id="fightInfo">
                    <div class="tile is-small is-ancestor has-text-centered">
                        <div class="tile is-small is-parent">
                            <article class="tile is-child box">
                                <p class="title"> {{ fightLocation['country']['countryName'] }} </p>
                                <p class="subtitle"> Country </p>
                            </article>
                        </div>

                        <div class="tile is-small is-parent">
                            <article class="tile is-child box">
                                <p class="title"> {{ fightLocation['stateName'] }} </p>
                                <p class="subtitle"> State </p>
                            </article>
                        </div>

                        <div class="tile is-small is-parent">
                            <article class="tile is-child box">
                                <p class="title"> {{ fightLocation['cityName'] }} </p>
                                <p class="subtitle"> City </p>
                            </article>
                        </div>
                    </div>
                </section>                                
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'fightInfo',
    components: {

    },
    props: {
        fightLocation: {
            type: Object, default: function () { 
                return {
                    'cityName': 'null',
                    'stateName': 'null',
                    'country': {
                        'countryName': 'null'
                    }
                }
            }
        }
    },
    methods: {
        toggleFightInfoVis () {
            if (this.showFightInfo){
                this.showFightInfo = false
            } else {
                this.showFightInfo = true
            }
        }
    },
    data () {
        return {
            showFightInfo: false   
        }
    }
}
</script>