<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <div class="gauge-icon">
        <v-icon v-on="on">{{ iconText }}</v-icon>
      </div>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
export default {
  computed: {
    percentage() {
      return this.$store.getters.getHealthyPercentage
    },
    tooltipText() {
      const percentage = this.percentage.toFixed(2)
      return `${percentage}% healthy`
    },
    iconText() {
      const percentage = this.percentage
      if (percentage < 25) {
        return 'mdi-gauge-empty'
      } else if (percentage < 50) {
        return 'mdi-gauge-low'
      } else if (percentage < 75) {
        return 'mdi-gauge'
      } else {
        return 'mdi-gauge-full'
      }
    }
  }
}
</script>

<style scoped>
  .gauge-icon {
    width: 48px;
    display: inline-flex;
    justify-content: center;
  }
</style>