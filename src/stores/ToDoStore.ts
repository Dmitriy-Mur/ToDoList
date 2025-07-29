import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '@/types'

export const useToDoStore = defineStore('todo', () => {
  const todos = ref<Task[]>([])

  // Загрузка из localStorage при инициализации
  const loadFromStorage = () => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      todos.value = JSON.parse(saved)
    }
  }

  // Вызываем загрузку сразу
  loadFromStorage()

  const addTodo = (text: string) => {
    if (!text.trim()) return

    const newTodo: Task = {
      id: Date.now(), // Используем timestamp как ID
      text: text.trim(),
      completed: false,
    }

    todos.value.push(newTodo)
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  return {
    todos,
    addTodo,
    loadFromStorage,
  }
})
