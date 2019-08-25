<template>
  <div id="app" class="container">
    <h1>Aegle healthchecks</h1>
    <table-component :data="services" :columns="columns" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import TableComponent from '@/components/table/TableComponent.vue'

export default {
  name: 'app',
  components: {
    TableComponent,
  },
  data() {
    return {
      services: [],
      columns: [
        { position: 1, title: "status", data: "status"},
        { position: 2, title: "name", data: "name"},
        { position: 3, title: "updated at", data: "updatedAt"}, 
      ],
      socket : io('localhost:5000'),
      hasConnection: false
    }
  },
  async mounted() {
    this.socket.on('connect', () => {
      this.hasConnection = true
    })

    this.socket.on('connect_error', () => {
      this.hasConnection = false
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
  },
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
