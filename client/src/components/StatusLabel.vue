<template>
  <span v-bind:class="['label', labelClass]">{{ status }}</span>
</template>

<script>
export default {
  name: 'status-label',
  props: {
    status: String
  },
  computed: {
    labelClass: function() {
      if (!this.hasStatus) {
        return ''
      }

      return this.status === 'healthy' ? 'label_healthy' : 'label_unhealthy'
    },
    hasStatus: function() {
      return this.status !== 'pending'
    }
  }
}
</script>

<style scoped>
  .label {
    padding: 4px 10px;
    border-radius: 10px;
    background: #969292;
  }

  .label_healthy {
    background-color: #2fc72f;
    color: white;
  }

  .label_unhealthy {
    background-color: #c72f2f;
    color: white;
  }
</style>