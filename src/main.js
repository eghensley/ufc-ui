import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.css"
import Axios from 'axios'
// import axios from 'axios'
require('./assets/main.scss');

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://207.237.93.29:4646/ufc'
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
