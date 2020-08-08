<template>
  <transition name="modal-fade">
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Additional Information</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <h2> Weight Class Relative Ranking </h2>
                    <p>  Overall rankings are reached by calculating the percentile ranks within the weight class for each of a fighter's core Elo rankings. </p>
                    <ul>
                        <li> Striking Offense </li>
                        <li> Striking Defense </li>
                        <li> Grappling Offense </li>
                        <li> Grappling Defense </li>
                    </ul>
                    <p> These ranks are then totaled for each fighter, and again percentile ranked against the division.  As these ranks are relative to the peers in the weight class, they do not compare across divisions.  This is also a shorthand method, with each of the components equally weighted.  The prediction algorithm evaluates these, along with other features, in a non-linear method. </p> 
                    <blockquote> For a component level breakdown of each of a fighter's Elo rankings, click on a fighter's name. </blockquote>
                </div>
            </section>
            <footer class="modal-card-foot">
                <!-- <button class="button is-success">Save changes</button> -->
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
    </div>
  </transition>
</template>

<script>

export default {
    name: 'infoRankModal',
    props: {
        
    },
    methods: {
        close () {
            this.$emit('closeRankInfo')
        }
    }
}
</script>

<style scoped>
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
</style>