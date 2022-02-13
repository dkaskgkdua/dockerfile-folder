<template>
<div>
  <h2>Count: {{count}}</h2>
  <button type="button" @click="increment">상승</button>
</div>
</template>

<script>
export default {
  name: 'StoreAccess',
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    }
  }
}
</script>

<style scoped>

</style>
