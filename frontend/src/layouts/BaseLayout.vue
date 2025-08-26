<!-- ./src/layouts/BaseLayout.vue -->
<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app color="surface">
      <v-list nav density="compact">
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          link
          exact
          active-class="active-menu"
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar app flat color="surface" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>{{ currentTitle }}</v-toolbar-title>
      <v-spacer />
      <!-- 🌙 / ☀️ dynamic theme toggle -->
      <v-btn
        icon
        variant="text"
        @click="toggleTheme"
        :title="`Switch to ${isDark ? 'light' : 'dark'} theme`"
      >
        <v-icon transition="scale-transition">{{ themeIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Page Content -->
    <v-main class="">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="surface" elevation="2">
      <div class="text-caption">
        © {{ year }} My Company
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'

const drawer = ref(true)
const year = computed(() => new Date().getFullYear())

const menuItems = [
  { title: 'Dashboard', to: '/dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Customers', to: '/customers', icon: 'mdi-account-group' },
  { title: 'Stock',     to: '/stock',     icon: 'mdi-water' },
  { title: 'Orders',    to: '/orders',    icon: 'mdi-cart' },
]

const route = useRoute()
const currentTitle = computed(() => {
  const match = menuItems.find(m => m.to === route.path)
  return match ? match.title : 'My Dashboard'
})

// ✅ Theme handling
const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'dark')
const themeIcon = computed(() =>
  isDark.value ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
)

const toggleTheme = () => {
  theme.change(isDark.value ? 'light' : 'dark')
}

// Persist user choice
watch(() => theme.global.name.value, (val) => {
  localStorage.setItem('theme', val)
})
</script>


<style scoped>
.active-menu {
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}
:deep(.v-theme--dark) .active-menu {
  background-color: rgba(255, 255, 255, 0.12);
}

</style>
