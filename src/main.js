import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import lazyload from 'vue-lazyload'



Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装自定义toast插件
Vue.use(toast)
// 在需要懒加载图片得地方将 :src="" => :lazyload=""
Vue.use(lazyload, {
  // loading: require('') 使用懒加载中得其他方法
})

// 解决移动端300ms得延迟
fastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
