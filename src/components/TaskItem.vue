<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '../types/task'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'update', id: number, updates: Partial<Task>): void
  (e: 'delete', id: number): void
  (e: 'move-up', id: number): void
  (e: 'move-down', id: number): void
}>()

const isEditing = ref(false)
const editedTitle = ref(props.task.title)
const errorMessage = ref('')

const handleUpdate = () => {
  try {
    emit('update', props.task.id, { title: editedTitle.value })
    isEditing.value = false
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to update task'
  }
}

const toggleComplete = () => {
  emit('update', props.task.id, { completed: !props.task.completed })
}

const startEditing = () => {
  isEditing.value = true
  editedTitle.value = props.task.title
  errorMessage.value = ''
}
</script>

<template>
  <li class="task-item" :class="{ completed: task.completed }">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="toggleComplete"
      class="task-checkbox"
    />

    <div class="task-content">
      <input
        v-if="isEditing"
        v-model="editedTitle"
        @keyup.enter="handleUpdate"
        @blur="handleUpdate"
        @keyup.esc="isEditing = false"
        class="task-edit-input"
        maxlength="500"
        :class="{ error: errorMessage }"
        autofocus
      />
      <span v-else @dblclick="startEditing" class="task-title">
        {{ task.title }}
      </span>
      <div class="task-date">
        {{ task.createdAt.toLocaleDateString() }}
      </div>
      <div v-if="errorMessage" class="task-error">
        {{ errorMessage }}
      </div>
    </div>

    <div class="task-actions">
      <button @click="emit('move-up', task.id)" class="action-button">↑</button>
      <button @click="emit('move-down', task.id)" class="action-button">↓</button>
      <button @click="emit('delete', task.id)" class="action-button delete-button">×</button>
    </div>
  </li>
</template>

<style scoped lang="scss">
.task-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }

  &.completed {
    .task-title {
      text-decoration: line-through;
      color: #888;
    }
  }
}

.task-checkbox {
  margin-right: 12px;
}

.task-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.task-title {
  cursor: pointer;
  padding: 4px 0;
}

.task-date {
  font-size: 0.8em;
  color: #888;
}

.task-edit-input {
  flex-grow: 1;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s;

  &.error {
    border-color: #ff4444;
  }

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
}

.task-error {
  font-size: 0.8em;
  color: #ff4444;
  margin-top: 4px;
}

.task-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eee;
  }

  &.delete-button:hover {
    background-color: #ffdddd;
  }
}
</style>
