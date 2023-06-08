// import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMetaManager } from 'vue-meta'

import App from '@/App.vue'
import router from '@/router'
import firebase from '@/firebase'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createMetaManager())
app.use(firebase)

await router.isReady()

app.mount('#app')
