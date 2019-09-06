<template>
  <div id='app'>
    <v-app id='inspire'>
      <toolbar :title="title" />
      <v-content>
          <v-container fluid>
            <v-row>
              <v-col></v-col>
              <v-col :cols="12" :sm="10">
                <router-view />
              </v-col>
              <v-col />
            </v-row>
          </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'

export default {
  name: 'app',
  components: {
    Toolbar,
  },
  data() {
    return {
      title: 'Healthchecks',
      justify: 'center',
      alignment: 'center',
      services: [],
      hasConnection: false
    }
  },
  mounted() {
    this.$socket.on('connect', () => {
      this.$store.commit('updateConnection', true)
    })

    this.$socket.on('connect_error', () => {
      this.$store.commit('updateConnection', false)
    })

    this.$socket.on('services', (message) => {
      this.$store.commit('addServices', this.sortServices(message))
    })

    this.$socket.on('service:update', (message) => {
      const serviceToUpdate = message.service
      const previousStatus = this.$store.getters.getServiceById(serviceToUpdate.id).status
      const newStatus = message.service.status
      
      this.$store.commit('updateService', serviceToUpdate)

      // Sort if status has changed
      if (newStatus !== previousStatus) {
        this.sortServices(this.services)
      }
    })
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
