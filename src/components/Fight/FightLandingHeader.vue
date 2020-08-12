<template>
    <section class="hero is-primary welcome is-small is-shadow-sharp" id="myHeader">
        <div class="hero-body">
            <div class="columns">
                <div class="column is-four-fifths">
                    <h2 class="title"> Fight Information </h2>
                    <h2 class="subtitle" v-if="!fightSelected"> Please select a fight </h2>
                    <h2 class="subtitle" v-if="fightSelected"> {{ selectedFightName }} </h2>
                </div>
                <div class="column">
                    <h2 class="subtitle is-hidden-mobile" v-if="fightSelected"> {{ convToDate(selectedFightDate) }} </h2>
                </div>
            </div>
        </div>
    </section>         
</template>

<script>
export default {
    name: 'fightLandingHeader',
    props: {
        fightSelected: {type: Boolean},
        selectedFightName: {type: String},
        selectedFightDate: {type: String}
    },
    methods: {
        convToDate (rawDate) {
            var rawDateComps = rawDate.split('T')[0].split('-')
            var date = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1]), parseInt(rawDateComps[2])) 
            return date.toLocaleDateString()
        }
    }
}
</script>