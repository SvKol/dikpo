<script setup>
const props = defineProps({
    modelValue: {
      type: Number,
      default: 0
    },
    src: String,
})
</script>

<template>
  <div :class="['w-60 h-60 flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-800 hover:cursor-pointer rounded-full', {'border-4' : modelValue, 'border-green-500' : modelValue > 0, 'border-red-500' : modelValue < 0}]" @click="$emit('selected')">
    <img :src="src" class="max-w-full max-h-full" alt="Image" />
  </div>
</template>