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
      loading: false
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
      this.$socket.emit('service:update', this.service.id, function(success) {
        component.loading = false
        // eslint-disable-next-line
        console.log(component.$store)
        const text = success ? 'Service updated' : 'Service not updated'
        const type = success ? 'success' : 'error'
        component.$store.dispatch('add', { id: component.service.id, type, text })
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // Redirect back to home if service is undefined
    // this happens when server restarts
    if (to.params.service === undefined) {
      next('/')
    }
    next()
  }
}
</script>