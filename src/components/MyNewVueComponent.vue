<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string>('Its work!')
const count = ref(0)

const increment = () => {
  count.value++
}

alert(text.value)
</script>

<template>
  <p>This is Vue component</p>
  <p>tasks count:</p>
  <h1>{{ count }}</h1>
  <button @click="increment">Click me</button>
</template>

<style scoped>
p {
  font-family: 'Courier New', Courier, monospace;
}
</style>
