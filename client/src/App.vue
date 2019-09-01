<template>
  <div id='app'>
    <v-app id='inspire'>
      <v-app-bar app clipped>
        <v-toolbar-title>Healthchecks</v-toolbar-title>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <v-row>
            <v-col />
            <v-col :cols="12" :sm="8">
              <table-placeholder 
                :services="services" 
                :connected="hasConnection" 
                :server="serverAddress"
              />
            </v-col>
            <v-col />
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import io from 'socket.io-client'
import TablePlaceholder from '@/components/TablePlaceholder.vue'

const serverAddress = `${process.env.VUE_APP_SERVER_IP || 'localhost'}:5000`

export default {
  name: 'app',
  components: {
    TablePlaceholder
  },
  data() {
    return {
      serverAddress: serverAddress,
      justify: 'center',
      alignment: 'center',
      services: [],
      socket : io(`${process.env.VUE_APP_SERVER_IP || 'localhost'}:5000`),
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
