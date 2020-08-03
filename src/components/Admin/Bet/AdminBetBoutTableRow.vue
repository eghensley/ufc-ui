<template>
    <div class="field">
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Fighter</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="fighter" value="0" v-bind:id="'xrefPicked-' + betBout.boutId" v-model="xRefPicked">
                                {{betBout['fighterBoutXRefs'][0]['fighter']['fighterName']}}
                        </label>
                        <label class="radio">
                            <input type="radio" name="fighter" value="1" v-bind:id="'xrefPicked-' + betBout.boutId" v-model="xRefPicked">
                                {{betBout['fighterBoutXRefs'][1]['fighter']['fighterName']}}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Bet Amount</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <p class="control">
                        <input class="input" type="text" v-bind:id="'betAmount-' + betBout.boutId" v-model="updatedBetAmount" :placeholder="{updatedBetAmount}">
                    </p>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Bet Result</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <p class="control">
                        <input class="input" type="text" v-bind:id="'betResult-' + betBout.boutId" v-model="updatedBetResult" :placeholder="{updatedBetResult}">
                    </p>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Bet Made</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="betMade" v-bind:id="'betMade-' + betBout.boutId" v-model="updatedBetMade" v-bind:value="true">
                                Yes
                        </label>
                        <label class="radio">
                            <input type="radio" name="betMade" v-bind:id="'betMade-' + betBout.boutId" v-model="updatedBetMade" v-bind:value="false">
                                No
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Bet Predicted</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="betPredicted" id="updatedBetPred" v-model="updatedBetPred" v-bind:value="true">
                                Yes
                        </label>
                        <label class="radio">
                            <input type="radio" name="betPredicted" id="updatedBetPred" v-model="updatedBetPred" v-bind:value="false">
                                No
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">   
                <div class="field has-addons">
                    <p class="control">
                        <a @click="resetBetBoutUpdate" class="button">Reset</a>
                    </p>
                    <p class="control">
                        <a @click="submitBetBoutUpdate" class="button" v-bind:class="{ 'is-primary': !sucSave, 'is-loading': updateInProgress, 'is-warning': sucSave}"> {{formButtonText()}}</a>
                    </p>
                </div>
        </div>
        <!-- <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label"> {{betBout['fighterBoutXRefs'][0]['fighter']['fighterName']}} VS {{betBout['fighterBoutXRefs'][1]['fighter']['fighterName']}} </label>
            </div>
            <div class="field-body">
                <div class="field">
                    <p class="control">
                        <input type="checkbox" id="updatedChampBout" v-model="updatedChampBout" :placeholder="{updatedChampBout}">
                        <span class="icon is-small is-left">
                            <i class="fa fa-trophy"></i>
                        </span>
                    </p>
                </div>
                <div class="field is-narrow">
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="betOnFighter">
                                <option></option>
                                <option>{{fighter1.name}}</option>
                                <option>{{fighter2.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field has-addons">
                    <p class="control">
                        <a @click="resetFutBoutUpdate" class="button">Reset</a>
                    </p>
                    <p class="control">
                        <a @click="submitFutBoutUpdate" class="button is-primary" v-bind:class="{ 'is-loading': updateInProgress}">Update</a>
                    </p>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'

export default {
    name: 'adminBetBoutTableRow',
    props: {
        adminBetBoutRowPw: {type: String, default: null},
        betBout: {type: Object, default: function () { 
                return {
                    'fighterBoutXRefs': [
                        {
                            'fighter': {'fighterName': null}
                        },
                        {
                            'fighter': {'fighterName': null}
                        }
                    ],
                    'schedRounds': null,
                    'champBout': null
                }
            }
        }
    },
    created () {

        if (this.betBout.boutId === 'd292243c6499b2fe'){
            console.log(this.betBout)
        }
        if (this.betBout.fighterBoutXRefs[0].betMade != null) {
            this.sucSave = true
            this.updatedBetResult = this.betBout.fighterBoutXRefs[0].betResult
            this.updatedBetAmount = this.betBout.fighterBoutXRefs[0].betAmount
            this.updatedBetMade = this.betBout.fighterBoutXRefs[0].betMade
            this.updatedBetPred = this.betBout.fighterBoutXRefs[0].betPred
            this.betFighter = this.betBout.fighterBoutXRefs[0].fighter
            this.betOid = this.betBout.fighterBoutXRefs[0].oid
            this.xRefPicked = "0"
         } else if (this.betBout.fighterBoutXRefs[1].betMade != null) {
            this.sucSave = true
            this.updatedBetResult = this.betBout.fighterBoutXRefs[1].betResult
            this.updatedBetAmount = this.betBout.fighterBoutXRefs[1].betAmount
            this.updatedBetMade = this.betBout.fighterBoutXRefs[1].betMade
            this.updatedBetPred = this.betBout.fighterBoutXRefs[1].betPred
            this.betFighter = this.betBout.fighterBoutXRefs[1].fighter
            this.betOid = this.betBout.fighterBoutXRefs[1].oid
            this.xRefPicked = "1"
         } else {
            this.sucSave = false
            this.updatedBetResult = null
            this.updatedBetAmount = null
            this.updatedBetMade = null
            this.updatedBetPred = null
            this.betFighter = null
            this.betOid = null
            this.xRefPicked = null
         }
    },
    watch: { 
        // betResult: function(newVal, oldVal) { // watch it
        //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        //     this.updatedBetResult = newVal
        // },
        // betAmount: function(newVal, oldVal) { // watch it
        //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        //     this.updatedBetAmount = newVal
        // },
        // betMade: function(newVal, oldVal) { // watch it
        //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        //     this.updatedBetMade = newVal
        // },
        // betPred: function(newVal, oldVal) { // watch it
        //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        //     this.updatedBetPred = newVal
        // },
    },
    data () {
        return {
            updateInProgress: false,
            updatedBetResult: null,
            updatedBetAmount: null,
            updatedBetMade: null,
            updatedBetPred: null,
            betOid: null,
            betFighter: null,
            xRefPicked: null,
            sucSave: false
        }
    },
    methods: {
        submitBetBoutUpdate () {
            this.updateInProgress = true

            console.log('Fighter: ' + this.betBout.fighterBoutXRefs[parseInt(this.xRefPicked)].fighter.fighterName)
            console.log('Bet Result: ' + this.updatedBetResult)
            console.log('Bet Amount: ' + this.updatedBetAmount)
            console.log('Bet Predicted: ' + this.updatedBetPred)
            console.log('Bet Made: ' + this.updatedBetMade)

            var updatePayload = { 'oid': this.betBout.fighterBoutXRefs[parseInt(this.xRefPicked)].oid,
                                'betMade': this.updatedBetMade,
                                'betPredicted': this.updatedBetPred,
                                'betAmount': this.updatedBetAmount,
                                'betResult': this.updatedBetResult,
                                'fighter': this.betBout.fighterBoutXRefs[parseInt(this.xRefPicked)].fighter
            }

            console.log(updatePayload)

           ApiService.addBetInfo(updatePayload, this.adminBetBoutRowPw)
            .then(
                () => {
                   
                }
                ).catch(error => console.log(error)).finally(
                () => { 
                    this.updateInProgress = false 
                    this.sucSave = true
                    }
                )
        },
        resetBetBoutUpdate () {
            this.updatedRounds = null
            this.updatedChampBout = false
        },
        evalIfMissing () {
            if (this.betBout.fighterBoutXRefs[0]['betMade'] === null && this.betBout.fighterBoutXRefs[1]['betMade'] === null){
                return true
            } else {
                return false
            }
        },
        formButtonText () {
            if (this.evalIfMissing()) {
                return 'Add'
            } else {
                return 'Update'
            }
        }
    }
}
</script>