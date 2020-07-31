<template>
    <section class="hero is-info welcome is-small" id="myHeader">
      <div class="hero-body">
        <div class="container">
          <h2 class="title"> Admin Dashboard </h2>
          <h2 class="subtitle" v-if="!ifLoggedIn"> Please log in to utilize the admin properties </h2>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: 'adminMainHeader',
    props: {
        ifLoggedIn: {type: Boolean, default: false}
    }
}
</script>