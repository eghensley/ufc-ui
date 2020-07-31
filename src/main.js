import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.css"
// import axios from 'axios'

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://207.237.93.29:4646/ufc'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
