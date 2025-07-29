<script setup lang="ts">
interface Task {
  id: number
  name: string
  isDone: boolean
}
</script>

<template>
  <div class="task">
    <input type="checkbox" />
    <input type="task name" />
    <button class="icon-btn">
      <img src="./assets/change button.png" alt="Icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.task {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
