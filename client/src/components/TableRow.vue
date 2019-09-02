<template>
  <tr>
    <td class="indicator"><status-indicator :status="service.status" /></td>
    <td class="pl8 text-left">{{ service.name }}</td>
    <td class="text-left">{{ service.updatedAt }}</td>
    <td class="hidden-xs-only">
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
  }
}
</script>