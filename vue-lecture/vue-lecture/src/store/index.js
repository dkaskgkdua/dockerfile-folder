import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count = state.count + 1
    }
  },
  actions: {
  },
  modules: {
  }
})
