<template>
  <div class="table-component">
    <v-simple-table>
      <thead >
        <th class="indicator"></th>
        <th class="pl8 text-left">Name</th>
        <th class="text-left">Status</th>
        <th class="text-left hidden-xs-only">Response times</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="`item-${index}`">
          <td class="indicator"><status-indicator :status="item.status" /></td>
          <td class="pl8 text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.updatedAt }}</td>
          <td class="hidden-xs-only">
            <spark-line :times="times"></spark-line>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import SparkLine from './SparkLine.vue'
import StatusIndicator from './StatusIndicator.vue'

export default {
  props: {
    data: Array,
  },
  components: {
    StatusIndicator,
    SparkLine
  },
  computed: {
    times: function() {
      // Dummy function to prepare for actual response times
      return Array.from({length: 5}, () => Math.floor(Math.random() * 30))
    }
  },
}
</script>

<style scoped>
  .indicator {
    padding-left: 4px !important;
    padding-right: 0px !important;
  }

  .pl8 {
    padding-left: 8px !important;
  }
</style>