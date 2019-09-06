import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import socket from 'socket.io-client'

import routes from './routes'
import store from './store'

// Create and make available socket instance
const serverAddress = `${process.env.VUE_APP_SERVER_IP || 'localhost'}:5000`
store.commit('updateServerAddress', serverAddress)
Vue.prototype.$socket = socket(serverAddress)

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({routes})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
