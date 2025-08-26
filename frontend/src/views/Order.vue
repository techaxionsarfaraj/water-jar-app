<template>
  <v-container>
    <!-- Action Bar -->
    <v-row class="mb-4">
      <v-col class="d-flex justify-end align-center">
        <v-text-field
          v-model="search"
          label="Search Orders"
          prepend-inner-icon="mdi-magnify"
          append-inner-icon="mdi-close"
          @click:append-inner="search = ''"
          variant="outlined"
          hide-details
          density="compact"
          style="max-width: 300px"
          class="mr-4"
        />
        <v-btn color="primary" @click="dialog = true" prepend-icon="mdi-plus"> Add Order </v-btn>
      </v-col>
    </v-row>

    <v-card flat>
      <v-data-table-virtual
        :headers="headers"
        :items="orders"
        :search="search"
        item-value="id"
        :items-per-page="12"
        hover
        class="elevation-2"
      >
        <template #item.type="{ item }">
          <div class="d-flex align-center">
            <v-img
              v-if="item.type === 'jar'"
              src="/images/jar.png"
              alt="Jar"
              width="40"
              height="40"
              class="mr-2"
            />
            <v-img
              v-else-if="item.type === 'jug'"
              src="/images/jug.png"
              alt="Jug"
              width="40"
              height="40"
              class="mr-2"
            />
            <span>{{ item.type }}</span>
          </div>
        </template>

        <template #item.delivery_date="{ item }">
          <span class="text-no-wrap">{{ formatDate(item.delivery_date) }}</span>
        </template>

        <template #item.order_date="{ item }">
          <span class="text-no-wrap">{{ formatDate(item.order_date) }}</span>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon flat color="primary" @click="openEditDialog(item)" size="small">
            <v-icon>mdi-pencil</v-icon>
            <v-tooltip activator="parent" location="top">Edit Order</v-tooltip>
          </v-btn>
          <v-btn icon flat color="error" @click="confirmDelete(item)" size="small">
            <v-icon>mdi-delete</v-icon>
            <v-tooltip activator="parent" location="top">Delete Order</v-tooltip>
          </v-btn>
        </template>
      </v-data-table-virtual>
    </v-card>

    <!-- Add Order Dialog -->
    <v-dialog v-model="dialog" max-width="650" persistent>
      <v-card class="pa-4 rounded-lg">
        <v-card-title class="text-h6 font-weight-bold"> Add New Order </v-card-title>
        <v-card-text>
          <!-- If no match, show add new customer link -->
          <div v-if="showAddCustomer" class="text-right mb-2">
            <v-btn size="small" variant="text" color="red" @click="goToAddCustomer">
              + Add New Customer
            </v-btn>
          </div>
          <v-form ref="addOrderForm" v-model="isAddFormValid">
            <v-autocomplete
              v-model="form.customer_id"
              :items="filteredCustomers"
              item-title="name"
              item-value="id"
              label="Customer (Name or Phone)"
              variant="outlined"
              density="comfortable"
              hide-no-data
              hide-details
              clearable
              class="mb-4"
              @update:search="onCustomerSearch"
              @update:modelValue="fillCustomerDetails"
              :rules="[rules.required]"
            />

            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Customer Name"
                  v-model="form.customer_name"
                  readonly
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Customer Phone"
                  v-model="form.customer_phone"
                  readonly
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Quantity"
                  type="number"
                  v-model="form.quantity"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required, rules.number, rules.positive]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Jar', 'Jug']"
                  label="Type"
                  v-model="form.type"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Morning', 'Noon', 'Evening']"
                  label="Delivery Session"
                  v-model="form.delivery_session"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Delivery Date"
                  type="date"
                  v-model="form.delivery_date"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
            <v-textarea
              label="Delivery Address"
              v-model="form.delivery_address"
              variant="outlined"
              density="comfortable"
              rows="2"
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="addOrder">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Order Dialog -->
    <v-dialog v-model="editDialog" max-width="650">
      <v-card class="pa-4 rounded-lg">
        <v-card-title class="text-h6 font-weight-bold"> Edit Order </v-card-title>
        <v-card-text>
          <!-- If no match, show add new customer link -->
          <div v-if="showAddCustomer" class="text-right mb-2">
            <v-btn size="small" variant="text" color="red" @click="goToAddCustomer">
              + Add New Customer
            </v-btn>
          </div>
          <v-form ref="editOrderForm" v-model="isEditFormValid">
            <v-autocomplete
              v-model="editForm.customer_name"
              :items="filteredCustomers"
              item-title="name"
              item-value="id"
              label="Select Customer"
              variant="outlined"
              density="comfortable"
              hide-no-data
              hide-details
              clearable
              class="mb-4"
              @update:search="onCustomerSearch"
              @update:modelValue="fillCustomerDetailsEdit"
              :rules="[rules.required]"
            />
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Customer Name"
                  v-model="editForm.customer_name"
                  readonly
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Customer Phone"
                  v-model="editForm.customer_phone"
                  readonly
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Quantity"
                  type="number"
                  v-model="editForm.quantity"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required, rules.number, rules.positive]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Jar', 'Jug']"
                  label="Type"
                  v-model="editForm.type"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Morning', 'Noon', 'Evening']"
                  label="Delivery Session"
                  v-model="editForm.delivery_session"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Delivery Date"
                  type="date"
                  v-model="editForm.delivery_date"
                  :value="editForm.delivery_date"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
            <v-textarea
              label="Delivery Address"
              v-model="editForm.delivery_address"
              variant="outlined"
              density="comfortable"
              rows="2"
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer />
          <v-btn variant="text" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="updateOrder">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Order Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete order #
          <strong>{{ orderToDelete?.id }}</strong> for
          <strong>{{ orderToDelete?.customer_name }}</strong
          >? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" variant="flat" @click="performDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" location="top right">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { rules } from '@/utils/validationRules' // ✅ Import rules
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

// State management
const dialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)
const orders = ref([])
const customers = ref([])
const orderToDelete = ref(null)
const highlightedRowId = ref(null)
const search = ref('')

const form = ref({
  customer_id: '',
  customer_name: '',
  customer_phone: '',
  quantity: '',
  type: '',
  delivery_address: '',
  delivery_session: '',
  delivery_date: '',
})
const editForm = ref({ ...form.value })

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

// Data table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Customer Name', key: 'customer_name' },
  { title: 'Phone', key: 'customer_phone' },
  { title: 'Qty', key: 'quantity' },
  { title: 'Type', key: 'type' },
  { title: 'Delivery Address', key: 'delivery_address' },
  { title: 'Session', key: 'delivery_session' },
  { title: 'Delivery Date', key: 'delivery_date' },
  { title: 'Order Date', key: 'order_date' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// Toast messages
const showToast = (msg, color = 'success') => {
  snackbar.value = { show: true, message: msg, color }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (isNaN(date)) return '-'
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
const formatDateForBackend = (date) => {
  if (!date) return null
  // keep as plain "YYYY-MM-DD" string (no timezone shift)
  return new Date(date).toISOString().split('T')[0]
}

// Fetch orders
const fetchOrders = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/orders')
    orders.value = res.data.sort((a, b) => b.id - a.id)
  } catch (error) {
    showToast('Failed to fetch orders.', 'error')
  }
}

// Fetch customers
const fetchCustomers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/customers')
    customers.value = res.data
  } catch (error) {
    showToast('Failed to fetch customers.', 'error')
  }
}

// Fill customer details
const fillCustomerDetails = (id) => {
  const cust = customers.value.find((c) => c.id === id)
  if (cust) {
    form.value.customer_name = cust.name
    form.value.customer_phone = cust.phone
  }
}

// Fill customer details
const fillCustomerDetailsEdit = (id) => {
  const cust = customers.value.find((c) => c.id === id)
  if (cust) {
    editForm.value.customer_name = cust.name
    editForm.value.customer_phone = cust.phone
  }
}
const addOrderForm = ref(null) // ⬅️ define here
const isAddFormValid = ref(false)

// Add order
const addOrder = async () => {
  const { valid } = await addOrderForm.value.validate() // ⬅️ run validation
  if (!valid) return // ⛔ stop if invalid

  try {
    await axios.post('http://localhost:5000/api/orders', {
      ...form.value,
      delivery_date: formatDateForBackend(form.value.delivery_date), // ✅ fix
    })

    // Reset form after successful submission
    Object.assign(form.value, {
      customer_id: '',
      customer_name: '',
      customer_phone: '',
      quantity: '',
      type: '',
      delivery_address: '',
      delivery_session: '',
      delivery_date: '',
    })

    dialog.value = false
    await fetchOrders()
    showToast('Order added successfully.')
  } catch (error) {
    showToast('Failed to add order. Please try again.', 'error')
  }
}

// Edit order
const openEditDialog = (customer) => {
  if (customer.delivery_date) {
    const d = new Date(customer.delivery_date) // convert UTC string → local date
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    editForm.value.delivery_date = `${year}-${month}-${day}` // ✅ always local
  } else {
    editForm.value.delivery_date = ''
  }

  editForm.value = { ...customer, delivery_date: editForm.value.delivery_date }
  editDialog.value = true
}

const editOrderForm = ref(null)
const isEditFormValid = ref(false)

// Update order
const updateOrder = async () => {
  const { valid } = await editOrderForm.value.validate()
  if (!valid) return // ⛔ stop if invalid

  try {
    await axios.put(`http://localhost:5000/api/orders/${editForm.value.id}`, {
      ...editForm.value,
      delivery_date: formatDateForBackend(editForm.value.delivery_date), // ✅ fix
    })

    editDialog.value = false
    await fetchOrders()

    highlightedRowId.value = editForm.value.id
    setTimeout(() => {
      highlightedRowId.value = null
    }, 2000)

    showToast('Order updated successfully.')
  } catch (error) {
    showToast('Failed to update order. Please check the form.', 'error')
  }
}

// Delete order
const confirmDelete = (order) => {
  orderToDelete.value = order
  deleteDialog.value = true
}

// Perform delete
const performDelete = async () => {
  if (!orderToDelete.value) return
  try {
    await axios.delete(`http://localhost:5000/api/orders/${orderToDelete.value.id}`)
    deleteDialog.value = false
    orderToDelete.value = null
    await fetchOrders()
    showToast('Order deleted successfully.')
  } catch (error) {
    showToast('Failed to delete order.', 'error')
  }
}

// Lifecycle hook
onMounted(() => {
  fetchOrders()
  fetchCustomers()
})
const searchQuery = ref('')
const filteredCustomers = ref([])
const showAddCustomer = ref(false)

// When user types in autocomplete
const onCustomerSearch = (query) => {
  searchQuery.value = query
  if (!query) {
    filteredCustomers.value = []
    showAddCustomer.value = false
    return
  }

  // Filter customers containing the exact text in name or phone
  const lowerQuery = query.toLowerCase()
  filteredCustomers.value = customers.value.filter(
    (c) => c.name.toLowerCase().includes(lowerQuery) || c.phone.toLowerCase().includes(lowerQuery),
  )

  // If no match → show "Add New Customer"
  showAddCustomer.value = filteredCustomers.value.length === 0
}

// Redirect or open add-customer modal
const goToAddCustomer = () => {
  dialog.value = false
  showToast('Redirecting to add new customer...')
  setTimeout(() => {
    router.push('/customers')
  }, 2000)
}
</script>
