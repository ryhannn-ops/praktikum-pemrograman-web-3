import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskBucket = 'today' | 'tomorrow' | 'next7days';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  bucket: TaskBucket;
  createdAt: string;
}

interface TodoStore {
  tasks: Task[];
  addTask: (title: string, bucket?: TaskBucket) => void;
  toggleTask: (id: string | number) => void;
  editTask: (id: string | number, title: string) => void;
  deleteTask: (id: string | number) => void;
  moveToBucket: (id: string, bucket: TaskBucket) => void;
  getTasksByBucket: (bucket: TaskBucket) => Task[];
}

const STORAGE_KEY = 'todo:tasks:v1';
const OLD_STORAGE_KEY = 'todo:tasks'; // For migration

// Helper functions
export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    // Migration from old key
    const oldStored = localStorage.getItem(OLD_STORAGE_KEY);
    if (oldStored) {
      const oldTasks = JSON.parse(oldStored);
      const migratedTasks = oldTasks.map((task: any) => ({
        ...task,
        bucket: 'today' as TaskBucket,
        createdAt: new Date().toISOString(),
      }));
      saveTasks(migratedTasks);
      localStorage.removeItem(OLD_STORAGE_KEY);
      return migratedTasks;
    }

    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const moveToBucket = (id: string, bucket: TaskBucket) => {
  // This will be handled by the store
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (title: string, bucket: TaskBucket = 'today') => {
        const newTask: Task = {
          id: Date.now().toString(),
          title: title.trim(),
          done: false,
          bucket,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      toggleTask: (id: string | number) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id.toString() ? { ...task, done: !task.done } : task
          ),
        }));
      },

      editTask: (id: string | number, title: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id.toString() ? { ...task, title: title.trim() } : task
          ),
        }));
      },

      deleteTask: (id: string | number) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id.toString()),
        }));
      },

      moveToBucket: (id: string, bucket: TaskBucket) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, bucket } : task
          ),
        }));
      },

      getTasksByBucket: (bucket: TaskBucket) => {
        return get().tasks.filter((task) => task.bucket === bucket);
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
    }
  )
);
