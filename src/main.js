import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/plugins/ui-theme/index'
import '@/plugins/element-ui/index'
import '@scss/index.scss'
import 'ol/ol.css'
import 'normalize.css/normalize.css'
import '@/icons'
import http from './utils/http'

Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  store,
  data () {
    return {
      globalMap: {}
    }
  },
  render: h => h(App)
}).$mount('#app')
