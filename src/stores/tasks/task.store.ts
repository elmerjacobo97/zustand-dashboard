import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
// import { produce } from 'immer'; // <-- mutation state
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>; // <-- { [key: string]: Task }

  getTypeByStatus: (status: TaskStatus) => Task[];
  addNewTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;

  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [['zustand/immer', never]]> = (set, get) => ({
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
  addNewTask: (title: string, status: TaskStatus) => {
    const newTask = {
      id: uuidv4(),
      title,
      status,
    };

    // ! add new task with spread operator
    // set((state) => ({ tasks: { ...state.tasks, [newTask.id]: newTask } }));

    // ! add new task with immer(produce) mutation state
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );

    // ! with immer(middleware)
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
  },

  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // const task = get().tasks[taskId];
    // task.status = status;
    // set((state) => ({ tasks: { ...state.tasks, [taskId]: task } }));
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (taskId) {
      get().changeTaskStatus(taskId, status);
      get().removeDraggingTaskId();
    }
  },
});

export const useTaskStore = create<TaskState>()(devtools(persist(immer(storeApi), { name: 'task-store' })));
