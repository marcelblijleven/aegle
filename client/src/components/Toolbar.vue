<template>
  <v-app-bar app>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <div class="flex-grow-1"></div>
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