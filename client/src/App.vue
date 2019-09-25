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
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
          {{ snackbar.text }}
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import Toolbar from '@/components/toolbar/Toolbar.vue'

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
      hasConnection: false,
      snackbar: this.$store.state.SnackBar
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
      this.$store.commit('addServices', message)
    })

    this.$socket.on('service:update', (message) => {
      const serviceToUpdate = message.service
      
      this.$store.commit('updateService', serviceToUpdate)
      const lastResponseTime = serviceToUpdate.responseTimes.slice(-1).pop() || 0

      if (lastResponseTime > 2000 ) {
        this.$store.commit('add:snackbar', {
          success: false, 
          text: `${serviceToUpdate.name} response time was above threshold (2000)`
        })
      }
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
}
</style>
