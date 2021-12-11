import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let app = createApp(App)

//挂载App.vue根组件
app.use(store).use(router).mount('#app')
