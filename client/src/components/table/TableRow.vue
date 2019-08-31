<template>
  <tr>
    <slot />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    columns: Array,
  }
}
</script>