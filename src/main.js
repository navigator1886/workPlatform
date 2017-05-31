// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/element-ui.common'
import App from './App'

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.config.productionTip = false

import routes from './router/routes'

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h =>h(App),
}).$mount('#app')
