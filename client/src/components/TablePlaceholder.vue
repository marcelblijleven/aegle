<template>
  <div class="table-placeholder">
    <div v-if="!connected">
      <p>No connection to the Aegle server</p>
      <p>Server: {{ server }}</p>
    </div>
    <div v-else-if="!hasServices">No services configured on the server</div>
    <table-component v-else :services="services" :columns="columns" />
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue'

export default {
  props: {
    services: Array,
    columns: Array,
    connected: Boolean,
    server: String
  },
  computed: {
    hasServices: function() {
      return this.services && this.services.length > 0
    }
  },
  components: {
    TableComponent,
  },
}
</script>