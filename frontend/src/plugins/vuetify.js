// ./src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import { aliases, mdi } from 'vuetify/iconsets/mdi'

// 🔹 Read last theme from localStorage (fallback = light)
const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
const defaultTheme = savedTheme || 'light'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme,
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FAFAFA',
          surface: '#FFFFFF',
          primary: '#1976D2',   // blue
          secondary: '#424242', // neutral grey
          accent: '#82B1FF',    // light blue accent
          success: '#4CAF50',   // green
          warning: '#FFC107',   // amber
          danger: '#F44336',     // red
          info: '#2196F3',      // bright blue
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#757575',
          primary: '#90CAF9',
          secondary: '#B0BEC5',
          accent: '#448AFF',
          success: '#66BB6A',
          warning: '#FFCA28',
          danger: '#EF5350',
          info: '#29B6F6',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
