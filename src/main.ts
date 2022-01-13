import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/bootstrap.min.css'
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/ts/axiosInterceptors';
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// axios.interceptors.request.use(
//   config => {
//       if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//         config.headers.Authorization = `Bearer ${store.state.token}`;
//       }
//       return config;
//   },
//   err => {
//       return Promise.reject(err);
//   });

// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 返回 401 清除token信息并跳转到登录页面
//                   store.commit("LOGOUT");
//                   router.replace({
//                       path: '/login',
//                   })
//           }
//       }
//       return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//   });

