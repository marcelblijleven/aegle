<template>
  <tr @click="navigateToService" class="service-table-row">
    <td class="indicator"><status-indicator :status="service.status" :small="true" /></td>
    <td class="pl8 text-left">{{ service.name }}</td>
    <td class="text-left">{{ service.updatedAt }}</td>
    <td class="hidden-xs-only sparkline">
      <spark-line 
        :values="times">
      </spark-line>
    </td>
  </tr>
</template>

<script>
import SparkLine from './SparkLine.vue'
import StatusIndicator from './StatusIndicator.vue'

export default {
  props: {
    service: Object
  },
  components: {
    SparkLine,
    StatusIndicator,
  },
  computed: {
    times: function() {
      return this.service.responseTimes
    }
  },
  methods: {
    navigateToService() {
      this.$router.push({ name: 'service', params: { id: this.service.id, service: this.service } })
    }
  }
}
</script>

<style scoped>
  .service-table-row {
    cursor: pointer;
  }

  .sparkline {
    min-width: 100px;
  }
</style>