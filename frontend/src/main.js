// Vue
import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import vuetify from './plugins/vuetify'

// 🔹 Import Material Design Icons
import "@mdi/font/css/materialdesignicons.css";

// Router
import router from './router'

// Components
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

// ✅ Create Vuetify instance with components, directives, and icons
// const vuetify = createVuetify({
//   components,
//   directives,
//   icons: {
//     defaultSet: 'mdi', // Use Material Design Icons
//   },
// })

// ✅ Mount App
createApp(App).use(vuetify).use(MotionPlugin).use(router).mount('#app')
