import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

library.add(faRedo)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// 画面認証処理（リージョンの入力がなければ初期画面へとばす）
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLoggedIn) {
    next({ path: '/', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
