<template>
  <transition name="modal-fade">
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Odds</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <form @submit="updateBoutOdds">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label"> {{bout['fighterBoutXRefs'][0]["fighter"]["fighterName"]}} </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-danger" id="fighter1Odds" type="number" required="true" v-model.number="bFighter1Odds">
                                </div>
                                <p class="help is-danger"> This field is required </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label"> {{bout['fighterBoutXRefs'][1]["fighter"]["fighterName"]}} </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-danger" id="fighter2Odds" type="number" required="true" v-model.number="bFighter2Odds">
                                </div>
                                <p class="help is-danger"> This field is required </p>
                            </div>
                        </div>
                    </div>
                    <input class="button is-primary" type="submit">
                </form>
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

import ApiService from '@/services/ApiService.js'

var stanceDict = {
    'SW': 'Switch',
    'OR': 'Orthodox',
    'SP': 'Southpaw'
}

export default {
    name: 'updateOddsModal',
    props: {
        pw: {type: String},
        bout : {
            type: Object, default: function () { 
                return {
                    'fighterBoutXRefs':[
                        {
                            'fighter': {
                                'oid': 'null',
                                'fighterId': 'null',
                                'fighterName': 'null',
                                'reach': null,
                                'height': null,
                                'dob': 'null',
                                'stance': 'null'
                            },
                            'mlOdds': null
                        },
                        {
                            'fighter': {
                                'oid': 'null',
                                'fighterId': 'null',
                                'fighterName': 'null',
                                'reach': null,
                                'height': null,
                                'dob': 'null',
                                'stance': 'null'
                            },
                            'mlOdds': null
                        }
                    ]
                }
            }
        }
    },
    data () {
        return {
            bFighter1Odds: null,
            bFighter2Odds: null
        } 
    },
    methods: {
        close () {
            this.bFighter1Odds = null
            this.bFighter2Odds = null
            this.$emit('closeOdds')
        },
        resolveStance (myKey) {
            return stanceDict[myKey];
        },
        convAmericanOddsToImpPerc (amerOdds) {
            if (amerOdds === 100) {
                return 50
            } else if (amerOdds > 100) {
                return (100 / (amerOdds + 100)) * 100
            } else {
                return ((-1 * amerOdds) / ((-1 * amerOdds) + 100)) * 100
            }
        },
        convImpProbToAmerOdds (impProb) {
            if (impProb === 50) {
                return '+100'
            } else if (impProb < 50) {
                return '+' + Math.round(((100 / (impProb / 100)) - 100) * 10) / 10
            } else {
                return Math.round((impProb / (1 - (impProb / 100))) * -10) / 10
            }
        },
        updateBoutOdds: function (e) {
            e.preventDefault()

            console.log(this.bFighter1Odds)
            console.log(this.bFighter2Odds)

            ApiService.addMyBookieOdds({ 'oid': this.bout.fighterBoutXRefs[0].oid, 'mlOdds': this.convAmericanOddsToImpPerc(this.bFighter1Odds) }, self.pw)
                .then(
                    oddsUpdate1 => {
                        console.log('Fighter 2 odds updated successfully')
                        console.log(oddsUpdate1)
                    }
                ).catch(
                    error1 => {
                        console.log('Fighter 2 odds failed to update')
                        console.log(error1)
                    }
                )
            ApiService.addMyBookieOdds({ 'oid': this.bout.fighterBoutXRefs[1].oid, 'mlOdds': this.convAmericanOddsToImpPerc(this.bFighter2Odds) }, self.pw)
                .then(
                    oddsUpdate2 => {
                        console.log('Fighter 2 odds updated successfully')
                        console.log(oddsUpdate2)
                    }
                ).catch(
                    error2 => {
                        console.log('Fighter 2 odds failed to update')
                        console.log(error2)
                    }
                )

            this.close()
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