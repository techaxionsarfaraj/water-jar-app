// src/router/index.js
import Customers from '@/views/Customers.vue'
import Dashboard from '@/views/Dashboard.vue'
import Order from '@/views/Order.vue'
import Stock from '@/views/Stock.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/BaseLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard' } },
      { path: 'customers', name: 'Customers', component: Customers, meta: { title: 'Customers' } },
      { path: 'stock', name: 'Stock', component: Stock, meta: { title: 'Stock' } },
      { path: 'orders', name: 'Orders', component: Order, meta: { title: 'Orders' } },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
