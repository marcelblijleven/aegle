<template>
  <div class="table-placeholder">
    <v-card v-if="!connected || !hasServices">
      <v-card-title>Oops!</v-card-title>
      <v-card-text class="text-left" v-if="!connected">
        No connection to the socket server ({{ server }}).
      </v-card-text>
      <v-card-text class="text-left" v-else-if="!hasServices">
        No services configured on the server.
      </v-card-text>
    </v-card>
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