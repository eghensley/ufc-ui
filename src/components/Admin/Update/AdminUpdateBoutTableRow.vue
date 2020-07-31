<template>
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label"> {{bout['fighterBoutXRefs'][0]['fighter']['fighterName']}} VS {{bout['fighterBoutXRefs'][1]['fighter']['fighterName']}} </label>
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
                        <select v-model="updatedRounds" :placeholder="{updatedRounds}">
                            <option></option>
                            <option>3</option>
                            <option>5</option>
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
                <p class="control">
                    <a @click="addMlProb" class="button is-warning" v-bind:class="{ 'is-danger': bout['fighterBoutXRefs'][0]['expOdds'], 'is-loading': mlProbUpdateInProgress}">Add Prob</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'

export default {
    name: 'adminUpdateBoutTableRow',
    props: {
        adminBoutRowPw: {type: String, default: null},
        bout: {type: Object, default: function () { 
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
        this.updatedChampBout = this.champBout
        this.updatedRounds = this.schedRounds
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
            updatedRounds: null,
            updatedChampBout: null,
            updateInProgress: false,
            mlProbUpdateInProgress: false
        }
    },
    methods: {
        submitFutBoutUpdate () {
            this.updateInProgress = true
            if (this.updatedChampBout === null) {
                this.updatedChampBout = false
            }
            var updatePayload = {'oid': this.bout.oid, 'schedRounds': this.updatedRounds, 'champBout': this.updatedChampBout}
            console.log(updatePayload)
           ApiService.addFutureBoutSummary(this.adminBoutRowPw, updatePayload)
            .then(
                () => {
                   
                }
                ).catch(error => console.log(error)).finally(
                () => { 
                    this.updateInProgress = false 
                    }
                )
        },
        resetFutBoutUpdate () {
            this.updatedRounds = null
            this.updatedChampBout = false
        },
        addMlProb () {
            this.mlProbUpdateInProgress = true
           ApiService.addMlProbToBout(this.adminBoutRowPw, this.bout.boutId)
            .then(
                () => {
                   
                }
                ).catch(error => console.log(error)).finally(
                () => { 
                    this.mlProbUpdateInProgress = false 
                    }
                )
        }
    }
}
</script>