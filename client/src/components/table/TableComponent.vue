<template>
  <div class="table-component">
    <table>
      <table-head v-for="column in columns" :key="column.position" :title="column.title" />
      <tbody>
        <table-row v-for="(item, index) in data" :key="`item-${index}`" :item="item" :columns="columns" />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableHead from './TableHead.vue'
import TableRow from './TableRow.vue'

export default {
  props: {
    data: Array,
    columns: Array,
  },
  components: {
    TableHead,
    TableRow
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