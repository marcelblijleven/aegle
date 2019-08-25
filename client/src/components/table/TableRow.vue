<template>
  <tr>
    <table-data v-for="column in columns" :key="column.name" :content="valueForColumn(column)" />
  </tr>
</template>

<script>
import TableData from './TableData.vue'

export default {
  props: {
    item: Object,
    columns: Array,
  },
  components: {
    TableData,
  },
  methods: {
    valueForColumn: function(column) {
      if (this.item[column.data] !== undefined) {
        return this.item[column.data]
      }

      return '-'
    }
  }

}
</script>