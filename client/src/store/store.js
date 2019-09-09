import Vue from 'vue'
import Vuex from 'vuex'
import SnackBar from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    SnackBar
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
    },
    getHealthyPercentage(state) {
      const healthyServices = state.services.filter(service => service.status === 'healthy')
      const healthyNumber = healthyServices.length
      const totalNumber = state.services.length
      return totalNumber > 0 ? healthyNumber / totalNumber * 100 : 0
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
      let newValue = service.status
      let oldValue

      state.services.find(s => {
        if (s.id === service.id) {
          oldValue = s.status
          s.status = service.status
          s.updatedAt = service.updatedAt
          s.responseTimes = service.responseTimes
        }
      })

      if (newValue !== oldValue) {
        state.services = services.sort((a, b) => {
          if (a.status < b.status) return 1
          if (a.status > b.status) return -1
          return 0
        })
      }
    },
    updateConnection(state, connected) {
      state.isConnected = connected
    },
    updateServerAddress(state, address) {
      state.serverAddress = address
    }
  }
})
