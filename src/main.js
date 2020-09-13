/**
 * @description 项目入口执行文件
 */
import Vue from 'vue'
import App from './App.vue'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// axios请求拦截器
axios.interceptors.request.use(() => {
  // loading、请求地址替换、修改
})

// axios响应拦截器
axios.interceptors.response.use((response) => {
  let res = response.data
  if(res.code != 0) {
    alert(res.message)
  }
}, (error) => {
  // 网络错误（如断网）
  return Promise.reject(error)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
