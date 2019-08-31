<template>
  <div :class="['status', currentStatus]" />
</template>

<script>
export default {
  props: ['status'],
  computed: {
    currentStatus: function() {
      if (this.status.length === 0 || this.status === 'pending') {
        return ''
      }

      return this.status === 'healthy' ? 'status-healthy' : 'status-unhealthy'
    }
  }
}
</script>

<style scoped>
  .status {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    background-color: grey;
  }

  .status-healthy {
    background-color: green;
  }

  .status-unhealthy {
    background-color: red;
  }
</style>