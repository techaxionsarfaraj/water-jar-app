<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  target: { type: Number, required: true },
  duration: { type: Number, default: 2000 } // in ms
})

const count = ref(0)

let startTime
function animate(timestamp) {
  if (!startTime) startTime = timestamp
  const progress = Math.min((timestamp - startTime) / props.duration, 1)
  count.value = Math.floor(progress * props.target)
  if (progress < 1) requestAnimationFrame(animate)
}

watch(() => props.target, () => {
  startTime = null
  requestAnimationFrame(animate)
}, { immediate: true })
</script>

<template>
  <span class="font-bold text-2xl">
    {{ count }}
  </span>
</template>
