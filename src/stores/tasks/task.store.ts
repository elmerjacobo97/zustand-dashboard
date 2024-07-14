import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';

interface TaskState {
  tasks: Record<string, Task>; // <-- { [key: string]: Task }

  getTypeByStatus: (status: TaskStatus) => Task[];
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    '1': {
      id: '1',
      title: 'Task #1',
      status: 'pending',
    },
    '2': {
      id: '2',
      title: 'Task #2',
      status: 'in-progress',
    },
    '3': {
      id: '3',
      title: 'Task #3',
      status: 'done',
    },
    '4': {
      id: '4',
      title: 'Task #4',
      status: 'done',
    },
  },

  getTypeByStatus: (status: TaskStatus) => {
    const tasks = Object.values(get().tasks);
    return tasks.filter((task) => task.status === status);
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
