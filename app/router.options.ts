import type { RouterConfig } from '@nuxt/schema'
import { createMemoryHistory } from 'vue-router'

export default <RouterConfig> {
  // https://router.vuejs.org/api/interfaces/routeroptions.html
  history: base => import.meta.client ? createMemoryHistory(base) : null, /* default */
  scrollBehavior(to) {
    return { el: to.hash };
},
}