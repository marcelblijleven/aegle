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
          :loading="loading"
          @click="updateService">
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
  name: 'ServiceCard',
  props: {
    id: String,
    service: Object
  },
  data() {
    return {
      loading: false,
      snackbar: false,
      snackbarText: null,
      snackbarColor: null,
    }
  },
  components: {
    SparkLine,
  },
  computed: {
    times() {
      return this.service.responseTimes
    }
  },
  methods: {
    updateService() {
      const component = this
      component.loading = true
      this.$socket.emit('service:update', this.service.id, function(response) {
        component.loading = false
        const snackbar = {...response}
        component.$store.commit('add:snackbar', snackbar)
      })
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