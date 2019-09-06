import Vue from 'vue'
import Vuex from 'vuex'
import AlertsModule from './alerts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AlertsModule: AlertsModule,
  },
  state: {
    isConnected: false,
    services: [],
    serverAddress: '',
  },
  getters: {
    getServiceById: (state) => (id) => {
      return state.services.find(service => service.id === id)
    },
    getAverageResponseTime(state) {
      const responseTimes = [].concat.apply([], state.services.map(service => service.responseTimes))
      const totalTimes = responseTimes.length

      if (totalTimes === 0) {
        return '-'
      }

      const sum = responseTimes.reduce((a, b) => a + b)
      return `${(sum / responseTimes.length).toFixed(2)} ms`
    },
    getOverallHealthcheck(state) {
      const overallState = state.services.every(service => service.status === 'healthy')
      return overallState ? 'healthy' : 'unhealthy'
    }
  },
  mutations: {
    addService(state, service) {
      state.services.push(service)
    },
    addServices(state, services) {
      state.services = services
    },
    updateService(state, service) {
      state.services.find(s => {
        if (s.id === service.id) {
          s.status = service.status
          s.updatedAt = service.updatedAt
          s.responseTimes = service.responseTimes
        }
      })
    },
    updateConnection(state, connected) {
      state.isConnected = connected
    },
    updateServerAddress(state, address) {
      state.serverAddress = address
    }
  }
})
