<template>
  <div id="service-table">
    <div v-if="services.length < 1">
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
            <td>{{ service.status || "pending" }}</td>
            <td>{{ service.updatedAt || "-" }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'service-table',
  props: {
    services: Array
  }
}
</script>

<style scoped></style>