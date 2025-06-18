import { COLORS } from './constants';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export type Priority = 'high' | 'medium' | 'low';

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return COLORS.error;
    case 'medium':
      return COLORS.warning;
    case 'low':
      return COLORS.success;
    default:
      return COLORS.warning;
  }
};

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  [key: string]: any;
}

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
  return tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed);
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const filterTasksByStatus = (tasks: Task[], showCompleted: boolean = true): Task[] => {
  return showCompleted ? tasks : tasks.filter(task => !task.completed);
};
