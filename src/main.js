import { createApp } from 'vue'
import { createGtm } from "vue-gtm";
import App from './App.vue'
import Axios from 'axios'
import './main.css'

//helpers
import router from './helpers/router'
import { store } from './helpers/store'

const app = createApp(App)

//AUTH - configuration
app.config.globalProperties.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  console.log('token detected: ', token)
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}else{
  console.log('no token detected')
}

app.use(
  createGtm({
    id: "GTM-TJDQZZ8", // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
    defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
  })
);

app.use(store)
app.use(router)

app.mount('#app')
