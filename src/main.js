import Vue from 'vue'
import App from './App'

import VueCookie from 'vue-cookie'
import VueAnalytics from 'vue-analytics'

Vue.use(VueCookie)

Vue.use(VueAnalytics, {
 id: 'UA-115004766-2'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
