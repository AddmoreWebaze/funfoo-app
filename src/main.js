import { createApp } from 'vue'
import App from './App.vue'
import './main.css'

//helpers
import router from './helpers/router'
import { store } from './helpers/store'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
