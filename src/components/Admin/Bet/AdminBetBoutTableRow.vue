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
                            <input type="radio" name="fighter">
                                {{betBout['fighterBoutXRefs'][0]['fighter']['fighterName']}}
                        </label>
                        <label class="radio">
                            <input type="radio" name="fighter">
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
                        <input class="input" type="text" placeholder="Amount Bet">
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
                        <input class="input" type="text" placeholder="Bet Result">
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
                            <input type="radio" name="betMade">
                                Yes
                        </label>
                        <label class="radio">
                            <input type="radio" name="betMade">
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
                        <a @click="submitBetBoutUpdate" class="button is-primary" v-bind:class="{ 'is-loading': updateInProgress}">Update</a>
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
// import ApiService from '@/services/ApiService.js'

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
        },
        champBout: {type: Boolean, default: false},
        schedRounds: {type: Number, default: null}
    },
    created () {
        
    },
    watch: { 
        champBout: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            this.updatedChampBout = newVal
        },
        schedRounds: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            this.updatedRounds = newVal
        }
    },
    data () {
        return {
            updateInProgress: false
        }
    },
    methods: {
        submitBetBoutUpdate () {
            this.updateInProgress = true
            if (this.updatedChampBout === null) {
                this.updatedChampBout = false
            }
            var updatePayload = {'oid': this.betBout.oid, 'schedRounds': this.updatedRounds, 'champBout': this.updatedChampBout}
            console.log(updatePayload)
        //    ApiService.addFutureBoutSummary(this.adminBetBoutRowPw, updatePayload)
        //     .then(
        //         () => {
                   
        //         }
        //         ).catch(error => console.log(error)).finally(
        //         () => { 
        //             this.updateInProgress = false 
        //             }
        //         )
        },
        resetBetBoutUpdate () {
            this.updatedRounds = null
            this.updatedChampBout = false
        }
    }
}
</script>