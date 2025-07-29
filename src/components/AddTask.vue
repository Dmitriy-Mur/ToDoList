<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/toDoStore'

const newTodoText = ref('')

const addNewTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value.trim())
    newTodoText.value = ''
  }
}
</script>

<template>
  <input type="text" />
  <button>Add</button>
</template>
