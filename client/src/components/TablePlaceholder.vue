<template>
  <div class="table-placeholder">
    <div v-if="!connected">No connection to the Aegle server</div>
    <div v-else-if="!hasServices">No services configured on the server</div>
    <table-component v-else :data="services" :columns="columns" />
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue'

export default {
  props: {
    services: Array,
    columns: Array,
    connected: Boolean
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