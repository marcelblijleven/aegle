<template>
  <div id="app" class="container">
    <h1>Aegle healthchecks</h1>
    <service-table :services="services" />
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
      socket : io('localhost:5000')
    }
  },
  mounted() {
    this.socket.on('services', (message) => {
      this.services = message
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
