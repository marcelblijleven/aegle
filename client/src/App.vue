<template>
  <div id="app" class="container">
    <h1>Aegle healthchecks</h1>
    <service-table :services="services" />
  </div>
</template>

<script>
import ServiceTable from '@/components/ServiceTable.vue'

export default {
  name: 'app',
  components: {
    ServiceTable
  },
  data() {
    return {
      services: [
        {
          id: 1,
          name: 'HttpStatus200 - after sleep 10 sec',
          url: 'https://httpstat.us/200?sleep=10000',
          healthyValue: '200 OK',
          type: 'text'
        },
        {
          id: 2,
          name: 'HttpStatus524',
          url: 'https://httpstat.us/524?sleep=4000',
          healthyValue: '200 OK',
          type: 'text'
        },
        {
          id: 3,
          name: 'HttpStatus200',
          url: 'https://httpstat.us/200',
          healthyValue: '200 OK',
          type: 'text'
        }
      ]
    }
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
