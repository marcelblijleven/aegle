import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'

import routes from './routes'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({routes})
const serverAddress = `${process.env.VUE_APP_SERVER_IP || 'localhost'}:5000`
store.commit('updateServerAddress', serverAddress)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
