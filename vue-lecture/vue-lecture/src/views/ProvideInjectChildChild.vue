<template>
  <div>Item Length: {{ this.items.length}}</div>
  <div>Item Length: {{ this.itemLength}}</div>
</template>

<script>
export default {
  name: 'ProvideInjectChild',
  inject: ['itemLength', 'items']
}
</script>

<style scoped>

</style>
