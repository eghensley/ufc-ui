<template>
    <div class="columns is-multiline">
        <template>
            <form @submit="submitLogin">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label"> Password </label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input class="input is-danger" id="pw" v-model="pw" type="text" placeholder="password">
                            </div>
                            <p class="help is-danger"> This field is required </p>
                        </div>
                    </div>
                </div>
                <input type="submit">
            </form>
        </template>
    </div>
</template>

<script>
export default {
    name: 'adminLogin',
        data () {
        return {
            pw: null
        }
    },
    methods: {
        submitLogin: function (e) {
            e.preventDefault()

            if (this.pw === '1234') {
                this.$emit('successfulLogin', this.pw)
            } else {
                this.pw = null
            }
            
        }
    }
}
</script>