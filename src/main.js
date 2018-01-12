import Vue from 'vue'
import App from './App'

import VueCookie from 'vue-cookie'

Vue.use(VueCookie)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
