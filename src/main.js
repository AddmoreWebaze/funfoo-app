import { createApp } from 'vue'
import App from './App.vue'
import Axios from 'axios'
import './main.css'

//helpers
import router from './helpers/router'
import { store } from './helpers/store'

const app = createApp(App)


app.config.globalProperties.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  console.log('token detected: ', token)
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}else{
  console.log('no token detected')
}

app.use(store)
app.use(router)

app.mount('#app')
