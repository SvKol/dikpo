<script setup>
const props = defineProps({
    borderColor: {
        type: String,
        default: null
    },
    src: String,
})
</script>

<template>
  <div :class="['w-60 h-60 flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-800 hover:cursor-pointer rounded-full', {'border-4' : borderColor, 'border-green-500' :borderColor === 'green', 'border-red-500' :borderColor === 'red'}]" @click="$emit('selected')">
    <img :src="src" class="max-w-full max-h-full" alt="Image" />
  </div>
</template>