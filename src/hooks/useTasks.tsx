import { useState } from 'react';
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces';

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
  const draggingTaskId = useTaskStore((state) => state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addNewTask = useTaskStore((state) => state.addNewTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddNewTask = async () => {
    const { value: title, isConfirmed } = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputPlaceholder: 'Escribe el título de la tarea',
      inputAttributes: {
        autocapitalize: 'off',
      },
      inputAutoTrim: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El campo no puede estar vacío';
        }
        return null;
      },
    });

    if (!isConfirmed || !title) {
      return;
    }

    addNewTask(title, status);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return {
    // properties
    draggingTaskId,
    onDragOver,

    // methods
    onTaskDrop,
    addNewTask,
    handleAddNewTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
