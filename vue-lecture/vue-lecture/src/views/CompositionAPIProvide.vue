<template>
  <CompositionAPIInject/>
</template>

<script>
import CompositionAPIInject from '@/views/CompositionAPIInject'
import { provide } from 'vue'

export default {
  name: 'CompositionAPIProvide',
  components: { CompositionAPIInject },
  setup () {
    provide('title', 'Vue.js 프로젝트')
  }
}
</script>

<style scoped>

</style>
