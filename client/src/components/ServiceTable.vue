<template>
  <div id="service-table">
    <div v-if="!hasConnection">
      <p>Could not connect to socket server</p>
    </div>
    <div v-else-if="services.length < 1">
      <p>No services found.</p>
      <p>Make sure the server is running and you've added services to the services directory</p>
    </div>
    <table v-else>
      <thead>
          <tr>
            <th>Service</th>
            <th>Status</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.name }}</td>
            <td><status-label :status="service.status || 'pending'" :key="service.id"></status-label></td>
            <td>{{ service.updatedAt || "-" }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import StatusLabel from '@/components/StatusLabel.vue'

export default {
  name: 'service-table',
  props: {
    services: Array,
    hasConnection: Boolean
  },
  components: {
    StatusLabel
  },
}
</script>

<style scoped></style>