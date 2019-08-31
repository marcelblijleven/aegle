<template>
  <div id='app'>
    <v-app id='inspire'>
      <v-container fluid dark>
        <v-row :align="alignment" :justify="justify">
          <v-col :sm="0" :md="2" />
          <v-col :sm="12" :md="8">
            <h1>Aegle healthchecks</h1>
            <table-placeholder :services="services" :columns="columns" :connected="hasConnection" />
          </v-col>
          <v-col :sm="0" :md="2" />
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import io from 'socket.io-client'
import TablePlaceholder from '@/components/TablePlaceholder.vue'
import ip from 'ip'
import ServiceTable from '@/components/ServiceTable.vue'

const ipAddress = ip.address()
// eslint-disable-next-line
console.log(ipAddress)

export default {
  name: 'app',
  components: {
    TablePlaceholder
  },
  data() {
    return {
      justify: 'center',
      alignment: 'center',
      services: [],
      columns: [
        { position: 1, title: '', data: 'status'},
        { position: 2, title: 'name', data: 'name'},
        { position: 3, title: 'updated at', data: 'updatedAt'}, 
      ],
      socket : io('localhost:5000'),
      socket : io(`${ipAddress || 'localhost'}:5000`),
      hasConnection: false
    }
  },
  mounted() {
    this.socket.on('connect', () => {
      this.hasConnection = true
    })

    this.socket.on('connect_error', () => {
      this.hasConnection = false
    })

    this.socket.on('services', (message) => {
      this.services = this.sortServices(message)
    })

    this.socket.on('service:update', (message) => {
      const updateService = message.service
      const oldStatus = this.services.find(service => service.id === updateService.id).status
      const newStatus = message.service.status
      
      this.services.find(service => {
        if (service.id === message.service.id) {
          service.status = message.service.status;
          service.updatedAt = message.service.updatedAt;
        }
      })

      // Sort if status has changed
      if (newStatus !== oldStatus) {
        this.sortServices(this.services)
      }
    })
  },
  created() {
    this.$vuetify.theme.dark = false
  },
  methods: {
    sortServices: function(services) {
      return services.sort((a, b) => {
        if (a.status < b.status) return 1
        if (a.status > b.status) return -1
        return 0
      })
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
}
</style>
