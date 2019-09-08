<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="toggle">
        <v-icon>{{ isActive ? 'mdi-brightness-7' : 'mdi-brightness-4' }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
export default {
  data: function() {
    return {
      isActive: false
    }
  },
  computed: {
    tooltipText() {
      return `Active ${this.isActive ? 'light' : 'dark'} theme`
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