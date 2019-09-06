<template>
  <div class="table-component">
    <v-simple-table>
      <thead >
        <th class="indicator"></th>
        <th class="pl8 text-left">Name</th>
        <th class="text-left hidden-xs-only">Status</th>
        <th class="text-left">Updated at</th>
        <th class="text-left hidden-xs-only">Response times</th>
      </thead>
      <tbody>
        <table-row v-for="(service, index) in services" :service="service" :key="`service-${index}`"></table-row>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import TableRow from './TableRow.vue'

export default {
  props: {
    services: Array,
  },
  components: {
    TableRow,
  },
}
</script>

<style>
  .indicator {
    padding-left: 4px !important;
    padding-right: 0px !important;
  }

  .pl8 {
    padding-left: 8px !important;
  }
</style>