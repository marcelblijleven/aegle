<template>
  <div :class="['status', currentStatus]" />
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
    currentStatus: function() {
      return `status-${this.status}`
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