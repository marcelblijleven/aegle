<template>
  <div id="service-table">
    <p v-if="services.length < 1">
      No services found.
    </p>
    <table v-else>
      <thead>
          <tr>
            <th>Service</th>
            <th>Status</th>
            <th>Modified at</th>
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