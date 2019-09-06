<template>
  <div class="service-card">
    <v-card>
      <v-card-title>
        {{ service.name }}
      </v-card-title>
      <v-card-text class="text-left">
        {{ service.status }}
      </v-card-text>
      <spark-line :values="times"></spark-line>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          text
          :disabled=true>
          update
        </v-btn>
        <v-btn
          text
          to="/">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import SparkLine from '@/components/SparkLine.vue'

export default {
  props: {
    id: String,
    service: Object
  },
  components: {
    SparkLine,
  },
  computed: {
    times: function() {
      return this.service.responseTimes
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.service === undefined) {
      next('/')
    }
    next()
  }
}
</script>