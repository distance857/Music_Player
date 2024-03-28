import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/icon/iconfont.css"
import router from './router'
import store from './store'
import Vuelazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(Vuelazyload, {
  preLoad: 1.3,
  loading: require('./assets/imgs/loading.png'),
  attempt: 2
})


//引入 封装好的请求
import { postRequest } from '@/utils/request';
import { putRequest } from '@/utils/request';
import { getRequest } from '@/utils/request';
import { deleteRequest } from '@/utils/request';
//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
