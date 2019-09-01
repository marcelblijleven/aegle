<template>
  <v-icon 
    class='indicator'
    :color="color"
    :small="true">
    {{ iconName }}
  </v-icon>
</template>

<script>

export default {
  props: {
    status: {
      type: String,
      default: 'pending'
    }
  },
  computed: {
    iconName: function() {
      let name

      switch (this.status) {
        case 'pending':
          name = 'mdi-checkbox-blank-circle-outline'
          break
        case 'unhealthy':
          name = 'mdi-alert-circle'
          break
        case 'healthy':
          name = 'mdi-checkbox-blank-circle'
          break
        default:
          name = 'mdi-checkbox-blank-circle-outline'
      }
      return name
    },
    color: function() {
      const colors = {
        pending: 'grey',
        healthy: 'green',
        unhealthy: 'red',
      }
      return colors[this.status]
    },
    currentStatus: function() {
      return this.status
    }
  }
}
</script>

<style scoped>
  .indicator {
    padding-right: 0;
  }
</style>