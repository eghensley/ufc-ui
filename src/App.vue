<template>
  <div id="app">
    <div id="nav" class="hero">
      <div class="hero-head">
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">

            <div class="navbar-item">
              <figure class="image is-32x32">
                <img class="is-rounded" src="@/assets/app-logo.png" alt="Bulma Admin Template logo">
              </figure>
            </div>
            <router-link class="navbar-item is-tab" to="/">
              <span class="icon is-medium">
                <i class="fa fa-home"></i>
              </span>
              Home
            </router-link>
            <router-link class="navbar-item is-tab" to="/fights">
              <span class="icon is-medium">
                <i class="fa fa-bolt"></i>
              </span>
              Fights
            </router-link>
            <router-link class="navbar-item is-tab" to="/rankings">
              <span class="icon is-medium">
                <i class="fa fa-balance-scale"></i>
              </span>
              Rankings
            </router-link>
            <router-link class="navbar-item is-tab" to="/admin">
              <span class="icon is-medium">
                <i class="fa fa-key"></i>
              </span>
              Admin
            </router-link>

            <a class="navbar-item is-tab is-hidden-mobile" href="https://github.com/eghensley">Github</a>
            <a class="navbar-item is-tab is-hidden-mobile" href="https://www.linkedin.com/in/eric-g-hensley/">LinkedIn</a>
            <router-link class="navbar-item is-tab is-hidden-mobile" to="/about">About</router-link>

          </div>
        </nav>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
