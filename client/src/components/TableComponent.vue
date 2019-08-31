<template>
  <div class="table-component">
    <v-simple-table>
      <thead >
        <th class="text-left" v-for="column in columns" :key="column.position">
          {{ column.title}}
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="`item-${index}`">
          <td class="text-left"><status-indicator :status="item.status" /></td>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.updatedAt }}</td>
          <td class="sparkline">
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
    columns: Array,
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
  mounted() {
    this.columns = this.sortColumns(this.columns)
  },
  methods: {
    sortColumns: function(columns) {
      function compare(a, b) {
        if ( a.position < b.position ){
          return -1;
        }
        if ( a.position > b.position ){
          return 1;
        }
        return 0;
      }

      return columns.sort(compare)
    }
  },
}
</script>

<style scoped>
  .sparkline {
    padding: 0 !important;
  }
</style>