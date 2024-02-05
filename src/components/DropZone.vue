<template>
  <div @drop.prevent="onDrop" @click="clickInput()">
    <input
      type="file"
      @change="handleFileUpload($event)"
      accept="text/csv"
      capture
      ref="fileInput"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
const emit = defineEmits(['files-dropped'])
const fileInput = ref<HTMLInputElement | null>(null)

function onDrop(e: DragEvent) {
  if (!e.dataTransfer) return
  emit('files-dropped', [...e.dataTransfer.files])
}

function preventDefaults(e: Event) {
  e.preventDefault()
}

function clickInput() {
  if (!fileInput.value) return
  fileInput.value.click()
}

function handleFileUpload(e: Event) {
  if (!e.target) return
  const target = e.target as HTMLInputElement
  if (!target.files) return
  emit('files-dropped', [...target.files])
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})
</script>

<style scoped>
input[type='file'] {
  display: none;
}
</style>
