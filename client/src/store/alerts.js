const alertAdded = 'alertAdded'
const alertClosed = 'alertClosed'
const ttl = 5000

const AlertsModule = {
  state: {
    alerts: []
  },
  mutations: {
    [alertAdded](state, alert) {
      state.alerts.push(alert)
    },
    [alertClosed](state, alert) {
      // eslint-disable-next-line
      console.log('das alert', alert)
      const id = alert.id
      const index = state.alerts.findIndex(x => x.id === id)
      
      if (index >= 0) {
        clearTimeout(state.alerts[index].timeout)
        state.alerts = state.alerts.filter(x => x.id !== id)
      }

      return
    }
  },
  actions: {
    add(context, alert) {
      const timeout = setTimeout(function() {
        // eslint-disable-next-line
        console.log('timeout :)')
        context.commit(alertClosed, alert)
      }, ttl)
      alert.timeout = timeout
      context.commit(alertAdded, alert)
    },
    close(context, alert) {
      context.commit(alertClosed, alert)
    }
  }
}

export default AlertsModule
