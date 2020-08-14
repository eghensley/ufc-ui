<template>
  <div id="app">
    <!-- <div id="nav" class="hero">
      <div class="hero-head"> -->
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <div class="navbar-item">
              <figure class="image is-48x48">
                <img src="@/assets/app-logo.png">
              </figure>
            </div>

            <a role="button" v-on:click="toggleDropdown()" v-bind:class="{ 'is-active': dropDownVis }" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active': dropDownVis }">
            <div class="navbar-start">

              <router-link @click.native="goHome()" class="navbar-item is-tab" to="/" v-bind:class="{ 'is-active': homeVis }">
                <span class="icon is-medium">
                  <i class="fa fa-home"></i>
                </span>
                Home
              </router-link>

              <router-link @click.native="goFight()" class="navbar-item is-tab" to="/fights" v-bind:class="{ 'is-active': fightVis }">
                <span class="icon is-medium">
                  <i class="fa fa-bolt"></i>
                </span>
                Fights
              </router-link>

              <router-link @click.native="goRank()" class="navbar-item is-tab" to="/rankings" v-bind:class="{ 'is-active': rankVis }">
                <span class="icon is-medium">
                  <i class="fa fa-balance-scale"></i>
                </span>
                Rankings
              </router-link>

              <div class="navbar-item has-dropdown" role="button" v-on:click="toggleMoreDropdown()" v-bind:class="{ 'is-active': moreDropDownVis }">
                <a class="navbar-link">
                  More
                </a>
                <div class="navbar-dropdown">
                  <a class="navbar-item" href="https://github.com/eghensley">Github</a>
                  <a class="navbar-item" href="https://www.linkedin.com/in/eric-g-hensley/">LinkedIn</a>
                  <router-link class="navbar-item" to="/about">About</router-link>
                </div>

              </div>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-info" href="https://twitter.com/betufcapp?s=21">
                    <span class="icon is-medium">
                      <i class="fa fa-hashtag" aria-hidden="true"></i>
                    </span>                   
                    <strong> Follow </strong>
                  </a>
                  <router-link class="button is-light" to="/admin">
                    <span class="icon is-medium">
                      <i class="fa fa-key"></i>
                    </span>
                    <strong> Admin </strong>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      <!-- </div>
    </div> -->
    <router-view/>
    <!-- <span id="siteseal">
      <script async type="text/javascript" src="https://seal.godaddy.com/getSeal?sealID=bHPpgXGCxo16dn3oxpUqJZUGQXkLM0wmuY8NqhzurEc9VFu9lebsaYcImQ0B"></script>
    </span> -->
  </div>
</template>

<script>
export default {
  name: "app",
  data () {
    return {
      dropDownVis: false,
      moreDropDownVis: false,
      homeVis: true,
      fightVis: false,
      rankVis: false
    }
  },
  methods: {
    toggleDropdown() {
      if (this.dropDownVis) {
        this.dropDownVis = false
      } else {
        this.dropDownVis = true
      }
    },
    toggleMoreDropdown () {
      if (this.moreDropDownVis) {
        this.moreDropDownVis = false
      } else {
        this.moreDropDownVis = true
      }
    },
    goHome () {
      if (!this.homeVis) {
        this.dropDownVis = false
      }
      this.homeVis = true
      this.fightVis = false
      this.rankVis = false
    },
    goRank () {
      if (!this.rankVis) {
        this.dropDownVis = false
      }
      this.rankVis = true
      this.homeVis = false
      this.fightVis = false
    },
    goFight () {
      if (!this.fightVis) {
        this.dropDownVis = false
      }
      this.fightVis = true
      this.homeVis = false
      this.rankVis = false
    }
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   // text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
