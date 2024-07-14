import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>; // <-- { [key: string]: Task }

  getTypeByStatus: (status: TaskStatus) => Task[];

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;

  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
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

  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;
    set((state) => ({ tasks: { ...state.tasks, [taskId]: task } }));
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (taskId) {
      get().changeTaskStatus(taskId, status);
      get().removeDraggingTaskId();
    }
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
