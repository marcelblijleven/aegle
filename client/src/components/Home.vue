<template>
  <div class="table-placeholder">
    <v-card v-if="!connected || !hasServices">
      <v-card-title>Oops!</v-card-title>
      <v-card-text class="text-left" v-if="!connected">
        No connection to the socket server ({{ this.$store.state.serverAddress }}).
      </v-card-text>
      <v-card-text class="text-left" v-else-if="!hasServices">
        No services configured on the server.
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-title>Services</v-card-title>
      <table-component :services="services" />
    </v-card>
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue'

export default {
  computed: {
    connected() {
      return this.$store.state.isConnected
    },
    services() {
      return this.$store.state.services
    },
    hasServices() {
      return this.services && this.services.length > 0
    }
  },
  components: {
    TableComponent,
  },
}
</script>