<!-- ./src/views/Dashboard.vue -->
<template>
  <v-container>
    <!-- Stats Section -->
    <v-row class="mb-6" dense>
      <v-col
        v-for="stat in stats"
        :key="stat.title"
        cols="12"
        md="2"
      >
        <v-card
          class="pa-5 text-white transition-all duration-300 hover:scale-105"
          :style="stat.gradient"
          elevation="6"
          rounded="xl"
          @click="stat.action"
        >
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-subtitle-2 font-weight-medium">{{ stat.title }}</div>
              <div class="text-h4 font-weight-bold mt-2">{{ stat.value }}</div>
            </div>
            <v-icon size="40" class="opacity-80">{{ stat.icon }}</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Jug Stock by Color -->
    <v-card
      v-if="jugsByColor.length"
      class="pa-6 mb-6"
      rounded="xl"
      elevation="4"
    >
      <v-card-title class="font-weight-bold">Jug Stock by Color</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="jug in jugsByColor"
            :key="jug.color"
            cols="12"
            sm="3"
            md="2"
          >
            <v-card
              class="d-flex flex-column align-center justify-center pa-4"
              rounded="lg"
              outlined
            >
              <div class="d-flex align-center">
                <div
                  class="rounded-circle mr-2"
                  :style="{ width: '14px', height: '14px', background: jug.color.toLowerCase() }"
                ></div>
                <span class="text-body-2 font-weight-medium text-capitalize">
                  {{ jug.color }}
                </span>
              </div>
              <div class="text-h5 font-weight-bold mt-2">{{ jug.quantity }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Chart Section -->
    <v-card v-if="totalJars.value > 0 || totalJugs.value > 0" class="pa-6" rounded="xl" elevation="4">
      <v-card-title class="font-weight-bold">Jar vs Jug Stock</v-card-title>
      <v-card-subtitle class="mb-4">Comparison of total stock</v-card-subtitle>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="chartSeries"
      />
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ApexChart from 'vue3-apexcharts'
import { useRouter } from 'vue-router'

const router = useRouter()
const apexchart = ApexChart

/* ───── Dashboard Data ───── */
const totalCustomers = ref(0)
const totalJars = ref(0)
const totalJugs = ref(0)
const todaysOrders = ref(0)
const jugsByColor = ref([])

/* ───── Stats Config ───── */
const stats = ref([
  {
    title: 'Total Customers',
    value: totalCustomers,
    icon: 'mdi-account-group',
    gradient: 'background: linear-gradient(135deg, #ff9a9e, #fad0c4)',
    action: () => router.push('/customers'),
  },
  {
    title: 'Total Jars',
    value: totalJars,
    icon: 'mdi-water',
    gradient: 'background: linear-gradient(135deg, #90caf9, #047edf)',
    action: () => router.push('/stock'),
  },
  {
    title: 'Total Jugs',
    value: totalJugs,
    icon: 'mdi-bottle-tonic',
    gradient: 'background: linear-gradient(135deg, #84d9d2, #07cdae)',
    action: () => router.push('/stock'),
  },
  {
    title: "Today's Orders",
    value: todaysOrders,
    icon: 'mdi-cart',
    gradient: 'background: linear-gradient(135deg, #f6d365, #fda085)',
    action: () => router.push('/orders'),
  },
])

/* ───── Chart Options ───── */
const chartOptions = ref({
  chart: { type: 'bar', height: 350 },
  plotOptions: {
    bar: { distributed: true, columnWidth: '45%', borderRadius: 6 },
  },
  colors: ['#42a5f5', '#26c6da'],
  dataLabels: {
    enabled: true,
    style: { fontSize: '14px', fontWeight: 'bold' },
  },
  xaxis: {
    categories: ['Jars', 'Jugs'],
  },
})

const chartSeries = ref([{ name: 'Quantity', data: [0, 0] }])

/* ───── Fetch Data ───── */
const fetchDashboardData = async () => {
  try {
    const customersRes = await axios.get('http://localhost:5000/api/customers')
    totalCustomers.value = customersRes.data.length

    const stockRes = await axios.get('http://localhost:5000/api/stock')
    const stockData = stockRes.data

    const jars = stockData.filter((i) => i.type === 'jar')
    const jugs = stockData.filter((i) => i.type === 'jug')

    totalJars.value = jars.reduce((s, i) => s + (i.quantity || 0), 0)
    totalJugs.value = jugs.reduce((s, i) => s + (i.quantity || 0), 0)

    // Jug colors
    const jugColorMap = {}
    jugs.forEach((item) => {
      const color = item.color || 'Unknown'
      jugColorMap[color] = (jugColorMap[color] || 0) + (item.quantity || 0)
    })
    jugsByColor.value = Object.entries(jugColorMap).map(([color, qty]) => ({
      color,
      quantity: qty,
    }))

    chartSeries.value[0].data = [totalJars.value, totalJugs.value]

    // Orders today
    const ordersRes = await axios.get('http://localhost:5000/api/orders')
    const today = new Date().toISOString().split('T')[0]
    todaysOrders.value = ordersRes.data.filter((o) => {
      const orderDate = new Date(o.order_date).toISOString().split('T')[0]
      return orderDate === today
    }).length
  } catch (err) {
    console.error('Dashboard error:', err)
  }
}

onMounted(fetchDashboardData)
</script>

<style scoped>
.transition-all {
  transition: all 0.25s ease;
}
</style>
