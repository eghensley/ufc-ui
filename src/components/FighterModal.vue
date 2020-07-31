<template>
  <transition name="modal-fade">
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Fighter Info</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="box notification is-primary">
                    <div class="title"> {{ modalFighter['fighterName'] }} </div>
                    <div class="heading"> {{ modalFighter['dob'] }} </div>
                    <div class="level">
                        <div class="level-item">
                            <div>
                                <div class="heading"> Reach </div>
                                <div class="title is-5"> {{ modalFighter['reach'] }} </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <div>
                                <div class="heading"> Height </div>
                                <div class="title is-5"> {{ modalFighter['height'] }} </div>
                            </div>
                        </div>
                        <div class="level-item">
                            <div>
                                <div class="heading"> Stance </div>
                                <div class="title is-5"> {{ resolveStance(modalFighter['stance']) }} </div>
                            </div>
                        </div>
                    </div>
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

var stanceDict = {
    'SW': 'Switch',
    'OR': 'Orthodox',
    'SP': 'Southpaw'
}

export default {
    name: 'fighterModal',
    props: {
        modalFighter : {
            type: Object, default: function () { 
                return {
                    'oid': 'null',
                    'fighterId': 'null',
                    'fighterName': 'null',
                    'reach': null,
                    'height': null,
                    'dob': 'null',
                    'stance': 'null'
                }
            }
        }
    },
    methods: {
        close () {
            this.$emit('closeFighter')
        },
        resolveStance (myKey) {
            return stanceDict[myKey];
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
