<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <div class="average-response-time">
        <span v-on="on" :style="lineHeight">
          {{ average }}
        </span>
      </div>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
export default {
  data() {
    return {
      tooltipText: 'Average response time'
    }
  },
  computed: {
    lineHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'line-height: 64px;'
      }

      return 'line-height: 56px;'
    },
    average() {
      return this.$store.getters.getAverageResponseTime
    }
  }
}
</script>

<style scoped>
  .average-response-time {
    margin-right: 10px;
  }
</style>