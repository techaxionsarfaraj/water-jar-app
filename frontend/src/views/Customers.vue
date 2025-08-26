<!-- ./src/views/Customers.vue -->
<template>
  <!-- Action Bar -->
  <v-row class="mb-4">
    <v-col class="d-flex justify-end align-center">
      <!-- Search & Add Button -->
      <v-text-field
        v-model="search"
        label="Search Customers"
        prepend-inner-icon="mdi-magnify"
        append-inner-icon="mdi-close"
        @click:append-inner="search = ''"
        variant="outlined"
        hide-details
        density="compact"
        class="mr-4"
        style="max-width: 350px"
      ></v-text-field>
      <v-btn color="primary ms-4" @click="dialog = true" prepend-icon="mdi-plus">
        Add Customer
      </v-btn>
    </v-col>
  </v-row>

  <!-- Customer Table -->
  <v-card elevation="2" class="">
    <v-data-table-virtual
      :headers="headers"
      :items="customers"
      :search="search"
      item-value="id"
      :items-per-page="12"
      class="elevation-0"
      hover
    >
      <template #item.actions="{ item }">
        <v-btn icon color="primary" @click="openEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="danger" @click="openDeleteDialog(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table-virtual>
  </v-card>

  <!-- Add Customer Dialog -->
  <v-dialog v-model="dialog" max-width="650">
    <v-card class="pa-4 rounded-lg">
      <v-card-title class="text-h6">Add Customer</v-card-title>
      <v-form ref="addFormRef" class="mt-4 px-4">
        <v-card-text class="pa-0">
          <!-- Wrap fields with flex + gap for spacing -->
          <div class="d-flex flex-column" style="gap: 8px">
            <v-text-field
              label="Name"
              required
              v-model="form.name"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
            />

            <v-row dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  label="Phone"
                  v-model="form.phone"
                  :rules="[
                    rules.required,
                    rules.digitsOnly,
                    rules.minLength(10),
                    rules.maxLength(10),
                  ]"
                  maxlength="10"
                  counter="10"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" sm="7">
                <v-text-field
                  label="Email"
                  v-model="form.email"
                  :rules="[rules.email]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-select
                  label="Category"
                  v-model="form.category"
                  :items="['Regular', 'Bulk']"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col>
                <v-text-field
                  label="Outstanding Balance"
                  type="number"
                  v-model="form.outstanding_balance"
                  :rules="[rules.required, rules.numeric]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
            <v-text-field
              label="Delivery Location"
              v-model="form.delivery_location"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
            />
            <v-textarea
              label="Address"
              v-model="form.address"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
            />
          </div>
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="addCustomer" variant="flat">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <!-- Edit Customer Dialog -->
  <v-dialog v-model="editDialog" max-width="500" persistent>
    <v-card class="pa-4 rounded-lg">
      <v-card-title class="text-h6">Edit Customer</v-card-title>

      <v-form ref="editFormRef">
        <v-card-text>
          <!-- Wrap fields with flex + gap for spacing -->
          <div class="d-flex flex-column" style="gap: 8px">
            <v-text-field
              label="Name"
              v-model="editForm.name"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
            />

            <v-row>
              <v-col cols="12" sm="5">
                <v-text-field
                  label="Phone"
                  v-model="editForm.phone"
                  type="tel"
                  maxlength="10"
                  counter="10"
                  :rules="[
                    rules.required,
                    rules.digitsOnly,
                    rules.minLength(10),
                    rules.maxLength(10),
                  ]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" sm="7">
                <v-text-field
                  label="Email"
                  v-model="editForm.email"
                  :rules="[rules.email]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  label="Category"
                  v-model="editForm.category"
                  :items="['Regular', 'Bulk']"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Outstanding Balance"
                  v-model="editForm.outstanding_balance"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required, rules.numeric]"
                />
              </v-col>
            </v-row>
            <v-text-field
              label="Delivery Location"
              v-model="editForm.delivery_location"
              variant="outlined"
              density="comfortable"
              :rules="[rules.required]"
            />
            <v-textarea
              label="Address"
              v-model="editForm.address"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
            />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="editDialog = false"
            :color="$vuetify.theme.themes.light.colors.secondary"
            >Cancel</v-btn
          >
          <v-btn color="info" @click="updateCustomer" variant="flat">Update</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <!-- Delete Customer Dialog -->
  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card class="py-4 rounded-lg">
      <v-card-title class="text-h6">Confirm Delete</v-card-title>
      <v-card-text>Are you sure you want to delete this customer?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="error" @click="confirmDelete" variant="flat">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Snackbar -->
  <v-snackbar
    v-if="snackbar.message"
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="3000"
    location="top right"
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script setup>
import { rules } from '@/utils/validationRules' // ✅ Import rules

import { ref, onMounted } from 'vue'
import axios from 'axios'

// Dialogs
const dialog = ref(false)
const editDialog = ref(false)

// Customers Data
const customers = ref([])
// Forms
const form = ref({
  name: '',
  phone: '',
  address: '',
  email: '',
  category: '',
  outstanding_balance: '',
  delivery_location: '',
})
const editForm = ref({
  id: null,
  name: '',
  phone: '',
  address: '',
  email: '',
  category: '',
  outstanding_balance: '',
  delivery_location: '',
})

// Table Headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Full Name', key: 'name' },
  { title: 'Phone', key: 'phone' },
  { title: 'Address', key: 'address' },
  { title: 'Email', key: 'email' },
  { title: 'Category', key: 'category' },
  { title: 'Outstanding Balance', key: 'outstanding_balance' },
  { title: 'Delivery Location', key: 'delivery_location' },
  { title: 'Address', key: 'address' },
  { title: 'Actions', key: 'actions', sortable: false },
]

// 🔍 Global Search
const search = ref('')

// Snackbar for toast messages
const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

const showToast = (message, color = 'success') => {
  if (!message) return
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

// Fetch Customers
const fetchCustomers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/customers')
    customers.value = res.data.sort((a, b) => b.id - a.id)
  } catch (error) {
    showToast('Failed to fetch customers. Please check the server.', 'error')
  }
}

// Add Customer
const addFormRef = ref(null)

const addCustomer = async () => {
  const { valid } = await addFormRef.value.validate()
  if (!valid) return // ⛔ stop if invalid

  try {
    await axios.post('http://localhost:5000/api/customers', form.value)
    dialog.value = false
    form.value = {
      name: '',
      phone: '',
      address: '',
      email: '',
      category: '',
      outstanding_balance: '',
      delivery_location: '',
    }
    fetchCustomers()
    showToast('Customer added successfully', 'success')
  } catch (err) {
    showToast('Failed to add customer', 'error')
  }
}

// Open Edit Dialog
const openEditDialog = (customer) => {
  editForm.value = { ...customer }
  editDialog.value = true
}

const editFormRef = ref(null)

const updateCustomer = async () => {
  const { valid } = await editFormRef.value.validate()
  if (!valid) return // ⛔ stop if invalid

  try {
    await axios.put(`http://localhost:5000/api/customers/${editForm.value.id}`, editForm.value)
    await fetchCustomers()
    editDialog.value = false
    showToast('Customer updated successfully', 'success')
  } catch (error) {
    showToast('Failed to update customer', 'error')
  }
}

// Delete Customer
const deleteDialog = ref(false)
const deleteCustomerId = ref(null)

const openDeleteDialog = (id) => {
  deleteCustomerId.value = id
  deleteDialog.value = true
}
const confirmDelete = async () => {
  if (!deleteCustomerId.value) return

  try {
    await axios.delete(`http://localhost:5000/api/customers/${deleteCustomerId.value}`)
    showToast('Customer deleted successfully', 'success')
    await fetchCustomers()
  } catch (err) {
    showToast('Failed to delete customer', 'error')
  } finally {
    deleteDialog.value = false
    deleteCustomerId.value = null
  }
}

onMounted(fetchCustomers)
</script>
