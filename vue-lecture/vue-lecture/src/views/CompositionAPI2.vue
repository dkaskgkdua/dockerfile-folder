<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="state.num1"/>
      <span> + </span>
      <input type="text" v-model.number="state.num2"/>
      <span> = </span>
      <span> {{ state.result }}</span>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
export default {
  name: 'CompositionAPI2',
  setup () {
    const state = reactive({ // reactive를 이용해서 num1, num2, result를 실시간 변경사항에 반응형 적용
      num1: 0,
      num2: 0,
      result: computed(() => state.num1 + state.num2)
    })

    return {
      // reactive로 선언된 state와 plusNumbers 함수를 변환함으로써 기존 data, methods 옵션처럼
      state
    }
  }
}
</script>

<style scoped>

</style>
