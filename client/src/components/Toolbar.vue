<template>
  <v-app-bar app>
        <v-toolbar-title>
          <router-link to="/">
            {{ title }}
          </router-link>
          </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <span class="average-response-time">{{ this.$store.getters.getAverageResponseTime }}</span>
        <v-toolbar-items>
          <dark-mode-toggle />
        </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import DarkModeToggle from './DarkModeToggle.vue'

export default {
  props: {
    title: String,
  },
  components: {
    DarkModeToggle,
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

.average-response-time {
  margin-right: 5px;
}
</style>