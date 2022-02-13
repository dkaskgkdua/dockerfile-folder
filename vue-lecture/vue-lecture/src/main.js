import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalMixins from '../globalMixins'
import i18nPlugins from './plugins/i18n'

const i18nStrings = {
  en: {
    hi: 'Hello!'
  },
  ko: {
    hi: '안녕하세요!'
  }
}

createApp(App)
  .use(store)
  .use(router)
  .use(i18nPlugins, i18nStrings)
  .mixin(globalMixins)
  .directive('focus', {
    mounted (el) {
      el.focus()
    }
  })
  .mount('#app')
