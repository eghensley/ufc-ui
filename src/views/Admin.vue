<template>
  <div class="admin">
    <AdminMainHeader
        :ifLoggedIn="isLoggedIn"
    />

    <section class="section">
        <div class="container">
            <div class="columns">
                <AdminAside
                    @showMain="showMainAdmin"
                    @showOdds="showOddsAdmin"
                    @showUpdate="showUpdateAdmin"
                    @showBet="showBetAdmin"
                />
                <main class="column main">
                    <AdminLogin
                        v-if="!isLoggedIn"
                        @successfulLogin="storeLogin"
                    />
                    <AdminMainTileWrapper
                        v-if="isLoggedIn && isMainVisible"
                        :pw="passedPw"
                        :ifLoggedIn="isLoggedIn"
                    />
                    <AdminOddsWrapper
                        v-if="isLoggedIn && isOddsVisible"
                        :pw="passedPw"
                    />
                    <AdminUpdateWrapper
                        v-if="isLoggedIn && isUpdateVisible"
                        :pw="passedPw"
                    />
                    <AdminBetWrapper
                        v-if="isLoggedIn && isBetVisible"
                        :betPw="passedPw"
                    />
                </main>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import AdminMainHeader from '@/components/Admin/Main/AdminMainHeader.vue'
import AdminMainTileWrapper from '@/components/Admin/Main/AdminMainTileWrapper.vue'
import AdminAside from '@/components/Admin/AdminAside.vue'
import AdminLogin from '@/components/Admin/AdminLogin.vue'
import AdminOddsWrapper from '@/components/Admin/Odds/AdminOddsWrapper.vue'
import AdminUpdateWrapper from '@/components/Admin/Update/AdminUpdateWrapper.vue'
import AdminBetWrapper from '@/components/Admin/Bet/AdminBetWrapper.vue'

export default {
    name: 'Admin',
    components: {
        AdminMainHeader, AdminMainTileWrapper, AdminAside, AdminLogin, AdminOddsWrapper, AdminUpdateWrapper, AdminBetWrapper
    },
    data () {
        return {
            passedPw: null,
            isLoggedIn: false,
            isOddsModalVisible: false,
            isOddsVisible: false,
            isMainVisible: true,
            isUpdateVisible: false,
            isBetVisible: false
        }
    },
    methods: {
        storeLogin (pw) {
            this.isLoggedIn = true
            this.passedPw = pw
        },
        showUpdateAdmin () {
            this.isBetVisible = false            
            this.isMainVisible = false
            this.isOddsVisible = false
            this.isUpdateVisible = true
        },
        showOddsAdmin () {
            this.isBetVisible = false            
            this.isMainVisible = false
            this.isUpdateVisible = false
            this.isOddsVisible = true
        },
        showMainAdmin () {
            this.isBetVisible = false            
            this.isUpdateVisible = false
            this.isOddsVisible = false
            this.isMainVisible = true
        },
        showBetAdmin () {
            this.isUpdateVisible = false
            this.isOddsVisible = false
            this.isMainVisible = false
            this.isBetVisible = true            
        }
    }
}
</script>
