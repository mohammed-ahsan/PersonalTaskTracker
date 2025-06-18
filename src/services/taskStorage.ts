import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId, getCurrentTimestamp } from '../utils/helpers';

const TASKS_KEY = '@tasks';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewTaskData {
  title: string;
  description?: string;
  priority?: Priority;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: Priority;
  completed?: boolean;
}

export const taskStorage = {
  async getAllTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
      return tasksJson ? JSON.parse(tasksJson) as Task[] : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      throw new Error('Failed to load tasks');
    }
  },

  async addTask(taskData: NewTaskData): Promise<Task> {
    try {
      const tasks = await this.getAllTasks();
      const newTask: Task = {
        id: generateId(),
        title: taskData.title,
        description: taskData.description || '',
        priority: taskData.priority || 'medium',
        completed: false,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp()
      };

      tasks.push(newTask);
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw new Error('Failed to add task');
    }
  },

  async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    try {
      const tasks = await this.getAllTasks();
      const taskIndex = tasks.findIndex(task => task.id === id);

      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      const updatedTask: Task = {
        ...tasks[taskIndex],
        ...taskData,
        updatedAt: getCurrentTimestamp()
      };

      tasks[taskIndex] = updatedTask;
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      const tasks = await this.getAllTasks();
      const filteredTasks = tasks.filter(task => task.id !== id);
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  },

  async toggleTask(id: string): Promise<void> {
    try {
      const tasks = await this.getAllTasks();
      const taskIndex = tasks.findIndex(task => task.id === id);

      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      tasks[taskIndex].updatedAt = getCurrentTimestamp();

      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error toggling task:', error);
      throw new Error('Failed to toggle task');
    }
  },

  async clearAllTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TASKS_KEY);
    } catch (error) {
      console.error('Error clearing tasks:', error);
      throw new Error('Failed to clear tasks');
    }
  }
};
