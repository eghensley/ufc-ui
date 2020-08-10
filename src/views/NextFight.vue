<template>
  <div class="container">
    <section class="hero is-info welcome is-small" id="myHeader">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-four-fifths">
            <h2 class="title" v-if="!fightScreenLoading"> {{ selectedFightName }} </h2>
            <h2 class="subtitle" v-if="!fightScreenLoading"> {{ convToDate(selectedFightDate) }} </h2>
          </div>
          <!-- <div class="column">
            <FightDropdown
              v-if="!fightScreenLoading"
              :pastFightMetaList="fightScreenFights"
              :curFightId="selectedFightId"
              @newFightId="switchFightScreenFight"
            />
          </div> -->
        </div>
        <h1 class="w3-xxxlarge" v-if="fightScreenLoading && !fightScreenInitialized"> {{initFightMain()}} </h1>
      </div>
    </section>
    <FightWrapper
      v-if="!fightScreenLoading"
      :fightId="selectedFightId"
      :fightName="selectedFightName"
      @newFightId="switchFightScreenFight"
      :fightMetaList="fightScreenFights"
    />
  </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'
import FightWrapper from '@/components/Fight/FightWrapper.vue'
//import FightDropdown from '@/components/FightDropdown.vue'

export default {
  name: 'fight',
  components: {
    FightWrapper
  },
  data () {
    return {
      fightScreenLoading: true,
      fightScreenInitialized: false,
      selectedFightId: null,
      selectedFightName: '',
      selectedFightDate: '',
      fightScreenFights: [],
      fightScreenSummaries: {}
    }
  },
  methods: {
    initFightMain () {
      this.fightScreenInitialized = true
      ApiService.getRecentFights()
          .then(
          fights => {
              this.fightScreenFights = fights['response']//.slice(1, fights.length)
              this.selectedFightId = this.fightScreenFights[0].fightId
              this.selectedFightName = this.fightScreenFights[0].fightName
              this.selectedFightDate = this.fightScreenFights[0].fightDate
              var i;
              for (i = 0; i < this.fightScreenFights.length; i++) {
                this.fightScreenSummaries[this.fightScreenFights[i].fightId] = {'fightName': this.fightScreenFights[i].fightName, 'fightDate': this.fightScreenFights[i].fightDate}
              } 
          }
          ).catch(error => console.log(error))
          .finally(
              () => {
                  this.fightScreenLoading = false
              }
          )
      console.log('init fights page')
    },
    switchFightScreenFight (newFightId) {
      this.selectedFightId = newFightId
      this.selectedFightName = this.fightScreenSummaries[this.selectedFightId].fightName
      this.selectedFightDate = this.fightScreenSummaries[this.selectedFightId].fightDate
    },
    convToDate (rawDate) {
        var rawDateComps = rawDate.split('T')[0].split('-')
        var date = new Date(parseInt(rawDateComps[0]), parseInt(rawDateComps[1]), parseInt(rawDateComps[2])) 
        // var date = Date.parse(.replace())//.replace('T', ''))
        return date.toLocaleDateString()
    }
  }
}
</script>
