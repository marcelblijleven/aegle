<template>
  <div class="table-component">
    <table>
      <table-head v-for="column in columns" :key="column.position" :title="column.title" />
      <tbody>
        <table-row v-for="(item, index) in data" :key="`item-${index}`">
          <table-data><status-indicator :status="item.status" /></table-data>
          <table-data>{{ item.name }}</table-data>
          <table-data>{{ item.updatedAt }}</table-data>
        </table-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import TableHead from './TableHead.vue'
import TableRow from './TableRow.vue'
import TableData from './TableData.vue'
import StatusIndicator from './StatusIndicator.vue'

export default {
  props: {
    data: Array,
    columns: Array,
  },
  components: {
    TableHead,
    TableRow,
    TableData,
    StatusIndicator
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
  }
}
</script>