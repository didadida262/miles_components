import { createApp } from 'vue'
import App from './App.vue'
import VueComponents from 'miles-wang-vue-components'
import '../../dist/style.css'

const app = createApp(App)
app.use(VueComponents)
app.mount('#app')
