import { defineStore } from 'pinia'
import type { Task } from '@/types/task'

let nextId = 1

const getTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem('tasks')
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.map((task: any) => ({
      ...task,
      id: task.id || nextId++,
      title: String(task.title || ''),
      completed: Boolean(task.completed),
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
    }))
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error)
    return []
  }
}

const saveToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error)
  }
}

export const useTaskStore = defineStore('task', {
  state: (): { tasks: Task[] } => {
    const tasks = getTasksFromStorage()
    if (tasks.length > 0) {
      nextId = Math.max(...tasks.map((t) => t.id)) + 1
    }
    return { tasks }
  },

  actions: {
    addTask(title: string) {
      const trimmedTitle = title.trim()
      if (!trimmedTitle || trimmedTitle.length > 500) {
        throw new Error('Task title must be between 1 and 500 characters')
      }

      const newTask: Task = {
        id: nextId++,
        title: trimmedTitle,
        completed: false,
        createdAt: new Date(),
      }
      this.tasks.push(newTask)
      this.saveToLocalStorage()
    },

    updateTask(id: number, updates: Partial<Task>) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1) {
        if (updates.title !== undefined) {
          const trimmedTitle = updates.title.trim()
          if (!trimmedTitle || trimmedTitle.length > 500) {
            throw new Error('Task title must be between 1 and 500 characters')
          }
          updates.title = trimmedTitle
        }

        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates }
        this.saveToLocalStorage()
      }
    },

    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.saveToLocalStorage()
    },

    moveTaskUp(id: number) {
      const index = this.tasks.findIndex((task) => task.id === id)
      if (index > 0) {
        ;[this.tasks[index], this.tasks[index - 1]] = [this.tasks[index - 1], this.tasks[index]]
        this.saveToLocalStorage()
      }
    },

    moveTaskDown(id: number) {
      const index = this.tasks.findIndex((task) => task.id === id)
      if (index < this.tasks.length - 1) {
        ;[this.tasks[index], this.tasks[index + 1]] = [this.tasks[index + 1], this.tasks[index]]
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      saveToStorage(this.tasks)
    },
  },
})
