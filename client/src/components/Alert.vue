<template>
  <v-alert
    class="alert"
    :dismissible="true"
    :type="alert.type"
  >
    {{ alert.text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    alert: Object
  }
}
</script>

<style scoped>
  .alert {
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 999;
  }
</style>