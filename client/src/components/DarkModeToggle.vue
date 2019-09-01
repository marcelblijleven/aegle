<template>
  <v-btn icon @click="toggle">
    <v-icon>{{ isActive ? 'mdi-brightness-7' : 'mdi-brightness-4' }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  data: function() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle: function() {
      this.isActive = !this.isActive
      this.$vuetify.theme.dark = this.isActive
    }
  }
}
</script>