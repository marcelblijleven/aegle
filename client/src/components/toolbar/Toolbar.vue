<template>
  <v-app-bar app>
        <v-toolbar-title>
          <router-link to="/">
            {{ title }}
          </router-link>
          </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <average-response-time />
          <health-gauge />
          <dark-mode-toggle />
        </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import AverageResponseTime from './AverageResonseTime.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import HealthGauge from './HealthGauge.vue'

export default {
  props: {
    title: String,
  },
  components: {
    AverageResponseTime,
    DarkModeToggle,
    HealthGauge,
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.theme--dark a {
  color: #ffffff !important;
}

.theme--light a {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>