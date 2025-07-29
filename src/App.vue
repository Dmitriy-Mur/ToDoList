<script setup lang="ts">
import TaskList from './components/TaskList.vue'
</script>

<template>
  <div id="app">
    <TaskList />
  </div>
</template>

<style lang="scss">
@use './styles/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
