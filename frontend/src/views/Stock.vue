<!-- frontend/src/views/Stock.vue -->
<template>
  <v-container>
    <!-- Page Title -->
    <!-- <v-row class="mb-4">
      <v-col>
        <h1 class="text-h5 font-weight-bold">Stock Management</h1>
      </v-col>
    </v-row> -->

    <!-- Action Bar -->
    <v-row class="mb-4">
      <v-col class="d-flex justify-end align-center">
        <v-text-field
          v-model="search"
          label="Search Stock"
          prepend-inner-icon="mdi-magnify"
          append-inner-icon="mdi-close"
          @click:append-inner="search = ''"
          variant="outlined"
          hide-details
          density="compact"
          class="mr-4"
          style="max-width: 350px"
        ></v-text-field>

        <v-btn color="primary" @click="openDialog()" prepend-icon="mdi-plus"> Add Stock </v-btn>
      </v-col>
    </v-row>

    <!-- Stock Table -->
    <v-card>
      <v-data-table-virtual
        :headers="headers"
        :items="filteredStock"
        :items-per-page="12"
        :search="search"
        item-value="id"
        class="elevation-1 text-capitalize"
      >
        <!-- Type Column with Image -->
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
          </div>
        </template>
        <template #item.actions="{ item }">
          <v-btn icon @click="openDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="confirmDelete(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template #item.created_at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>

        <template #item.updated_at="{ item }">
          {{ formatDate(item.updated_at) }}
        </template>
      </v-data-table-virtual>

      <!-- Add/Edit Dialog -->
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card class="drop-shadow-lg rounded-lg pa-4">
          <!-- Updated here -->
          <v-card-title class="text-h6">
            <span class="text-h6">{{ isEdit ? 'Edit' : 'Add' }} Stock</span>
          </v-card-title>
          <v-form ref="formRef">
            <v-card-text>
              <!-- Type Selection with Images + Radio Buttons -->
              <v-radio-group v-model="form.type" :rules="[rules.required]" class="text-center">
                <div class="d-flex justify-space-around ">
                  <div
                    class="text-center"
                    @click="form.type = 'jar'"
                    style="cursor: pointer; width: 60px"
                  >
                    <img
                      src="/images/jar.png"
                      alt="Jar"
                      height="80"
                      :class="form.type === 'jar' ? 'border border-primary rounded' : ''"
                    />
                    <div class="mt-2 d-flex align-center justify-center">
                      <v-radio
                        label="Jar"
                        value="jar"
                        v-model="form.type"
                        hide-details
                        density="compact"
                        color="primary"
                        :rules="[rules.required]"
                        class="flex-column"
                      ></v-radio>
                    </div>
                  </div>

                  <div
                    class="text-center"
                    @click="form.type = 'jug'"
                    style="cursor: pointer; width: 60px"
                  >
                    <img
                      src="/images/jug.png"
                      alt="Jug"
                      height="80"
                      :class="form.type === 'jug' ? 'border border-primary rounded' : ''"
                    />
                    <div class="mt-2 d-flex align-center justify-center">
                      <v-radio
                        label="Jug"
                        value="jug"
                        v-model="form.type"
                        hide-details
                        :rules="[rules.required]"
                        density="compact"
                        color="primary"
                        class="flex-column"
                      ></v-radio>
                    </div>
                  </div>
                </div>
              </v-radio-group>
              <!-- Only show color field when type is jug -->
              <div class="d-flex align-center mt-4">
                <v-text-field
                  v-if="form.type === 'jug'"
                  label="Color"
                  v-model="form.color"
                  :rules="[rules.required]"
                  variant="outlined"
                  class="flex-grow-1 mr-4"
                />
                <v-text-field
                  label="Quantity"
                  type="number"
                  v-model="form.quantity"
                  :rules="[rules.required, rules.digitsOnly]"
                  variant="outlined"
                  class="flex-grow-1"
                />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="saveStock" variant="flat">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteDialog" max-width="400px" persistent>
        <v-card>
          <v-card-title class="text-h6">Confirm Delete</v-card-title>
          <v-card-text>Are you sure you want to delete this stock item?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteDialog = false">Cancel</v-btn>
            <v-btn color="red" @click="performDelete">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Snackbar -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        timeout="3000"
        location="top right"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { rules } from '@/utils/validationRules'

const API = 'http://localhost:5000/api/stock'

const dialog = ref(false)
const deleteDialog = ref(false)
const isEdit = ref(false)
const stockList = ref([])
const search = ref('')
const deleteId = ref(null)
// const file = ref(null)
const formRef = ref(null)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

const showToast = (message, color = 'success') => {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

const form = ref({
  type: '',
  color: '',
  quantity: '',
  id: null,
})

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Type', key: 'type' },
  { title: 'Color', key: 'color' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Delivered Jars', key: 'delivered_jars' },
  { title: 'Remaining Jars', key: 'remaining_jars' },
  { title: 'Actions', key: 'actions', sortable: false },
  { title: 'Updated At', key: 'updated_at' },
  { title: 'Created At', key: 'created_at' },
]

const fetchStockItems = async () => {
  try {
    const response = await axios.get(API)
    let data = Array.isArray(response.data) ? response.data : response.data.items || []
    stockList.value = data.sort((a, b) => b.id - a.id) // 👈 Sort by ID DESC
  } catch (error) {
    showToast('Failed to fetch stock', 'error')
    console.error('Fetch error:', error)
  }
}

const openDialog = (item = null) => {
  if (item) {
    form.value = { ...item }
    isEdit.value = true
  } else {
    form.value = {
      id: null,
      type: '',
      color: '',
      quantity: '',
    }
    isEdit.value = false
  }
  dialog.value = true
}

// Add/Edit Stock

const saveStock = async () => {
  // validate form
  const { valid } = await formRef.value.validate()
  if (!valid) {
    showToast('Please fill required fields correctly', 'error')
    return
  }

  try {
    const isAdding = !isEdit.value

    // Prevent duplicate jug with same color (only for new entries)
    if (
      isAdding &&
      form.value.type === 'jug' &&
      stockList.value.some(
        (item) =>
          item.type === 'jug' && item.color?.toLowerCase() === form.value.color?.toLowerCase(),
      )
    ) {
      showToast(`A jug with color "${form.value.color}" already exists.`, 'error')
      return
    }

    // Prevent duplicate jar (only one Jar allowed)
    if (
      isAdding &&
      form.value.type === 'jar' &&
      stockList.value.some((item) => item.type === 'jar')
    ) {
      showToast(`A Jar already exists. You cannot add another.`, 'error')
      return
    }

    // Payload for backend
    const payload = {
      type: form.value.type,
      color: form.value.color || '',
      quantity: form.value.quantity,
    }

    if (isEdit.value) {
      await axios.put(`${API}/${form.value.id}`, payload)
      showToast('Stock updated successfully')
    } else {
      await axios.post(API, payload)
      showToast('Stock added successfully')
    }

    dialog.value = false
    fetchStockItems()
  } catch (err) {
    console.error('Save error:', err)
    showToast('Something went wrong while saving.', 'error')
  }
}

const confirmDelete = (item) => {
  deleteId.value = item.id
  deleteDialog.value = true
}

const performDelete = async () => {
  try {
    await axios.delete(`${API}/${deleteId.value}`)
    deleteDialog.value = false
    showToast('Stock deleted successfully')
    await fetchStockItems()
  } catch (error) {
    showToast('Failed to delete stock', 'error')
    console.error('Delete error:', error)
  }
}

const filteredStock = computed(() => {
  return stockList.value.filter((item) =>
    Object.values(item).some((val) => String(val).includes(search.value)),
  )
})

onMounted(fetchStockItems)
</script>
