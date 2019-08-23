<template>
  <div id="app" class="container">
    <h1>Aegle healthchecks</h1>
    <service-table :services="services" :hasConnection="hasConnection" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import ServiceTable from '@/components/ServiceTable.vue'

export default {
  name: 'app',
  components: {
    ServiceTable
  },
  data() {
    return {
      services: [],
      socket : io('localhost:5000'),
      hasConnection: false
    }
  },
  mounted() {
    this.socket.on('connect', () => {
      this.hasConnection = true
      console.info('Connected to server')
    })

    this.socket.on('connect_error', () => {
      this.hasConnection = false
      console.error('No connection to server')
    })

    this.socket.on('services', (message) => {
      this.services = message
    })

    this.socket.on('service:update', (message) => {
      this.services.find(service => {
        if (service.id === message.service.id) {
          service.status = message.service.status;
          service.updatedAt = message.service.updatedAt;
        }
      })
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 700px;
}
</style>
