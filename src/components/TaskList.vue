<script setup lang="ts">
import { ref } from 'vue'
import TaskItem from '@/components/TaskItem.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const newTaskTitle = ref('')
const errorMessage = ref('')

const addTask = () => {
  try {
    if (newTaskTitle.value.trim()) {
      taskStore.addTask(newTaskTitle.value.trim())
      newTaskTitle.value = ''
      errorMessage.value = ''
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to add task'
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addTask()
  }
}
</script>

<template>
  <div class="todo-list">
    <h1>ToDo List</h1>

    <div class="add-task">
      <input
        v-model="newTaskTitle"
        @keyup="handleKeyUp"
        placeholder="Learn Vue.js"
        class="task-input"
        maxlength="500"
        :class="{ error: errorMessage }"
      />
      <button @click="addTask" class="add-button">Add</button>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <ul class="tasks">
      <TaskItem
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
        @update="taskStore.updateTask"
        @delete="taskStore.deleteTask"
        @move-up="taskStore.moveTaskUp"
        @move-down="taskStore.moveTaskDown"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;

  &.error {
    border-color: #ff4444;
  }

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
}

.add-button {
  padding: 10px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.error-message {
  color: #ff4444;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #ffcccc;
}

.tasks {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
