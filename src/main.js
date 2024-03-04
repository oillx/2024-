import { createApp } from 'vue'
import './style.css'
// 引入element-plus
//import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'
// 引入路由
import router from './router'
// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入样式
import './assets/less/index.less'
// 引入store
import store from './store/index.js'
import App from './App.vue'
// 引入mock数据
import './api/mock.js'
import Cookie from "js-cookie";
import api from './api/api.js'
const app = createApp(App)


// 注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
//api
app.config.globalProperties.$api = api
//动态添加路由
store.commit('addMenu',router)
// 用户输入路径不存在要跳转到home页
function checkRouter(path) {
  let hasCheck = router.getRoutes().filter(route => route.path == path).length  // 过滤返回数组的长度
  if ( hasCheck ) {
    return true
  } else {
    return false
  }
  console.log(router.getRoutes())
}
checkRouter() 
// 全局路由守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  console.log(!token)
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if(!checkRouter(to.path)){
    next({ name: 'home' })
  } else {
    next()
  }
})
app.use(router).use(store)


// 挂载应用
app.mount('#app')
